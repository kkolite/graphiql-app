export const operationsDoc = `query MyQuery {
    characters {
      results {
        image
        id
        gender
        name
      }
    }
  }
`;

export const infostatus = {
  resTime: '0.0',
  resSize: 0,
  status: true,
};
export interface IRequestHeaders {
  key: string;
  value: string;
}

export const reqHeaders: IRequestHeaders[] = [{ key: 'Content-type', value: 'application/json' }];
