import * as bcrypt from 'bcrypt';

export const bcryptPassword = (rawPassword: string) => {
  const SALT = bcrypt.genSaltSync();
  return bcrypt.hash(rawPassword, SALT);
};

export const bcryptCompare = (
  oldPassword: string,
  savedPasswordhash: string
) => {
  return bcrypt.compare(oldPassword, savedPasswordhash);
};
