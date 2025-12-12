import { Dropdown } from 'react-bootstrap';
import { MdAdminPanelSettings } from 'react-icons/md';
import { Link } from 'react-router-dom';

export default function AdminDropdown() {
  return (
    <Dropdown>
      <Dropdown.Toggle
        id="admin-dropdown"
        variant="outline-warning"
        className="border-0 rounded-circle p-2 d-flex align-items-center justify-content-center"
        style={{ width: '45px', height: '45px' }}
      >
        <MdAdminPanelSettings size={24} />
      </Dropdown.Toggle>
      <Dropdown.Menu align="end" className="shadow border-0 mt-2">
        <Dropdown.Header className="text-warning fw-bold">
          <MdAdminPanelSettings className="me-1" />
          پنل مدیریت
        </Dropdown.Header>
        <Dropdown.Divider />
        <Link
          to="/admin/product-list"
          className="dropdown-item d-flex align-items-center gap-2 py-2"
        >
          <span>📦</span>
          محصولات
        </Link>
        <Link
          to="/admin/user-list"
          className="dropdown-item d-flex align-items-center gap-2 py-2"
        >
          <span>👥</span>
          کاربران
        </Link>
        <Link
          to="/admin/order-list"
          className="dropdown-item d-flex align-items-center gap-2 py-2"
        >
          <span>📋</span>
          سفارشها
        </Link>
      </Dropdown.Menu>
    </Dropdown>
  );
}