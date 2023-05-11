import { GraphQLFieldMap } from 'graphql';
import { IQuery } from '../data/types';

export const createObj = (item: GraphQLFieldMap<unknown, unknown>) => {
  const result: IQuery = JSON.parse(JSON.stringify(item || {}));
  for (const key in item) {
    const fields = Object.keys(
      (item[key].type as unknown as { _fields: string | number })._fields || {}
    );
    result[key].fields = fields;
  }
  return result;
};
