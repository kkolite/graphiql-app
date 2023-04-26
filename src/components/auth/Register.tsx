import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { fbRegister } from '../../utils/firebase';
import { validate } from '../../utils/validate';
import { EValidate } from '../../data/types';

export const Register = () => {
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validation = [
      validate(email, setEmailError, EValidate.EMAIL),
      validate(name, setNameError, EValidate.USERNAME),
      validate(password, setPasswordError, EValidate.PASSWORD)
    ]

    if (!validation.every((el) => el)) return;

    const result = await fbRegister(name, email, password);
    console.log(result);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type='text'
          placeholder='Name'
          onChange={(e) => setName(e.target.value)}
        />
        <label>{nameError}</label>
      </div>
      <div>
        <input
          type='email'
          placeholder='Email'
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>{emailError}</label>
      </div>
      <div>
        <input
          type='password'
          placeholder='Password'
          onChange={(e) => setPassword(e.target.value)}
        />
        <label>{passwordError}</label>
      </div>
      <button>{t("CreateAccount")}</button>
    </form>
  );
};
