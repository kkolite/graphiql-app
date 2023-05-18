import { useTranslation } from 'react-i18next';
import { IQuery } from '../../../data/types';
import styles from './Type.module.scss';
import { TypeList } from './TypeList';

interface IProps {
  obj: IQuery;
  query: string;
}

export const Type = ({ obj, query }: IProps) => {
  const { t } = useTranslation();
  return (
    <div className={styles.container}>
      <h4 className={styles.name}>{query}</h4>
      <p>{obj[query].description}</p>
      <div className={styles.args}>
        <label className={styles.args__label}>{t('args')}</label>
        <ul className={styles.list}>
          {/*obj[query].args.map((el, i) => (
            <li key={i} className={styles.li}>
              {el.name} ({el.type})
            </li>
          ))*/}
        </ul>
      </div>
      <div className={styles.args}>
        <label className={styles.args__label}>{t('fields')}</label>
        <TypeList obj={obj[query]}/>
      </div>
    </div>
  );
};
