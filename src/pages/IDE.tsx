import { Suspense, useState } from 'react';
import JSONPretty from 'react-json-pretty';
import { useTranslation } from 'react-i18next';

import { Shema } from './../components/shema/Shema';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setEndpoint } from '../store/slice/endpointSlice';
import { fetchGraphQL } from '../api/api';
import { operationsDoc } from '../data/variable';
import '../styles/ide.scss';
import '../styles/json.scss';

//https://spacex-production.up.railway.app/graphql

async function startFetchUnnamedQuery(endpoint: string, query: string, name: string) {
  if (endpoint !== '' && query !== '') {
    const { errors, data } = await fetchGraphQL(query, name, {}, endpoint);

    if (errors) {
      return errors;
    }
    return data;
  }
}

export const IDE = () => {
  const dispatch = useAppDispatch();
  const { endpoint } = useAppSelector((state) => state.endpoint);
  const [showDoc, setShowDoc] = useState(false);
  const [query, setQuery] = useState(operationsDoc);
  const [result, setResult] = useState('');
  const { t } = useTranslation();

  const handelChangeEP = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setEndpoint(e.target.value));
  };
  const handelChangeQ = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuery(e.target.value);
  };

  const handleClick = () => {
    if (endpoint !== '' && query !== '') {
      const userQuery = query.split('{');
      let queryPost = query;
      const param = userQuery[0].trim().split(' ');
      let paramName = param[1];
      if (!(param.length === 2 && param[0] !== '' && param[1] !== '')) {
        userQuery.shift();
        paramName = 'MyQuery';
        queryPost = `query ${paramName} { ${userQuery.join('{')}`;
      }
      setQuery(queryPost);
      const data = startFetchUnnamedQuery(endpoint, queryPost, paramName);
      data.then((item) => {
        setResult(JSON.stringify(item, null, 2));
      });
    }
  };

  return (
    <section className="main__container main__graph graph">
      <div className="graph__query">
        <div className="graph__endpoint">
          <div>{t('Endpoint')}:</div>
          <input
            className="graph__intpoint"
            placeholder={t('inputendp') as string}
            value={endpoint}
            name="endpoint"
            onChange={handelChangeEP}
          />
        </div>
        <div className="graph__btn-endpoint" onClick={handleClick}>
          {t('SEND')}
        </div>
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
