import { Suspense, useState } from 'react';
import JSONPretty from 'react-json-pretty';

import { Shema } from './../components/shema/Shema';
import '../styles/ide.scss';
import '../styles/json.scss';

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
  }
`;

async function startFetchUnnamedQuery(endpoint: string, query: string) {
  if (endpoint === '') endpoint = 'https://rickandmortyapi.com/graphql';
  if (endpoint !== '') {
    const { errors, data } = await fetchGraphQL(query, 'MyQuery', {}, endpoint);

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
  const [query, setQuery] = useState(operationsDoc);
  const [result, setResult] = useState('');

  const handelChangeEP = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndpoint(e.target.value);
  };
  const handelChangeQ = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuery(e.target.value);
  };

  const handleClick = () => {
    if (endpoint !== '') {
      const data = startFetchUnnamedQuery(endpoint, query);
      data.then((item) => {
        console.log('item', item);
        setResult(JSON.stringify(item, null, 2));
      });
    }
  };

  return (
    <section className="main__container main__graph graph">
      <div className="graph__query">
        <div className="graph__endpoint">
          <div>Endpoint:</div>
          <input
            className="graph__intpoint"
            placeholder="input endpoint"
            value={endpoint}
            name="endpoint"
            onChange={handelChangeEP}
          />
        </div>
        <div className="graph__btn-endpoint" onClick={handleClick}>
          Send
        </div>
      </div>

      <div className="graph__docs">
        <label>
          <input type="checkbox" checked={showDoc} onChange={(e) => setShowDoc(e.target.checked)} />
          Show Doc
        </label>
        {showDoc && (
          <Suspense fallback={<div>Loading...</div>}>
            <Shema endpoint={endpoint}></Shema>
          </Suspense>
        )}
      </div>

      <div className="graph__edit">
        <div className="graph__value">
          <textarea
            value={query}
            onChange={handelChangeQ}
            rows={35}
            cols={45}
            name="story"
          ></textarea>
        </div>
        <JSONPretty className="graph__result" id="json-pretty" data={result}></JSONPretty>
      </div>
    </section>
  );
};
