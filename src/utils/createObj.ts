import { GraphQLFieldMap } from "graphql";
import { IQuery } from "../data/types";

export const createObj = (item: GraphQLFieldMap<unknown, unknown>) => {
  const result: IQuery = JSON.parse(JSON.stringify(item || {}));
  for (let key in item) {
    const fields = Object.keys(JSON.parse(JSON.stringify(item[key].type._fields || {})));
    result[key].fields = fields;
  }
  return result;
}
