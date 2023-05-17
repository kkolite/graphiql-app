export const RESPONS_STATUS = 199;
export const ENDPOINT = 'https://rickandmortyapi.com/graphql';

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

export const TOKEN = 'token';
export const MAX_AGE = 'max-age';
export const PATH = 'path';
