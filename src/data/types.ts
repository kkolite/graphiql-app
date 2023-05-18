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
  description: string;
  args: {
    name: string;
    type: string;
  }[];
  fields: (string | IQuery)[];
}

export interface IQuery {
  //_key: string;
 [key: string]: IQueryType;
}
