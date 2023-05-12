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
      if (response.ok) {
        return response.json();
      }
    })
    .catch((error) => {
      return error;
    });
  return res;
}
