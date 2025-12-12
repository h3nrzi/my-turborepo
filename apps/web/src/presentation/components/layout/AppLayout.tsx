import { Outlet } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';
import Footer from 'presentation/components/layout/Footer';
import Header from 'presentation/components/layout/Header';

const App = () => {
  return (
    <Fragment>
      <Header />
      <main className="my-6">
        <div className="container mx-auto px-4">
          <Outlet />
        </div>
      </main>
      <Footer />
    </Fragment>
  );
};

export default App;
