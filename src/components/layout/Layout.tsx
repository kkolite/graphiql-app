import { Outlet } from 'react-router-dom'
import { Footer } from './../footer/Footer';
import { Header } from './../header/Header';

export const Layout = () => {
  return (
    <div className="wrapper">
      <header className="header">
        <Header />
      </header>
      <main className="main">
        <Outlet />
      </main>
      <footer className="footer">
        <Footer />
      </footer>
    </div>
  );
};
