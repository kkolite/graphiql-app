export enum EPages {
  HOME = '/',
  LOGIN = '/login',
  IDE = '/ide',
}

export enum EValidate {
  EMAIL = 'EMAIL',
  USERNAME = 'USERNAME',
  PASSWORD = 'PASSWORD',
}

interface IQueryType {
  name: string;
  description: string;
  args: {
    name: string;
    type: string;
  }[];
  fields: string[]
}

export interface IQuery {
  [key: string]: IQueryType;
}
