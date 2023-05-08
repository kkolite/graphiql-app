import { IQuery } from '../../../data/types';
import styles from './Type.module.scss';

interface IProps {
  obj: IQuery;
  query: string;
}

export const Type = ({ obj, query }: IProps) => {
  return (
    <div className={styles.container}>
      <h4 className={styles.name}>{query}</h4>
      <p>{obj[query].description}</p>
      <div className={styles.args}>
        <label className={styles.args__label}>Args:</label>
        <ul className={styles.list}>
          {obj[query].args.map((el, i) => (
            <li key={i} className={styles.li}>
              {el.name} ({el.type})
            </li>
          ))}
        </ul>
      </div>
      <br /> {/* temp!!!!!! */}
    </div>
  );
};
