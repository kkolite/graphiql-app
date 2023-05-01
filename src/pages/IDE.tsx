import {
  // getNamedType,
  // GraphQLField,
  GraphQLType,
  GraphQLObjectType,
  printSchema
  // GraphQLInterfaceType,
  // GraphQLUnionType,
  // GraphQLEnumType,
  // GraphQLInputObjectType,
  // GraphQLSchema,
} from 'graphql';
import { buildHTTPExecutor } from '@graphql-tools/executor-http';
import { schemaFromExecutor } from '@graphql-tools/wrap'
import { Maybe } from 'graphql/jsutils/Maybe';

import stide from './ide.module.css';

// function getTypeInstance(type: GraphQLSchema) {
//   if (type instanceof GraphQLInterfaceType) {
//     return 'interface'
//   } else if (type instanceof GraphQLUnionType) {
//     return 'union'
//   } else if (type instanceof GraphQLEnumType) {
//     return 'enum'
//   } else if (type instanceof GraphQLInputObjectType) {
//     return 'input'
//   } else {
//     return 'type'
//   }
// }

const remoteExecutor = buildHTTPExecutor({
  endpoint: 'https://rickandmortyapi.com/graphql'
})
export const postsSubschema = {
  schema: await schemaFromExecutor(remoteExecutor),
  executor: remoteExecutor
}

console.log(postsSubschema.schema);
const rootTypes = [
  postsSubschema.schema.getQueryType(),
  postsSubschema.schema.getMutationType(),
  postsSubschema.schema.getSubscriptionType(),
].filter(x => !!x);

console.log(rootTypes);
const name: string[] = [];
  rootTypes.forEach((type: Maybe<GraphQLObjectType<string, GraphQLType>>) => {
    if (type) {
      console.log('isTypeOf ', type.isTypeOf);
      console.log('toJSON ', type.toJSON());
      console.log('toConfig ', type.toConfig());
      console.log('getFields', type.getFields());
      console.log('getType', postsSubschema.schema.getType('Continent') );
      const fields = type.getFields();
      Object.values(fields).forEach((fieldName) => {
        console.log('fieldName', fieldName);
        name.push(fieldName.name);
        console.log('name', fieldName.name);
        console.log('type', fieldName.type);
        // console.log('type', fieldName.type);
        // if (fieldName.type == 'GraphQLObjectType')

        // console.log('index', index);
        // console.log('fields[fieldName]', fields[fieldName]);
        // console.log(fields[fieldName].astNode);
        // if (!fields[fieldName].astNode) {
        //   const astNode = graphQLCustomTypeDef.fields.find(field => field.name.value === graphQLSchemaTypeFieldName);

        //   if (astNode) {
        //    graphQLSchemaTypeField.astNode = astNode;
        //   }
        //  }
      })
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

async function fetchGraphQL(
  operationsDoc: string,
  operationName: string,
  variables: Record<string, unknown>
) {
  const result = await fetch('https://rickandmortyapi.com/graphql', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query: operationsDoc || {},
      variables: variables,
      operationName: operationName
    }),
  });
  return result.json();
}

const operationsDoc = `
query MyQuery {
  characters {
    results {
      image
      id
      gender
      name
    }
  }
  }`;

  async function fetchUnnamedQuery1() {
  return await fetchGraphQL(
    operationsDoc,
    "MyQuery",
    {}
  );
}


async function startFetchUnnamedQuery1() {
  const { errors, data } = await fetchUnnamedQuery1();

  if (errors) {
    console.error(errors);
  }
  console.log(data);
}

startFetchUnnamedQuery1();


export const IDE = () => {
  return (
    <div className={stide.ide}>
      IDE
      <div>
        <h2>Explorer</h2>
        <div>{name.map((item) => <p>{`${item}`}</p>)}</div>
      </div>
      <div>
        <h2>GraphiQL</h2>
        <textarea key='1' defaultValue={operationsDoc} rows={35} cols={45} name="story"></textarea>
      </div>
      <div>
        <h2>Result</h2>
        <div>тут результат см. в консоле)</div>
      </div>
      <div>
        <h2>Documentation Explorer</h2>
        <div><pre>{printSchema(postsSubschema.schema)}</pre></div>
      </div>
    </div>
  );
};
