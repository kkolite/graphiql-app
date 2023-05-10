import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../store/hooks';

import { fbLogin } from '../../utils/firebase';
import { validate } from '../../utils/validate';
import { EValidate } from '../../data/types';
import { setBtnSignIn } from '../../store/slice/headerSlice';
import './modal.scss';

export const Login = () => {
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

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
    console.log(result);
  };

  const handleClick = () => {
    dispatch(setBtnSignIn(false));
  };

  return (
    <div className="modal" onClick={handleClick}>
      <div className="modal__box" onClick={(e) => e.stopPropagation()}>
        <div className="modal__close">
          <div onClick={handleClick}>X</div>
        </div>

        <form onSubmit={handleSubmit}>
          <div>
            <input type="email" placeholder="E-mail" onChange={(e) => setEmail(e.target.value)} />
            <label>{emailError}</label>
          </div>
          <div>
            <input
              type="password"
              placeholder={t('password') as string}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>{passwordError}</label>
          </div>
          <button>{t('logIn')}</button>
        </form>
      </div>
    </div>
  );
};
