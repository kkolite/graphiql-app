import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';

import { EPages } from '../../data/types';
import { setBtnSignIn, setBtnSignUp } from '../../store/slice/headerSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

import logo from '../../assets/graphql.svg';
import './header.scss';

export const Header = () => {
  const [sticky, setSticky] = useState('');
  console.log(i18next.languages);
  const dispatch = useAppDispatch();
  const { isSignIn, isSignUp } = useAppSelector((state) => state.headers);
  const { t, i18n } = useTranslation();

  const changeLang = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const changeSign = (status: string) => {
    if (status === 'in') {
      dispatch(setBtnSignIn(true));
      dispatch(setBtnSignUp(false));
    }
    if (status === 'up') {
      dispatch(setBtnSignIn(false));
      dispatch(setBtnSignUp(true));
    }
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
          <NavLink className="nav__item" to={EPages.IDE}>
            {t('pageIDE')}
          </NavLink>
          <NavLink className="nav__item" to={EPages.LOGIN}>
            {t('pageLogin')}
          </NavLink>
        </nav>

        <div className="header__btn-box">
          {isSignIn && <div>Sign in</div>}
          {isSignUp && <div>Sign up</div>}
          <div className="header__sign">
            <button className={isSignIn ? 'header__active' : ''} onClick={() => changeSign('in')}>
              Sign in
            </button>
            <button className={isSignUp ? 'header__active' : ''} onClick={() => changeSign('up')}>
              Sign up
            </button>
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
