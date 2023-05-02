import { Suspense, useState } from 'react';

import { Shema } from './../components/shema/Shema';
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
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: operationsDoc || {},
      variables: variables,
      operationName: operationName,
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
  return await fetchGraphQL(operationsDoc, 'MyQuery', {});
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
  const [showDoc, setShowDoc] = useState(false);
  return (
    <div className={stide.ide}>
      IDE
      {/* <div>
        <h2>Explorer</h2>
        <div>
          {name.map((item) => (
            <p>{`${item}`}</p>
          ))}
        </div>
      </div> */}
      <div>
        <h2>GraphiQL</h2>
        <textarea key="1" defaultValue={operationsDoc} rows={35} cols={45} name="story"></textarea>
      </div>
      <div>
        <h2>Result</h2>
        <div>тут результат см. в консоле)</div>
      </div>
      <label>
        <input type="checkbox" checked={showDoc} onChange={(e) => setShowDoc(e.target.checked)} />
        Show Doc
      </label>
      {showDoc && (
        <Suspense fallback={<div>Loading...</div>}>
          <Shema></Shema>
        </Suspense>
      )}
    </div>
  );
};
