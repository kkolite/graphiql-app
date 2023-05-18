import { ChangeEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setSelect } from '../../../store/slice/querySlice';
import styles from './Select.module.scss';

export const Select = () => {
  //const [value, setValue] = useState('');
  const value = useAppSelector(store => store.query.select);
  const dicpatch = useAppDispatch();
  const data = useAppSelector((store) => store.query.origin);
  const keys = Object.values(data);

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    //setValue(e.target.value);
    dicpatch(setSelect(e.target.value));
    console.log(value);
  };

  return (
    <select value={value} onChange={handleSelect} className={styles.select}>
      {keys.map((el, i) => (
        <option value={el.type} key={i} className={styles.option}>
          {el.name}
        </option>
      ))}
    </select>
  );
};
