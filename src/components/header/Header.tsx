import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { EPages } from '../../data/types';

import logo from '../../assets/graphql.svg';
import '../../styles/header.scss';

export const Header = () => {
  const { t, i18n } = useTranslation();

  const changeLang = (lang: string) => {
    i18n.changeLanguage(lang);
  };
  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo">
          <a href="/">
            <img src={logo} alt="" />
          </a>
        </div>
        <nav className="header__menu nav">
          <NavLink className="nav__item" to={EPages.HOME}>
            {t('pageHome')}
          </NavLink>
          <NavLink className="nav__item" to={EPages.IDE}>
            GraphQL
          </NavLink>
          <NavLink className="nav__item" to={EPages.LOGIN}>
            {t('pageLogin')}
          </NavLink>
        </nav>
        <div className="header__btn-box">
          <div className="header__sign">
            <button>Sign in</button>
            <button>Sign up</button>
          </div>
          <div className="header__lang">
            <button onClick={() => changeLang('en')}>EN</button>
            <button onClick={() => changeLang('ru')}>RU</button>
          </div>
        </div>
      </div>
    </header>
  );
};
