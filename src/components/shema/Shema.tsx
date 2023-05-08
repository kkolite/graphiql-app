import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../store/hooks';

import { Select } from './Select/Select';
import { Type } from './Type/Type';
import styles from './Schema.module.scss';

export const Shema = () => {
  const data = useAppSelector((store) => store.query.data);
  const isLoading = useAppSelector((store) => store.query.isLoading);
  const { t } = useTranslation();

  const keysArr = Object.keys(data);

  return (
    <div className={styles.container}>
      {isLoading ? (
        <p>{t('loading')}</p>
      ) : keysArr.length ? (
        <>
          <Select />
          <div className={styles.list}>
            {keysArr.map((el, i) => (
              <Type obj={data} query={el} key={i} />
            ))}
          </div>
        </>
      ) : (
        <p>{t('empty')}</p>
      )}
    </div>
  );
};
