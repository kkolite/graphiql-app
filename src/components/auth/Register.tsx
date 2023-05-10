import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../store/hooks';

import { fbRegister } from '../../utils/firebase';
import { validate } from '../../utils/validate';
import { EValidate } from '../../data/types';
import { setBtnSignUp } from '../../store/slice/headerSlice';
import './modal.scss';

export const Register = () => {
  const dispatch = useAppDispatch();

  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { t } = useTranslation();

  useEffect(() => {
    if (emailError !== '') setEmailError(`${t('EMAIL')}`);
    if (nameError !== '') setNameError(`${t('USERNAME')}`);
    if (passwordError !== '') setPasswordError(`${t('PASSWORD')}`);
  }, [emailError, nameError, passwordError, t]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validation = [
      validate(email, setEmailError, EValidate.EMAIL, t('EMAIL')),
      validate(name, setNameError, EValidate.USERNAME, t('USERNAME')),
      validate(password, setPasswordError, EValidate.PASSWORD, t('PASSWORD')),
    ];

    if (!validation.every((el) => el)) return;

    const result = await fbRegister(name, email, password);
    console.log(result);
  };

  const handleClick = () => {
    dispatch(setBtnSignUp(false));
  };

  return (
    <div className="modal" onClick={handleClick}>
      <div className="modal__box" onClick={(e) => e.stopPropagation()}>
        <div className="modal__close">
          <div onClick={handleClick}>X</div>
        </div>
        <div className="modal__name">Sign up</div>
        <form onSubmit={handleSubmit}>
          <div className="modal__text-input">
            <label>
              your username
              <input
                type="text"
                placeholder={t('name') as string}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <div className="modal__error">{nameError}</div>
          </div>

          <div className="modal__text-input">
            <label>
              your email
              <input type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
            </label>
            <div className="modal__error">{emailError}</div>
          </div>

          <div className="modal__text-input">
            <label>
              your password
              <input
                type="password"
                placeholder={t('password') as string}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <div className="modal__error">{passwordError}</div>
          </div>
          <button className="modal__btn">{t('createAccount')}</button>
        </form>
      </div>
    </div>
  );
};
