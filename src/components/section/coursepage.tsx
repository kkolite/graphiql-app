import { useTranslation } from 'react-i18next';

import './coursepage.scss';
import course from '../../assets/course.webp';
import cats from '../../assets/cats.png';
import meow from '../../assets/cat-meow.mp3';

export const CoursePage = () => {
  const { t } = useTranslation();

  const audio = new Audio(meow);
  const start = () => {
    audio.play();
  };
  return (
    <section className="main__course course">
      <div className="course__cats-box __container">
        <div className="course__fon-cats" onClick={() => start()}>
          <img src={cats} alt="he cat's smile" />
        </div>
      </div>

      <div className="course__fon-images">
        <img src={course} alt="" />
      </div>

      <div className="course__container">
        <h2 className="course__title">{t('сourse')}</h2>
        <div className="course__tags">{t('courseTags')}</div>
        <div className="course__block">
          <div className="course__right">
            <div className="course__cards">
              <h2 className="course__chapter">{t('courseChapter')}</h2>
              <div className="course__text">{t('courseText1')}</div>
            </div>
            <div className="course__cards">
              <h2 className="course__caption">{t('courseFree')}</h2>
              <div className="course__text">{t('courseText2')}</div>
            </div>
          </div>
          <div className="course__left">
            <div className="course__cards">
              <h2 className="course__caption">{t('courseOpen')}</h2>
              <div className="course__text">{t('courseText3')}</div>
            </div>
            <div className="course__cards">
              <h2 className="course__caption">{t('courseLern')}</h2>
              <div className="course__text">
                {t('courseText41')} {` `}
                <a href="https://docs.rs.school" target="_blank">
                  https://docs.rs.school
                </a>
                {t('courseText42')} {` `}
                <a href="https://www.youtube.com/c/RollingScopesSchool" target="_blank">
                  YouTube
                </a>
                {` `} {t('courseText43')}
              </div>
            </div>
            <div className="course__cards">
              <h2 className="course__caption">{t('courseCert')}</h2>
              <div className="course__text">{t('courseText5')}</div>
            </div>
          </div>
        </div>
        <div className="course__link">
          <a href="https://rs.school/react/" target="_blank">
            {t('learnMore')}
          </a>
        </div>
      </div>
    </section>
  );
};
