import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import './reqheaders.scss';
import { setreqHeaders } from '../../store/slice/reqheadersSlice';

export const RHeaders = () => {
  const dispatch = useAppDispatch();
  const { itemsVal } = useAppSelector((state) => state.reqHeaders);
  const [key, setKey] = useState('');
  const [val, setValue] = useState('');

  const handelChangeKey = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKey(e.target.value);
  };
  const handelChangeVal = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleClick = () => {
    console.log(1);
    dispatch(setreqHeaders(itemsVal.concat({ key: key, value: val })));
    setKey('');
    setValue('');
  };

  return (
    <>
      <h2>Request Headers</h2>
      <table className="requestHeader">
        <thead className="requestHeader thead">
          <tr>
            <th>KEY</th>
            <th>VALUE</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {itemsVal.map((item) => {
            return (
              <tr key={item.key}>
                <td>{item.key}</td>
                <td>{item.value}</td>
                <td>x</td>
              </tr>
            );
          })}
          <tr>
            <td>
              <input placeholder="Enter Key" onChange={handelChangeKey} />
            </td>
            <td>
              <input placeholder="Enter Value" onChange={handelChangeVal} />
            </td>
            <td>
              <button className="graph__btn-endpoint" onClick={handleClick}>
                Save
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};
