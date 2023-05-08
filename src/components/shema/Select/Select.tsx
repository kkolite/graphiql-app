import { ChangeEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setSelect } from '../../../store/slice/querySlice';
import styles from './Select.module.scss';

export const Select = () => {
  const [value, setValue] = useState('');
  const dicpatch = useAppDispatch();
  const data = useAppSelector((store) => store.query.origin);
  const keys = Object.keys(data);

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
    dicpatch(setSelect(e.target.value));
  };
  return (
    <select value={value} onChange={handleSelect} className={styles.select}>
      <option value="">All</option>
      {keys.map((el, i) => (
        <option value={el} key={i} className={styles.option}>
          {el}
        </option>
      ))}
    </select>
  );
};
