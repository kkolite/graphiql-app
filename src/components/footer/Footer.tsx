import { useTranslation } from 'react-i18next';

import './footer.scss';
import rsschool from '../../assets/rs_shool.svg';
import github from '../../assets/github.png';
import cats from '../../assets/fcats.png';

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="footer__box footer__container">
        <div className="footer__github">
          <div className="footer__project">
            <a href="https://github.com/kkolite/graphiql-app" target="_blank">
              <img src={github} alt="" />
            </a>
          </div>
          <div className="footer__link">
            <a href="https://github.com/kkolite" target="_blank">
              <img src={cats} alt="" />
              kkolite
            </a>
            <a href="https://github.com/koctia" target="_blank">
              <img src={cats} alt="" />
              koctia
            </a>
            <a href="https://github.com/motoblock" target="_blank">
              <img src={cats} alt="" />
              motoblock
            </a>
          </div>
        </div>
        <div className="footer__rsschool">
          <a href="https://rs.school/react/" target="_blank">
            <img src={rsschool} alt="" />
          </a>
        </div>
      </div>
      <div className="footer__copywrite footer__container">RS-GraphQL © 2023 {t('copywrite')}</div>
    </footer>
  );
};
