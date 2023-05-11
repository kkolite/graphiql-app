import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import './reqheaders.scss';
import { setreqHeaders } from '../../store/slice/reqheadersSlice';

export const RHeaders = () => {
  const dispatch = useAppDispatch();
  const { itemsVal } = useAppSelector((state) => state.reqHeaders);
  const [key, setKey] = useState('');
  const [val, setValue] = useState('');
  const [isTable, setShow] = useState(false);
  const [znak, setZnak] = useState(' > ');
  const { t } = useTranslation();

  const handelChangeKey = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKey(e.target.value);
  };
  const handelChangeVal = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleClick = () => {
    if (key !== '' && val !== '') {
      let isFind = false;
      itemsVal.find((item) => {
        if (item.key === key) {
          isFind = true;
          toast.error(`${t('duplicate') as string}`);
        }
      });
      if (!isFind) {
        dispatch(setreqHeaders(itemsVal.concat({ key: key, value: val })));
        setKey('');
        setValue('');
      }
    } else toast.error(`${t('emptry') as string}`);
  };

  const dellHeader = (index: number) => {
    const newArr = [...itemsVal];
    newArr.splice(index, 1);
    dispatch(setreqHeaders(newArr));
  };

  const tableShow = () => {
    if (!isTable) {
      setZnak(' ∨ ');
      setShow(true);
    } else {
      setZnak(' > ');
      setShow(false);
    }
  };

  return (
    <>
      <h2>
        <span className="showTable" onClick={() => tableShow()}>
          {znak}
        </span>
        {t('request')}
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
      </h2>
      {isTable && (
        <table className="requestHeader">
          <thead className="requestHeader thead">
            <tr>
              <th>{t('key')}</th>
              <th>{t('value')}</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {itemsVal.map((item, index) => {
              return (
                <tr key={item.key}>
                  <td>{item.key}</td>
                  <td>{item.value}</td>
                  <td>
                    <span className="dell" onClick={() => dellHeader(index)}>
                      &times;
                    </span>
                  </td>
                </tr>
              );
            })}
            <tr>
              <td>
                <input
                  placeholder={t('inputKey') as string}
                  value={key}
                  onChange={handelChangeKey}
                />
              </td>
              <td>
                <input
                  placeholder={t('inputValue') as string}
                  value={val}
                  onChange={handelChangeVal}
                />
              </td>
              <td>
                <button className="graph__btn-endpoint" onClick={handleClick}>
                  {t('save')}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </>
  );
};
