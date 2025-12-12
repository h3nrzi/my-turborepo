import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Fragment } from 'react/jsx-runtime';
import Footer from 'presentation/components/layout/Footer';
import Header from 'presentation/components/layout/Header';

const App = () => {
  return (
    <Fragment>
      <Header />
      <main className="my-3">
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
      <Toaster position="top-center" />
    </Fragment>
  );
};

export default App;
