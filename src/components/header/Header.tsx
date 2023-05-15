import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';

import { EPages } from '../../data/types';
import { useAppSelector } from '../../store/hooks';
import { fbCheck, fbLogout } from '../../utils/firebase';

import logo from '../../assets/graphql.svg';
import './header.scss';

export const Header = () => {
  const [sticky, setSticky] = useState('');
  const { isSignUp } = useAppSelector((state) => state.headers);
  const { t, i18n } = useTranslation();
  const langLength = i18next.languages.length;
  const isUser = fbCheck();

  const changeLang = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const handleSignOut = () => {
    fbLogout();
    location.reload();
  };

  useEffect(() => {
    window.addEventListener('scroll', isSticky);
    return () => {
      window.removeEventListener('scroll', isSticky);
    };
  }, []);

  const isSticky = () => {
    const scrollTop = window.scrollY;
    const stickyClass = scrollTop >= 60 ? 'sticky' : '';
    setSticky(stickyClass);
  };

  const classes = `header ${sticky}`;

  return (
    <header className={classes}>
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
          {isUser && (
            <NavLink className="nav__item" to={EPages.IDE}>
              {t('pageIDE')}
            </NavLink>
          )}
        </nav>

        <div className="header__btn-box">
          <div className="header__sign">
            {isUser ? (
              <button onClick={handleSignOut}>{t('signout')}</button>
            ) : (
              <NavLink className={isSignUp ? 'header__active' : ''} to={EPages.LOGIN}>
                {t('signup')}
              </NavLink>
            )}
          </div>
          <div className="header__lang">
            <button className={langLength !== 1 ? 'active' : ''} onClick={() => changeLang('en')}>
              EN
            </button>
            <button className={langLength === 1 ? 'active' : ''} onClick={() => changeLang('ru')}>
              RU
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
