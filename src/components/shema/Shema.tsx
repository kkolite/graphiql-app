import { IQuery } from '../../data/types';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getSchema } from '../../store/slice/querySlice';
import { Select } from './Select/Select';
import { Type } from './Type/Type';

export const Shema = () => {
  const data = useAppSelector(store => store.query.data);
  const isLoading = useAppSelector(store => store.query.isLoading);
  const dispatch = useAppDispatch();

  const keysArr = Object.keys(data);
  //temp

  const handleClick = () => {
    dispatch(getSchema('https://rickandmortyapi.com/graphql'));
  }

  return (
    <>
      <h2>Documentation Explorer</h2>
      <button onClick={handleClick}>Get docs</button>      
      {
        isLoading
        ? <p>Loading...</p>
        : <div id={`1`} className="modal">
            <Select/>
            {keysArr.map((el, i) => (
              <Type obj={data} query={el} key={i} />
            ))}
          </div>
      }
    </>
    
  );
};
