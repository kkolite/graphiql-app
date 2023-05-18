import { MouseEvent } from "react";
import { IQuery, IQueryType } from "../../../data/types";
import { useAppDispatch } from "../../../store/hooks";
import styles from './Type.module.scss';
import { setSelect } from "../../../store/slice/querySlice";

interface IProps {
  obj: IQueryType;
  recursion?: boolean
}

export const TypeList = ({ obj, recursion }: IProps) => {
  const disatch = useAppDispatch();
  const handleClick = (e: MouseEvent<HTMLLIElement, globalThis.MouseEvent>) => {
    disatch(setSelect(e.currentTarget.textContent as string))
  }

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
                  : <TypeList obj={(el as IQuery)[type]} key={i} recursion={true} />
                ))
              }
            </li>
        ))
      ) : (
        recursion 
        ? <li 
            className={styles.li__recursion + ' ' + styles.li + ' ' + (obj.link ? styles.link : '')}
            onClick={obj.link ? handleClick : () => {}}
          >
            {obj.name}
          </li>
        : <p>-</p>
      )}
    </ul>
  );
};
