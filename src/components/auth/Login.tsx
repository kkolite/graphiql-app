import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';

import { fbLogin } from '../../utils/firebase';
import { validate } from '../../utils/validate';
import { EPages, EValidate } from '../../data/types';
import './modal.scss';
import { Navigate } from 'react-router-dom';

interface IProps {
  setLogin: Dispatch<SetStateAction<boolean>>;
}

export const Login = ({ setLogin }: IProps) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState('');
  const [isSuccess, setSuccess] = useState(false);

  const { t } = useTranslation();

  useEffect(() => {
    if (emailError !== '') setEmailError(`${t('EMAIL')}`);
    if (passwordError !== '') setPasswordError(`${t('PASSWORD')}`);
  }, [emailError, passwordError, t]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validation = [
      validate(email, setEmailError, EValidate.EMAIL, t('EMAIL')),
      validate(password, setPasswordError, EValidate.PASSWORD, t('PASSWORD')),
    ];

    if (!validation.every((el) => el)) return;

    const result = await fbLogin(email, password);

    if (!result) {
      const str = t('LOGIN');
      setError(str);
      return;
    }

    setSuccess(true);
    location.reload();
  };

  return isSuccess ? (
    <Navigate to={EPages.IDE} />
  ) : (
    <div className="modal">
      <div className="modal__box" onClick={(e) => e.stopPropagation()}>
        <div className="modal__name">{t('signin')}</div>
        <form onSubmit={handleSubmit}>
          <div className="modal__text-input">
            <label>
              {t('youremail')}
              <input type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
            </label>
            <div className="modal__error">{emailError}</div>
          </div>

          <div className="modal__text-input">
            <label>
              {t('yourpassword')}
              <input
                type="password"
                placeholder={t('password') as string}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <div className="modal__error">{passwordError}</div>
          </div>
          <div>{error}</div>
          <button className="modal__btn">{t('logIn')}</button>
          <p>
            {t('toRegister')}
            <span onClick={() => setLogin(false)}> {t('toRegisterSpan')}</span>
          </p>
        </form>
      </div>
    </div>
  );
};
