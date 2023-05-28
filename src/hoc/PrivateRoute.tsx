import { useState, useEffect } from 'react';
import { fbCheck } from '../utils/firebase';
import { Navigate } from 'react-router-dom';
import { EPages } from '../data/types';

interface IProps {
  children: JSX.Element;
  forAnonim: boolean;
  redirect: EPages;
}

export const PrivateRoute = ({ children, forAnonim, redirect }: IProps) => {
  const [isLoading, setLoading] = useState(true);
  const [isWell, setWell] = useState(false);
  const result = fbCheck();

  useEffect(() => {
    setWell(result);
    setLoading(false);
  }, [result]);

  const CheckToken = forAnonim ? (
    isWell ? (
      <Navigate to={redirect} />
    ) : (
      children
    )
  ) : isWell ? (
    children
  ) : (
    <Navigate to={redirect} />
  );

  return <div>{isLoading ? <p>Loading...</p> : CheckToken}</div>;
};
