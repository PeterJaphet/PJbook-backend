import { CookieOptions, Request, Response } from 'express';
// import config from 'config';
import authService from '../services/authService';

import { createSession } from './sessionService';
import { generateJwt } from './jwtLib';

const Authservice = new authService();
const findAndUpdateUser = Authservice.findAndUpdateUser;
const getGoogleUser = Authservice.getGoogleUser;
const getGoogleOAuthTokens = Authservice.getGoogleOAuthTokens;

const accessTokenCookieOptions: CookieOptions = {
  maxAge: 900000, // 15 mins
  httpOnly: true,
  domain: 'localhost',
  path: '/',
  sameSite: 'lax',
  secure: false,
};

const refreshTokenCookieOptions: CookieOptions = {
  ...accessTokenCookieOptions,
  maxAge: 3.154e10, // 1 year
};

export async function callbackHandler(req: Request, res: Response) {
  //get code(ie athentication code that google released to us) from qs

  const code = req.query.code as string;
  console.log(code);

  try {
    //get the id and access token with the code
    const { id_token, access_token } = await getGoogleOAuthTokens({ code });

    console.log({ id_token, access_token });

    //get user with tokens
    const googleUser = await getGoogleUser(id_token, access_token);

    // jwt.decode(id_token);

    console.log({ googleUser });

    if (!googleUser.verified_email) {
      return res.status(403).send('Google account is not verified');
    }
    // upsert the user

    const user = await findAndUpdateUser(
      {
        email: googleUser.email, //find user by email
      },
      {
        //if user exists, update/replace with these values below for the user
        //if user does not exist, insert these values below as user
        email: googleUser.email,
        name: googleUser.name,
        picture: googleUser.picture,
      },
      {
        upsert: true,
        new: true, //this means it will return a new documents when it updates the user.
      }
    );
    console.log('user......is...:', user);

    //create a session
    const session = await createSession(user._id, req.get('user-agent') || '');

    console.log(`session is.....${JSON.stringify(session)}`);
    //create access & refresh tokens:
    // create an access token

    const accessToken = generateJwt(
      { ...user.toJSON(), session: session._id },
      false
      // { expiresIn: config.get('accessTokenTtl') } // 15 minutes
      // { expiresIn: process.env.ACCESS_TOKEN_TTL } // 15 minutes
    );

    // create a refresh token
    const refreshToken = generateJwt(
      { ...user.toJSON(), session: session._id },
      false
      // { expiresIn: config.get('refreshTokenTtl') } // 1 year
    );

    //set cookies
    res.cookie('accessToken', accessToken, accessTokenCookieOptions);

    res.cookie('refreshToken', refreshToken, refreshTokenCookieOptions);

    //redirect back to client
    res.redirect('http://localhost:5000/users/googlehtmlpage');
  } catch (error) {
    console.log(error, 'Failed to authorize Google User');

    // return res.redirect(`${config.get('origin') / oauth / error`});
  }
}
