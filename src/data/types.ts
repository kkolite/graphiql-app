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

export interface IQueryType {
  name: string;
  type: string;
  description: string;
  args: {
    name: string;
    type: string;
  }[];
  fields: (string | IQuery | { _key: string; fields: { name: string } })[];
  link?: string;
}

export interface IQuery {
  [key: string]: IQueryType;
}
