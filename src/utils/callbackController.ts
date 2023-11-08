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
  const code = req.query.code as string;

  try {
    const { id_token, access_token } = await getGoogleOAuthTokens({ code });

    const googleUser = await getGoogleUser(id_token, access_token);

    if (!googleUser.verified_email) {
      return res.status(403).send('Google account is not verified');
    }

    const user = await findAndUpdateUser(
      {
        email: googleUser.email,
      },
      {
        email: googleUser.email,
        name: googleUser.name,
        picture: googleUser.picture,
      },
      {
        upsert: true,
        new: true,
      }
    );

    const session = await createSession(user._id, req.get('user-agent') || '');

    const accessToken = generateJwt(
      { ...user.toJSON(), session: session._id },
      false
    );

    const refreshToken = generateJwt(
      { ...user.toJSON(), session: session._id },
      false
    );

    res.cookie('accessToken', accessToken, accessTokenCookieOptions);

    res.cookie('refreshToken', refreshToken, refreshTokenCookieOptions);

    res.redirect('http://localhost:5000/users/googlehtmlpage');
  } catch (error) {
    throw new Error('Failed to authorize Google User');
  }
}
