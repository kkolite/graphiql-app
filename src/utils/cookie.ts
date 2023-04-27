export const setToken = (token: string) => {
  const options = {
    path: '/',
    max_age: 360000 
  }
  document.cookie = `token=${token}; path=${options.path}; max-age=${options.max_age}`;
}

export const getToken = () => {
  const token = 'token';
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + token.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export const removeToken = () => {
  document.cookie = `token=0123; max-age=0`;
}
