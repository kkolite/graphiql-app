import { GraphQLFieldMap } from 'graphql';
import { IQuery } from '../data/types';

// Код ниже ужастен, но по ТЗ нельзя использовать ts-ignore
// Здесь мы преобразуем GraphQL Map в объект для дальнейшей отрисовки доки

type TGraphType = {[key: string]: {type: {_fields: GraphQLFieldMap<unknown, unknown>}}};
type TFields = { _fields: string | number };
type TKey = {_key: string}

export const createObj = (item: GraphQLFieldMap<unknown, unknown>, name?: string) => {
  const result: IQuery = JSON.parse(JSON.stringify(item || {}));
  for (const key in item) {
    const types = (item[key].type as unknown as TFields)._fields || {};    
    const fields = Object.keys(types)
    .map((el) => {
      const newObj = (types as TGraphType)[el].type;

      if (newObj.hasOwnProperty('_fields')) {
        return createObj(newObj._fields, el);
      }
      return el
    });
    result[key].fields = fields;
  }

  (result as unknown as TKey)._key = name || '';
  return result;
};
