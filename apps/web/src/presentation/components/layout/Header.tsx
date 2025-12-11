import {
  Badge,
  Container,
  Dropdown,
  Image,
  Nav,
  Navbar,
} from 'react-bootstrap';
import { FaRegUserCircle, FaShoppingCart, FaUser } from 'react-icons/fa';
import { MdAdminPanelSettings } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useLogoutMutation } from 'infrastructure/services/api/users-api';
import { clearCredentials, type UserInfo } from 'presentation/contexts/auth';
import { resetCart } from 'presentation/contexts/cart';
import { RootState } from 'presentation/contexts/store';
import logo from 'shared/assets/logo.png';
import ThemeSwitch from 'presentation/components/common/ThemeSwitch';
import SearchBox from 'presentation/components/common/SearchBox';

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const orderItems = useSelector((s: RootState) => s.cart.orderItems);
  const userInfo = useSelector((s: RootState) => s.auth.userInfo);
  const [logoutMutation] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutMutation().unwrap();
      dispatch(clearCredentials());
      dispatch(resetCart());
      navigate('/');
      location.reload();
    } catch {
      toast.error('some error occurred!', { position: 'top-center' });
    }
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Link to="/" className="text-decoration-none me-auto">
            <Navbar.Brand as="span">
              <Image src={logo} fluid />
              ProShop
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <div className="d-block d-lg-none ms-3">
            <ThemeSwitch />
          </div>
          <Navbar.Collapse id="basic-navbar-nav">
            <div className="d-lg-none my-3"></div>
            <div className="flex-grow-1 mb-3 m-lg-0">
              <SearchBox />
            </div>
            <Nav className="d-lg-flex gap-2">
              {userInfo && userInfo.isAdmin && <AdminDropdown />}
              {userInfo ? (
                <ProfileDropdown onLogout={logoutHandler} userInfo={userInfo} />
              ) : (
                <Link to="/login" className="text-decoration-none">
                  <Nav.Link as="span">
                    <FaUser /> Sign In
                  </Nav.Link>
                </Link>
              )}
              <Link to="/cart" className="text-decoration-none">
                <Nav.Link as="span">
                  {orderItems.length > 0 && (
                    <Badge className="me-1">
                      {orderItems.reduce((acc, item) => acc + item.qty, 0)}
                    </Badge>
                  )}
                  <FaShoppingCart /> Cart
                </Nav.Link>
              </Link>
              <div className="d-none d-lg-block ms-3">
                <ThemeSwitch />
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

const ProfileDropdown = ({
  userInfo,
  onLogout,
}: {
  userInfo: UserInfo;
  onLogout(): void;
}) => {
  return (
    <Dropdown>
      <Dropdown.Toggle
        id="dropdown-custom-components"
        size="sm"
        variant="secondary"
        className="text-white"
      >
        <FaRegUserCircle size={30} />
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Header>{userInfo.email}</Dropdown.Header>
        <Link to="/profile" className="dropdown-item">
          Profile
        </Link>
        <Dropdown.Item onClick={onLogout}>Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

const AdminDropdown = () => {
  return (
    <Dropdown>
      <Dropdown.Toggle
        id="dropdown-custom-components"
        size="sm"
        variant="secondary"
        className="text-white"
      >
        <MdAdminPanelSettings size={30} />
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Link to="/admin/product-list" className="dropdown-item">
          Products
        </Link>
        <Link to="/admin/user-list" className="dropdown-item">
          Users
        </Link>
        <Link to="/admin/order-list" className="dropdown-item">
          Orders
        </Link>
      </Dropdown.Menu>
    </Dropdown>
  );
};
