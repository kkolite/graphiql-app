import {
  GraphQLType,
  GraphQLObjectType,
  printSchema,
  // getNamedType,
  // GraphQLField,
  // GraphQLInterfaceType,
  // GraphQLUnionType,
  // GraphQLEnumType,
  // GraphQLInputObjectType,
  // GraphQLSchema,
} from 'graphql';
import { buildHTTPExecutor } from '@graphql-tools/executor-http';
import { schemaFromExecutor } from '@graphql-tools/wrap';
import { Maybe } from 'graphql/jsutils/Maybe';

const remoteExecutor = buildHTTPExecutor({
  endpoint: 'https://rickandmortyapi.com/graphql',
});
export const postsSubschema = {
  schema: await schemaFromExecutor(remoteExecutor),
  executor: remoteExecutor,
};

const rootTypes = [
  postsSubschema.schema.getQueryType(),
  postsSubschema.schema.getMutationType(),
  postsSubschema.schema.getSubscriptionType(),
].filter((x) => !!x);

console.log(rootTypes);
const name: string[] = [];
rootTypes.forEach((type: Maybe<GraphQLObjectType<string, GraphQLType>>) => {
  if (type) {
    console.log('isTypeOf ', type.isTypeOf);
    console.log('toJSON ', type.toJSON());
    console.log('toConfig ', type.toConfig());
    console.log('getFields', type.getFields());
    console.log('getType', postsSubschema.schema.getType('Continent'));
    const fields = type.getFields();
    Object.values(fields).forEach((fieldName) => {
      console.log('fieldName', fieldName);
      name.push(fieldName.name);
      // console.log('name', fieldName.name);
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
    });
  }
});

interface IPropsModel {
  // props: link;
  onClose?: () => void | undefined;
}

export const Shema = ({ onClose }: IPropsModel) => {
  return (
    <div id={`1`} className="modal" onClick={onClose}>
      <h2>Documentation Explorer</h2>
      <pre>{printSchema(postsSubschema.schema)}</pre>
    </div>
  );
};
