import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
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
      <ToastContainer />
    </Fragment>
  );
};

export default App;
