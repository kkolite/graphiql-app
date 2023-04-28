import {
  // getNamedType,
  // GraphQLSchema,
  // GraphQLField,
  GraphQLType,
  GraphQLObjectType,
  GraphQLInterfaceType,
  GraphQLUnionType,
  GraphQLEnumType,
  GraphQLInputObjectType,
  GraphQLSchema,
} from 'graphql';
import { buildHTTPExecutor } from '@graphql-tools/executor-http';
import { schemaFromExecutor } from '@graphql-tools/wrap'
import { Maybe } from 'graphql/jsutils/Maybe';

function getTypeInstance(type: GraphQLSchema) {
  if (type instanceof GraphQLInterfaceType) {
    return 'interface'
  } else if (type instanceof GraphQLUnionType) {
    return 'union'
  } else if (type instanceof GraphQLEnumType) {
    return 'enum'
  } else if (type instanceof GraphQLInputObjectType) {
    return 'input'
  } else {
    return 'type'
  }
}

const remoteExecutor = buildHTTPExecutor({
  endpoint: 'https://countries.trevorblades.com/graphql'
})
export const postsSubschema = {
  schema: await schemaFromExecutor(remoteExecutor),
  executor: remoteExecutor
}
console.log(postsSubschema.schema);
const rootTypes = [
  postsSubschema.schema.getQueryType(),
  // postsSubschema.schema.getMutationType(),
  postsSubschema.schema.getSubscriptionType(),
].filter(x => !!x);

console.log(rootTypes);

  rootTypes.forEach((type: Maybe<GraphQLObjectType<GraphQLType, GraphQLType>>) => {
    if (type) {
      console.log('name ', type.name);
      console.log('isTypeOf ', type.isTypeOf);
      console.log('toJSON ', type.toJSON());
      console.log('toConfig ', type.toConfig());
      console.log('getFields', type.getFields());
      console.log('getType', postsSubschema.schema.getType('Continent') );
      const fields = type.getFields();
      Object.values(fields).forEach((fieldName, index) => {
        console.log('fieldName', fieldName);
        console.log('index', index);
        // console.log('fields[fieldName]', fields[fieldName]);
        // console.log(fields[fieldName].astNode);
        // if (!fields[fieldName].astNode) {
        //   const astNode = graphQLCustomTypeDef.fields.find(field => field.name.value === graphQLSchemaTypeFieldName);
  
        //   if (astNode) {
        //    graphQLSchemaTypeField.astNode = astNode;
        //   }
        //  }
      })
      // const fields2 = postsSubschema.schema.getType('Continent');
      // Object.keys(fields2).forEach(fieldName => {
      //   console.log(fieldName);
      // })
    }
  });
  // const objectValues =
  // Object.values || (obj => Object.keys(obj).map(key => obj[key]));
  // const types = objectValues(typeMap)
  // .sort((type1, type2) => type1.name.localeCompare(type2.name))
  // .filter(type => !defaultTypes.includes(type.name))
  // .map(type => ({
  //   ...type,
  //   ...serialize(schema, type),
  //   instanceOf: getTypeInstance(type),
  // }))


export const IDE = () => {
  return (
    <div>
      IDE
    </div>
  );
};
