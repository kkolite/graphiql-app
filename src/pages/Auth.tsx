import { useState } from 'react';
import { Login, Register } from '../components';

export const Auth = () => {
  const [isLogin, setLogin] = useState(true);

  return <div>{isLogin ? <Login setLogin={setLogin} /> : <Register setLogin={setLogin} />}</div>;
};
