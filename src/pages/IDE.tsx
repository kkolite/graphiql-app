import { Suspense, useState } from 'react';

import { Shema } from './../components/shema/Shema';
import '../styles/ide.scss';

//'https://rickandmortyapi.com/graphql'
//https://spacex-production.up.railway.app/graphql
async function fetchGraphQL(
  operationsDoc: string,
  operationName: string,
  variables: Record<string, unknown>,
  endpoint: string
) {
  const result = await fetch(endpoint, {
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

async function startFetchUnnamedQuery(endpoint: string) {
  if (endpoint === '') endpoint = 'https://rickandmortyapi.com/graphql';
  if (endpoint !== '') {
    const { errors, data } = await fetchGraphQL(operationsDoc, 'MyQuery', {}, endpoint);

    if (errors) {
      console.error(errors);
    } else {
      return data;
    }
  }
}

export const IDE = () => {
  const [showDoc, setShowDoc] = useState(false);
  const [endpoint, setEndpoint] = useState('');
  const [result, setResult] = useState('');
  const handelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndpoint(e.target.value);

    const data = startFetchUnnamedQuery(endpoint);
    data.then((item) => {
      console.log('item', item);
      console.log('stringify', JSON.stringify(item));
      setResult(JSON.stringify(item));
    });
  };

  return (
    <section className="main__container main__graph graph">
      <div className="graph__query">
        <div className="graph__endpoint">
          <div>endpoint:</div>
          <input
            className="graph__intpoint"
            placeholder="input endpoint"
            value={endpoint}
            name="endpoint"
            onChange={handelChange}
          />
        </div>
        <div className="graph__btn-endpoint">Send</div>
      </div>

      <div className="graph__docs">
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

      <div className="graph__edit">
        <div className="graph__value">
          <textarea
            key="1"
            defaultValue={operationsDoc}
            rows={35}
            cols={45}
            name="story"
          ></textarea>
        </div>
        <div className="graph__result">{result}</div>
      </div>
    </section>
  );
};
