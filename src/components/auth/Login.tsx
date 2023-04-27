import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { fbLogin } from '../../utils/firebase';
import { validate } from '../../utils/validate';
import { EValidate } from '../../data/types';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const { t } = useTranslation();

  useEffect(() => {
    setEmailError(`${t("EMAIL")}`);
    setPasswordError(`${t("PASSWORD")}`);
  }, [t]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validation = [
      validate(email, setEmailError, EValidate.EMAIL, t("EMAIL")),
      validate(password, setPasswordError, EValidate.PASSWORD, t("PASSWORD"))
    ]

    if (!validation.every((el) => el)) return;

    const result = await fbLogin(email, password);
    console.log(result);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type='email'
          placeholder='E-mail'
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>{emailError}</label>
      </div>
      <div>
        <input
          type='password'
          placeholder={t("password") as string}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label>{passwordError}</label>
      </div>
      <button>{t("logIn")}</button>
    </form>
  );
};
