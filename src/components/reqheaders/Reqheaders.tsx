import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import './reqheaders.scss';
import { setreqHeaders } from '../../store/slice/reqheadersSlice';

export const RHeaders = () => {
  const dispatch = useAppDispatch();
  const { itemsVal } = useAppSelector((state) => state.reqHeaders);
  const [key, setKey] = useState('');
  const [val, setValue] = useState('');
  const { t } = useTranslation();

  const handelChangeKey = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKey(e.target.value);
  };
  const handelChangeVal = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleClick = () => {
    if (key !== '' && val !== '') {
      dispatch(setreqHeaders(itemsVal.concat({ key: key, value: val })));
      setKey('');
      setValue('');
    }
  };

  return (
    <>
      <h2>{t('request')}</h2>
      <table className="requestHeader">
        <thead className="requestHeader thead">
          <tr>
            <th>{t('key')}</th>
            <th>{t('value')}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {itemsVal.map((item) => {
            return (
              <tr key={item.key}>
                <td>{item.key}</td>
                <td>{item.value}</td>
                <td>
                  <span className="dell">&times;</span>
                </td>
              </tr>
            );
          })}
          <tr>
            <td>
              <input placeholder={t('inputKey') as string} onChange={handelChangeKey} />
            </td>
            <td>
              <input placeholder={t('inputValue') as string} onChange={handelChangeVal} />
            </td>
            <td>
              <button className="graph__btn-endpoint" onClick={handleClick}>
                {t('save')}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};
