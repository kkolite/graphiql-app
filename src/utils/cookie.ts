import { PATTERN } from '../data/patterns';
import { MAX_AGE, PATH, TOKEN } from '../data/variable';

export const setToken = (token: string) => {
  const options = {
    path: '/',
    max_age: 360000,
  };
  document.cookie = `${TOKEN}=${token}; ${PATH}=${options.path}; ${MAX_AGE}=${options.max_age}`;
};

export const getToken = () => {
  const token = 'token';
  const matches = document.cookie.match(
    new RegExp(
      /* eslint-disable */
    PATTERN.TOKEN_START + token.replace(PATTERN.TOKEN, '\\$1') + PATTERN.TOKEN_END
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

export const removeToken = () => {
  document.cookie = `${TOKEN}=0123; ${MAX_AGE}=0`;
};
