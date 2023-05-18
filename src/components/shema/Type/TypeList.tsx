import { IQueryType } from "../../../data/types";
import styles from './Type.module.scss';

interface IProps {
  obj: IQueryType;
  recursion?: boolean
}

export const TypeList = ({ obj, recursion }: IProps) => {
  return (
    <ul className={styles.list}>
      {obj.fields?.length ? (
        obj.fields.map((el, i) => (
          typeof el === 'string' 
          ? <li key={i} className={styles.li}>
              {el}
            </li>
          : <li key={i}>
              <p>{(el as unknown as {_key: string})._key}</p>
              {
                Object.keys(el).map((type, i) => (
                  type === '_key'
                  ? <></>
                  : <TypeList obj={el[type]} key={i} recursion={true} />
                ))
              }
            </li>
        ))
      ) : (
        recursion 
        ? <li className={styles.li__recursion + ' ' + styles.li}>
            {obj.name}
          </li>
        : <p>-</p>
      )}
    </ul>
  );
};
