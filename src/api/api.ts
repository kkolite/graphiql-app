import { RESPONS_STATUS } from '../data/variable';

export async function fetchGraphQL(
  operationsDoc: string,
  operationName: string,
  variables: Record<string, string | number>,
  endpoint: string,
  header: HeadersInit
) {
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: header,
    body: JSON.stringify({
      query: operationsDoc,
      variables,
      operationName,
    }),
  })
    .then((response) => {
      if (response.status > RESPONS_STATUS) {
        return response.json();
      }
    })
    .catch(() => {
      return false;
    });
  return res;
}
