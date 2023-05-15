import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { fbRegister } from '../../utils/firebase';
import { validate } from '../../utils/validate';
import { EValidate } from '../../data/types';
import './modal.scss';

interface IProps {
  setLogin: Dispatch<SetStateAction<boolean>>;
}

export const Register = ({ setLogin }: IProps) => {
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

    try {
      await fbRegister(name, email, password);
      toast.success(`${t('allright')}`);
    } catch {
      toast.error(`${t('noallright')}`);
    }
  };

  return (
    <div className="modal">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="modal__box" onClick={(e) => e.stopPropagation()}>
        <div className="modal__close">
          <div>X</div>
        </div>
        <div className="modal__name">{t('signup')}</div>
        <form onSubmit={handleSubmit}>
          <div className="modal__text-input">
            <label>
              {t('yourusername')}
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
          <button className="modal__btn">{t('createAccount')}</button>
          <p>
            {t('toLogin')}
            <span onClick={() => setLogin(true)}> {t('toLoginSpan')}</span>
          </p>
        </form>
      </div>
    </div>
  );
};
