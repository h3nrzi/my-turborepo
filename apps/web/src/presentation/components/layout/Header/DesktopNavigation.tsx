import SearchBox from 'presentation/components/common/SearchBox';
import ThemeSwitch from 'presentation/components/common/ThemeSwitch';
import { UserInfo } from 'presentation/contexts/auth';
import { RootState } from 'presentation/contexts/store';
import { Badge, Nav } from 'react-bootstrap';

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AdminDropdown from './AdminDropdown';
import styles from './Header.module.css';
import ProfileDropdown from './ProfileDropdown';

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
      <div
        className={`d-none d-lg-block flex-grow-1 mx-4 ${styles.searchWrap}`}
      >
        <SearchBox />
      </div>

      <Nav
        className={`d-none d-lg-flex align-items-center gap-3 ${styles.desktopNav}`}
      >
        <Link to="/cart" className="text-decoration-none">
          <Nav.Link as="span" className="text-white">
            سبد خرید
            {orderItems.length > 0 && (
              <Badge bg="danger" className="ms-2">
                {orderItems.reduce((acc, item) => acc + item.qty, 0)}
              </Badge>
            )}
          </Nav.Link>
        </Link>
        {userInfo && userInfo.isAdmin && <AdminDropdown />}
        {userInfo ? (
          <ProfileDropdown onLogout={onLogout} userInfo={userInfo} />
        ) : (
          <Link to="/login" className="text-decoration-none">
            <Nav.Link as="span" className="text-white">
              ورود
            </Nav.Link>
          </Link>
        )}
        <div>
          <ThemeSwitch />
        </div>
      </Nav>
    </>
  );
}
