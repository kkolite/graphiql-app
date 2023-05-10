export async function fetchGraphQL(
  operationsDoc: string,
  operationName: string,
  variables: Record<string, string | number>,
  endpoint: string,
  header: HeadersInit
) {
  const result = await fetch(endpoint, {
    method: 'POST',
    headers: header,
    body: JSON.stringify({
      query: operationsDoc,
      variables,
      operationName,
    }),
  });
  return result.json();
}
