import { useTranslation } from 'react-i18next';
import './projectpage.scss';

export const ProjectPage = () => {
  const { t } = useTranslation();

  return (
    <section className="main__project project __container">
      <h2 className="project__title">{t('project')}</h2>
      <div className="project__block">
        <div className="project__right">
          <div className="project__cards">
            <h2 className="project__chapter">{t('projectAbout')}</h2>
            <div className="project__text"> {t('projectText')} </div>
          </div>
        </div>

        <div className="project__left">
          <div className="project__cards">
            <h2 className="project__caption">{t('backend')}</h2>
            <div className="project__text">{t('backendText')}</div>
          </div>
          <div className="project__cards">
            <h2 className="project__caption">{t('structura')}</h2>
            <div className="project__text">
              <ul>
                <li>- {t('structuraText1')}</li>
                <li>- {t('structuraText2')}</li>
                <li>- {t('structuraText3')}</li>
                <li>- {t('structuraText4')}</li>
              </ul>
            </div>
          </div>
          <div className="project__cards">
            <h2 className="project__caption">{t('stack')}</h2>
            <div className="project__text">
              <ul>
                <li>- React</li>
                <li>- Redux</li>
                <li>- TypeScript</li>
                <li>- Sass</li>
                <li>- Vite</li>
                <li>- Firebase</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
