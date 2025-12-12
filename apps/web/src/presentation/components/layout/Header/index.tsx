import { Container, Image, Navbar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useLogoutMutation } from 'infrastructure/services/api/users-api';
import { clearCredentials } from 'presentation/contexts/auth';
import { resetCart } from 'presentation/contexts/cart';
import { RootState } from 'presentation/contexts/store';
import logo from 'shared/assets/logo.png';
import ThemeSwitch from 'presentation/components/common/ThemeSwitch';
import MobileSidebar from './MobileSidebar';
import DesktopNavigation from './DesktopNavigation';
import styles from './Header.module.css';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const userInfo = useSelector((s: RootState) => s.auth.userInfo);
  const [logoutMutation] = useLogoutMutation();
  const [isNavOpen, setIsNavOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      await logoutMutation().unwrap();
      dispatch(clearCredentials());
      dispatch(resetCart());
      navigate('/');
      location.reload();
    } catch {
      toast.error('خطایی رخ داد!');
    }
  };

  useEffect(() => {
    setIsNavOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const { overflow } = document.body.style;
    if (isNavOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = overflow;
    };
  }, [isNavOpen]);

  return (
    <header className={`sticky-top ${styles.headerShell}`}>
      <Navbar
        bg="dark"
        variant="dark"
        expand="lg"
        collapseOnSelect
        className={`${styles.navbar} py-3`}
        expanded={isNavOpen}
        onToggle={setIsNavOpen}
      >
        <Container className="align-items-center">
          <Link to="/" className={`text-decoration-none ${styles.brand}`}>
            <Navbar.Brand
              as="span"
              className="d-flex align-items-center fw-bold fs-5 gap-3"
            >
              <Image
                src={logo}
                width={44}
                height={44}
                className={styles.logo}
                alt="Logo"
              />
              <div className="d-flex flex-column">
                <span className={styles.textGradient}>پروشاپ</span>
                <small className="text-white-50 fw-normal">
                  بازارچه دیجیتال شما
                </small>
              </div>
            </Navbar.Brand>
          </Link>

          <div className="d-flex align-items-center d-lg-none gap-2">
            <ThemeSwitch />
            <Navbar.Toggle
              aria-controls="basic-navbar-nav"
              aria-label={isNavOpen ? 'بستن منو' : 'باز کردن منو'}
              className={styles.toggle}
            />
          </div>

          <Navbar.Collapse
            id="basic-navbar-nav"
            className={styles.navbarCollapse}
          >
            <MobileSidebar
              isOpen={isNavOpen}
              onClose={() => setIsNavOpen(false)}
              userInfo={userInfo}
              onLogout={logoutHandler}
            />

            <DesktopNavigation userInfo={userInfo} onLogout={logoutHandler} />
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {isNavOpen && (
        <button
          type="button"
          aria-label="بستن منو"
          className={styles.backdrop}
          onClick={() => setIsNavOpen(false)}
        />
      )}
    </header>
  );
}
