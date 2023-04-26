import { Outlet } from 'react-router-dom'

export const Layout = () => {
  return (
    <div className="wrapper">
      <header className="header">
      </header>
      <main className="main">
        <Outlet />
      </main>
      <footer className="footer">
      </footer>
    </div>
  );
};
