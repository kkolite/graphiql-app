import React, { ChangeEvent } from 'react';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setSelect } from '../../../store/slice/querySlice';
import styles from './Select.module.scss';

export const Select = () => {
  const value = useAppSelector((store) => store.query.select);
  const dicpatch = useAppDispatch();
  const data = useAppSelector((store) => store.query.origin);
  const keys = Object.values(data);

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    dicpatch(setSelect(e.target.value));
  };

  return (
    <select value={value} onChange={handleSelect} className={styles.select}>
      <option value="">All</option>
      {keys.map((el, i) =>
        typeof el === 'string' ? (
          <React.Fragment key={i}></React.Fragment>
        ) : (
          <option value={el.type} key={i} className={styles.option}>
            {el.name}
          </option>
        )
      )}
    </select>
  );
};
