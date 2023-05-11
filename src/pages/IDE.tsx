import { Suspense, useState } from 'react';
import JSONPretty from 'react-json-pretty';
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  variable: Record<string, string | number>,
  header: HeadersInit
) {
  if (endpoint !== '' && query !== '') {
    const response = await fetchGraphQL(query, name, variable, endpoint, header);
    return response.json();
  }
}

export const IDE = () => {
  const dispatch = useAppDispatch();
  const { endpoint } = useAppSelector((state) => state.endpoint);
  const { itemsVal } = useAppSelector((state) => state.reqHeaders);
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
    if (endpoint === '') {
      toast.error(`${t('emptryendpoint')}`);
      return;
    }
    const result = endpoint.match('^(http|https)://');
    if (!result) toast.error(`${t('emptryendpoint')}`);

    if (query === '') {
      toast.error(`${t('emptryquery')}`);
      return;
    }
    if (typeof query !== 'string') {
      toast.error(`${t('novalidquery')}`);
      return false;
    }

    const [queryPost, paramName] = createQuery(query);
    setQuery(queryPost);
    if (variable !== '') {
      try {
        JSON.parse(variable);
      } catch (e) {
        toast.error(`${t('novalidvar')}`);
        return false;
      }
    }

    const variableObj: Record<string, string | number> = variable ? JSON.parse(variable) : {};

    const start = performance.now();

    let head: HeadersInit = {};
    itemsVal.forEach((item: object) => {
      const parsHeaader = JSON.parse(JSON.stringify(item));

      head = JSON.parse(
        JSON.stringify(Object.assign(head, { [parsHeaader.key]: parsHeaader.value }))
      );
    });

    startFetchUnnamedQuery(endpoint, queryPost, paramName, variableObj, head).then((item) => {
      const { format, size, status, time } = getResults(item, start);
      setResult(format);
      setInfo({ resTime: time.toFixed(1), resSize: size, status: status });
    });

    dispatch(getSchema(endpoint));
  };

  const graphShema = showDoc ? `graph__shema graph__shema_active` : `graph__shema`;

  return (
    <section className="main__container main__graph graph">
      <div className="graph__query">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
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
        <div className="graph__show graph__show_action">
          <label>
            <input
              type="checkbox"
              checked={showDoc}
              onChange={(e) => setShowDoc(e.target.checked)}
              value="1"
            />
            <div>Show Doc</div>
          </label>
        </div>
        <div className={graphShema}>
          <div>
            {showDoc && (
              <Suspense fallback={<div>{t('loading')}</div>}>
                <Shema></Shema>
              </Suspense>
            )}
          </div>
        </div>
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
