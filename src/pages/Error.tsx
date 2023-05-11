import './error.scss';
import wallpaper from '../assets/wallpaper.jpg';

export const Error = () => {
  return (
    <section className="main__remark remark">
      <div className="remark__fon">
        <img src={wallpaper} alt="he cat's smile" />
      </div>

      <div className="remark__box remark__container">
        <div className="remark__rigth"></div>
        <div className="remark__left">
          <div className="remark__message">
            <div className="remark__error">404 ERROR</div>
            <div className="remark__whoops">Whoops!</div>
            <div className="remark__text">we couldn’t find the page you were looking for :(</div>
          </div>
          <div className="remark__btn">
            <a href="/" className="remark__home">
              Go Home
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
