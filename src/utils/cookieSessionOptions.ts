const config = {
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  COOKIE_KEY_1: process.env.COOKIE_KEY_1,
  COOKIE_KEY_2: process.env.COOKIE_KEY_2,
};

const cookieSessionOptions = {
  name: 'session',
  maxAge: 24 * 60 * 60 * 1000,
  keys: [config.COOKIE_KEY_1, config.COOKIE_KEY_2],
};

export default cookieSessionOptions;
