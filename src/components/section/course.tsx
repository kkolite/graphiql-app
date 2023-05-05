import './coursepage.scss';
import course from '../../assets/course.webp';
import cats from '../../assets/cats.png';
import meow from '../../assets/cat-meow.mp3';

export const CoursePage = () => {
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
        <h2 className="course__title">React Course</h2>
        <div className="course__tags">Free | Online | in English</div>
        <div className="course__block">
          <div className="course__right">
            <div className="course__cards">
              <h2 className="course__chapter">TARGET-AUDIENCE</h2>
              <div className="course__text">
                RS School is free-of-charge and community-based education program conducted by The
                Rolling Scopes developer community since 2013. Everyone can study at RS School,
                regardless of age, professional employment, or place of residence. The mentors and
                trainers of our school are front-end and javascript developers from different
                companies and countries.
              </div>
            </div>
            <div className="course__cards">
              <h2 className="course__caption">FREE-OF-CHARGE-LEARNING</h2>
              <div className="course__text">
                The RS School is working by the principle of "Pay it forward." Members of our
                community share their knowledge and check students' tasks for free. And we hope our
                students will continue this work as our mentors in the future.
              </div>
            </div>
          </div>
          <div className="course__left">
            <div className="course__cards">
              <h2 className="course__caption">OPEN-TO-EVERYONE</h2>
              <div className="course__text">
                Everyone can study at RS School, regardless of age, professional employment, or
                place of residence. However, you should have sufficient base knowledge before the
                program begins.
              </div>
            </div>
            <div className="course__cards">
              <h2 className="course__caption">LEARNING-MATERIALS</h2>
              <div className="course__text">
                School’s documentation - https://docs.rs.school You can find all materials on the
                YouTube channel.
              </div>
            </div>
            <div className="course__cards">
              <h2 className="course__caption">CERTIFICATE</h2>
              <div className="course__text">
                After accomplishing an education, students will receive an electronic certificate of
                completion.
              </div>
            </div>
          </div>
        </div>
        <div className="course__link">
          <a href="https://rs.school/react/" target="_blank">
            LEARN MORE
          </a>
        </div>
      </div>
    </section>
  );
};
