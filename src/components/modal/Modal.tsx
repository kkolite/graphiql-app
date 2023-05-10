import './modal.scss';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setBtnSignIn, setBtnSignUp } from '../../store/slice/headerSlice';

export const Modal = () => {
  const dispatch = useAppDispatch();
  const { isSignIn, isSignUp } = useAppSelector((state) => state.headers);

  const handleClick = () => {
    dispatch(setBtnSignIn(false));
    dispatch(setBtnSignUp(false));
  };

  return (
    <div className="modal" onClick={handleClick}>
      <div className="modal__box" onClick={(e) => e.stopPropagation()}>
        <div className="modal__close">
          <div onClick={handleClick}>X</div>
        </div>
        <div className="modal__block">
          <div className="modal__info">
            <div className="modal__name">
              <span className="modal__text">
                {isSignIn && `Sign in`} {isSignUp && `Sign up`}
              </span>
            </div>
            {isSignUp && (
              <div className="modal__username">
                <label htmlFor="">
                  your username
                  <input type="text" placeholder="name" />
                </label>
              </div>
            )}
            <div className="modal__email">
              <label htmlFor="">
                your email
                <input type="text" placeholder="email" />
              </label>
            </div>
            <div className="modal__password">
              <label htmlFor="">
                your password
                <input type="text" placeholder="password" />
              </label>
            </div>
          </div>
        </div>
        <button className="modal__btn">continue</button>
      </div>
    </div>
  );
};
