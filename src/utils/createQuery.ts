export const createQuery = (query: string) => {
  const userQuery = query.split('{');
  let queryPost = query;
  const str = userQuery[0].split('(');
  let param = [];
  if (str.length > 1) param = str[0].trim().split(' ');
  else param = userQuery[0].trim().split(' ');
  let paramName = param[1];
  if (!(param.length === 2 && param[0] !== '' && param[1] !== '')) {
    userQuery.shift();
    paramName = 'MyQuery';
    queryPost = `query ${paramName} { ${userQuery.join('{')}`;
  }
  return [queryPost, paramName];
};

export const getResults = (item: { errors: unknown }, start: number) => {
  const finish = performance.now();

  const format = JSON.stringify(item, null, 2);
  const status = !item.errors;
  const time = finish - start;
  const size = format.length;

  return { status, time, size, format };
};
