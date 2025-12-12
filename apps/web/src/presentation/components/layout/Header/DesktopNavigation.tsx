import { Badge, Nav } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'presentation/contexts/store';
import { UserInfo } from 'presentation/contexts/auth';
import ThemeSwitch from 'presentation/components/common/ThemeSwitch';
import SearchBox from 'presentation/components/common/SearchBox';
import ProfileDropdown from './ProfileDropdown';
import AdminDropdown from './AdminDropdown';
import styles from './Header.module.css';

interface DesktopNavigationProps {
  userInfo: UserInfo | undefined;
  onLogout: () => void;
}

export default function DesktopNavigation({
  userInfo,
  onLogout,
}: DesktopNavigationProps) {
  const orderItems = useSelector((s: RootState) => s.cart.orderItems);

  return (
    <>
      <div className={`d-none d-lg-block flex-grow-1 mx-4 ${styles.searchWrap}`}>
        <SearchBox />
      </div>

      <Nav className={`d-none d-lg-flex align-items-center gap-3 ${styles.desktopNav}`}>
        {userInfo && userInfo.isAdmin && <AdminDropdown />}
        {userInfo ? (
          <ProfileDropdown onLogout={onLogout} userInfo={userInfo} />
        ) : (
          <Link to="/login" className="text-decoration-none">
            <Nav.Link
              as="span"
              className={`${styles.navPill} ${styles.navPillPrimary}`}
            >
              <FaUser size={16} />
              <span>ورود</span>
            </Nav.Link>
          </Link>
        )}
        <Link to="/cart" className="text-decoration-none position-relative">
          <Nav.Link
            as="span"
            className={`${styles.navPill} ${styles.navPillSuccess}`}
          >
            <div className="position-relative">
              <FaShoppingCart size={18} />
              {orderItems.length > 0 && (
                <Badge
                  bg="danger"
                  className={`position-absolute top-0 start-100 translate-middle rounded-pill ${styles.cartBadge}`}
                  style={{ fontSize: '0.7rem' }}
                >
                  {orderItems.reduce((acc, item) => acc + item.qty, 0)}
                </Badge>
              )}
            </div>
            <span>سبد خرید</span>
          </Nav.Link>
        </Link>
        <div>
          <ThemeSwitch />
        </div>
      </Nav>
    </>
  );
}
