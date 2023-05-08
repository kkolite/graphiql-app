import { Suspense, useState } from 'react';
import JSONPretty from 'react-json-pretty';
import { useTranslation } from 'react-i18next';

import { Shema } from './../components/shema/Shema';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setEndpoint } from '../store/slice/endpointSlice';
import { fetchGraphQL } from '../api/api';
import { RHeaders } from '../components/reqheaders/Reqheaders';
import { operationsDoc, infostatus } from '../data/variable';
import './ide.scss';
import './json.scss';
import { getSchema } from '../store/slice/querySlice';
import { createQuery, getResults } from '../utils/createQuery';

async function startFetchUnnamedQuery(
  endpoint: string,
  query: string,
  name: string,
  variable: Record<string, string | number>
) {
  if (endpoint !== '' && query !== '') {
    const data = await fetchGraphQL(query, name, variable, endpoint);
    return data;
  }
}

export const IDE = () => {
  const dispatch = useAppDispatch();
  const { endpoint } = useAppSelector((state) => state.endpoint);
  const [showDoc, setShowDoc] = useState(false);
  const [query, setQuery] = useState(operationsDoc);
  const [variable, setVariable] = useState('');
  const [result, setResult] = useState('');
  const [info, setInfo] = useState(infostatus);
  const { t } = useTranslation();
  let lengthStr = '';
  let colrow = 35;
  const countStr = query.split(/\r\n|\r|\n/).length;
  for (let i = 1; i < countStr + 1; i += 1) {
    lengthStr += `${i}\r\n`;
    if (countStr > colrow) colrow = countStr;
  }

  const handelChangeEP = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setEndpoint(e.target.value));
  };
  const handelChangeQ = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuery(e.target.value);
  };
  const handelChangeV = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setVariable(e.target.value);
  };

  const handleClick = () => {
    if (endpoint === '' && query === '') return;

    const [queryPost, paramName] = createQuery(query);
    setQuery(queryPost);

    const variableObj: Record<string, string | number> = variable ? JSON.parse(variable) : {};

    const start = performance.now();

    startFetchUnnamedQuery(endpoint, queryPost, paramName, variableObj).then((item) => {
      const { format, size, status, time } = getResults(item, start);
      setResult(format);
      setInfo({ resTime: time.toFixed(1), resSize: size, status: status });
    });

    dispatch(getSchema(endpoint));
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
      <div className="graph__header">
        <RHeaders></RHeaders>
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
        <div className="graph__count">{lengthStr}</div>
        <div className="graph__value">
          <textarea value={query} onChange={handelChangeQ} rows={colrow} name="story"></textarea>
          <h2>Query Variables</h2>
          <textarea onChange={handelChangeV} rows={5}></textarea>
        </div>
        <div className="graph__result">
          {result && (
            <div className="graph__status">
              {t('resTime')} <span className="graph__status-bold">{info.resTime}</span> {t('ms')}{' '}
              {t('resSize')} <span className="graph__status-bold">{info.resSize}</span> {t('bytes')}{' '}
              {(info.status && <div className="mdi-checkbox-marked-circle-outline"></div>) || (
                <div className="mdi-close-circle-outline"></div>
              )}
            </div>
          )}
          <JSONPretty className="graph__json" id="json-pretty" data={result}></JSONPretty>
        </div>
      </div>
    </section>
  );
};
