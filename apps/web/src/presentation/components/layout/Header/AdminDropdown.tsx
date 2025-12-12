import { Dropdown } from 'react-bootstrap';
import { FaBoxes, FaClipboardList, FaUsers } from 'react-icons/fa';
import { MdAdminPanelSettings } from 'react-icons/md';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

export default function AdminDropdown() {
  return (
    <Dropdown align="end">
      <Dropdown.Toggle
        id="admin-dropdown"
        className="border-0 text-white p-0 shadow-none"
        style={{ 
          backgroundColor: 'transparent !important', 
          boxShadow: 'none !important',
          background: 'transparent !important',
          borderColor: 'transparent !important'
        }}
      >
        <span className="fw-semibold">مدیریت</span>
      </Dropdown.Toggle>
      <Dropdown.Menu className={`${styles.adminMenu} shadow border-0 mt-2`}>
        <Dropdown.Header className="pb-2">
          <div className="d-flex align-items-center gap-2">
            <div className={styles.avatarCircle}>
              <MdAdminPanelSettings size={16} />
            </div>
            <div>
              <div className="text-warning fw-semibold">پنل مدیریت</div>
              <small className="text-muted">کنترل سریع فروشگاه</small>
            </div>
          </div>
        </Dropdown.Header>
        <Dropdown.Divider />
        <Dropdown.Item
          as={Link}
          to="/admin/product-list"
          className={styles.adminMenuItem}
        >
          <FaBoxes size={15} />
          <div className="d-flex flex-column">
            <span className="fw-semibold">محصولات</span>
            <small className="text-muted">لیست و مدیریت موجودی</small>
          </div>
        </Dropdown.Item>
        <Dropdown.Item
          as={Link}
          to="/admin/user-list"
          className={styles.adminMenuItem}
        >
          <FaUsers size={15} />
          <div className="d-flex flex-column">
            <span className="fw-semibold">کاربران</span>
            <small className="text-muted">مدیریت حساب‌ها</small>
          </div>
        </Dropdown.Item>
        <Dropdown.Item
          as={Link}
          to="/admin/order-list"
          className={styles.adminMenuItem}
        >
          <FaClipboardList size={15} />
          <div className="d-flex flex-column">
            <span className="fw-semibold">سفارش‌ها</span>
            <small className="text-muted">پیگیری و وضعیت ارسال</small>
          </div>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
