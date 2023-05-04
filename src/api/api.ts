export async function fetchGraphQL(
  operationsDoc: string,
  operationName: string,
  variables: Record<string, string | number>,
  endpoint: string
) {
  const result = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: operationsDoc,
      variables,
      operationName,
    }),
  });
  return result.json();
}
