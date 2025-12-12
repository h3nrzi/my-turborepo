import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

export default function AdminDropdown() {
  return (
    <Dropdown align="end">
      <style>
        {`
          .dropdown-toggle::after {
            display: none !important;
          }
          #admin-dropdown {
            background: none !important;
            border: none !important;
            box-shadow: none !important;
          }
          #admin-dropdown:hover,
          #admin-dropdown:focus,
          #admin-dropdown:active {
            background: none !important;
            border: none !important;
            box-shadow: none !important;
          }
        `}
      </style>
      <Dropdown.Toggle
        id="admin-dropdown"
        variant="link"
        className={`${styles.dropdownToggle} text-decoration-none border-0 p-0 dropdown-toggle`}
      >
        <span className="fw-semibold">مدیریت</span>
      </Dropdown.Toggle>
      <Dropdown.Menu align="end" className="shadow border-0 mt-2">
        <Dropdown.Header className="text-muted small">
          <div className="fw-semibold">پنل مدیریت</div>
          <div>کنترل سریع فروشگاه</div>
        </Dropdown.Header>
        <Dropdown.Divider />
        <Link to="/admin/product-list" className="dropdown-item">
          محصولات
        </Link>
        <Link to="/admin/user-list" className="dropdown-item">
          کاربران
        </Link>
        <Link to="/admin/order-list" className="dropdown-item">
          سفارشها
        </Link>
      </Dropdown.Menu>
    </Dropdown>
  );
}