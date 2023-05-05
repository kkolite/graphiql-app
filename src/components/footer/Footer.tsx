import './footer.scss';
import rsschool from '../../assets/rs_shool.svg';
import github from '../../assets/github.png';

export const Footer = () => {
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
              kkolite
            </a>
            <a href="https://github.com/koctia" target="_blank">
              koctia
            </a>
            <a href="https://github.com/motoblock" target="_blank">
              motoblock
            </a>
          </div>
        </div>
        <div className="footer__copywrite">RS-GraphQL © 2023 All rights reserved.</div>
        <div className="footer__rsschool">
          <a href="https://rs.school/react/" target="_blank">
            <img src={rsschool} alt="" />
          </a>
        </div>
      </div>
    </footer>
  );
};
