import { Suspense, useState } from 'react';
import JSONPretty from 'react-json-pretty';
import { useTranslation } from 'react-i18next';

import { Shema } from './../components/shema/Shema';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setEndpoint } from '../store/slice/endpointSlice';
import { fetchGraphQL } from '../api/api';
import { operationsDoc, infostatus } from '../data/variable';
import '../styles/ide.scss';
import '../styles/json.scss';

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
    if (endpoint !== '' && query !== '') {
      const userQuery = query.split('{');
      let queryPost = query;
      const str = userQuery[0].split('(');
      let param = [];
      if (str.length > 1) param = str[0].trim().split(' ');
      else param = userQuery[0].trim().split(' ');
      let paramName = param[1];
      if (!(param.length === 2 && param[0] !== '' && param[1] !== '')) {
        userQuery.shift();
        paramName = 'MyQuery';
        queryPost = `query ${paramName} { ${userQuery.join('{')}`;
      }
      setQuery(queryPost);
      let variableObj: Record<string, string | number> = {};
      if (variable !== '') variableObj = JSON.parse(variable);
      const date = performance.now();
      const data = startFetchUnnamedQuery(endpoint, queryPost, paramName, variableObj);
      data.then((item) => {
        const resFormat = JSON.stringify(item, null, 2);
        setResult(resFormat);
        let status = true;
        if (item.errors) status = false;
        const date2 = performance.now();
        const resTime = date2 - date;
        const resSize = resFormat.length;
        setInfo({ resTime: resTime.toFixed(1), resSize: resSize, status: status });
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
        <div className="graph__count">{lengthStr}</div>
        <div className="graph__value">
          <textarea value={query} onChange={handelChangeQ} rows={colrow} name="story"></textarea>
          <h2>Query Variables</h2>
          <textarea onChange={handelChangeV} rows={5}></textarea>
        </div>
        <div>
          RESPONSE TIME {info.resTime} ms RESPONSE SIZE {info.resSize} bytes{' '}
          {info.status ? 'GREEN' : 'RED'}
        </div>
        <JSONPretty className="graph__result" id="json-pretty" data={result}></JSONPretty>
      </div>
    </section>
  );
};
