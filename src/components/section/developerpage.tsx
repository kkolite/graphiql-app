import { useTranslation } from 'react-i18next';

import './developerpage.scss';
import catsfull from '../../assets/catsfull.jpg';

export const DeveloperPage = () => {
  const { t } = useTranslation();

  return (
    <section className="main__developer developer">
      <div className="developer__container">
        <h2 className="developer__title">{t('developer')}</h2>
        <div className="developer__block">
          <div className="developer__cards">
            <h2 className="developer__chapter">{t('developAbout')}</h2>
            <div className="developer__text">{t('developerText1')}</div>
          </div>
          <div className="developer__cards">
            <h2 className="developer__caption">YouTrack</h2>
            <div className="developer__text">{t('developerText2')}</div>
          </div>
          <div className="developer__cards">
            <h2 className="developer__caption">Figma</h2>
            <div className="developer__text">{t('developerText3')}</div>
          </div>
          <div className="developer__cards">
            <h2 className="developer__caption">VS Code</h2>
            <div className="developer__text">{t('developerText4')}</div>
          </div>
        </div>
      </div>
      <div className="developer__cats-box __container">
        <div className="developer__fon-cats">
          <img src={catsfull} alt="he cat's smile" />
        </div>
      </div>
    </section>
  );
};
