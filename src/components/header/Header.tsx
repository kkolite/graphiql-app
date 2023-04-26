import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { EPages } from '../../data/types';

export const Header = () => {

	const { t, i18n } = useTranslation();

	const changeLang = (lang: string) => {
		i18n.changeLanguage(lang);
	}
  return (
    <div className="header__container">
			<nav className="header__menu">
				<NavLink className="item" to={EPages.HOME}>
					{t("pageHome")}
				</NavLink>
				<NavLink className="item" to={EPages.IDE}>
					GraphQL
				</NavLink>
				<NavLink className="item" to={EPages.LOGIN}>
				{t("pageLogin")}
				</NavLink>
			</nav>
			<div>
				<button onClick={() => changeLang("en")}>EN</button>
				<button onClick={() => changeLang("ru")}>RU</button>
			</div>
    </div>
  );
};