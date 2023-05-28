import { useTranslation } from 'react-i18next';

import './error.scss';
import wallpaper from '../assets/wallpaper.jpg';

export const Error = () => {
  const { t } = useTranslation();

  return (
    <section className="main__remark remark">
      <div className="remark__fon">
        <img src={wallpaper} alt="he cat's smile" />
      </div>

      <div className="remark__box remark__container">
        <div className="remark__rigth"></div>
        <div className="remark__left">
          <div className="remark__message">
            <div className="remark__error">{t('404')}</div>
            <div className="remark__whoops">{t('oh')}</div>
            <div className="remark__text">{t('findpage')} :(</div>
          </div>
          <div className="remark__btn">
            <a href="/" className="remark__home">
              {t('gohome')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
