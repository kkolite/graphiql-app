import { Outlet } from 'react-router-dom'
import { Footer } from './../footer/Footer';
import { Header } from './../header/Header';

export const Layout = () => {
  return (
    <>
      <Header />
      <main className="main">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
