import { Dropdown } from 'react-bootstrap';
import { FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { UserInfo } from 'presentation/contexts/auth';
import styles from './Header.module.css';

interface ProfileDropdownProps {
  userInfo: UserInfo;
  onLogout: () => void;
}

export default function ProfileDropdown({ userInfo, onLogout }: ProfileDropdownProps) {
  const displayName = userInfo.name || userInfo.email || 'کاربر';
  const avatarInitial = displayName.trim().charAt(0).toUpperCase();

  return (
    <Dropdown>
      <Dropdown.Toggle
        id="profile-dropdown"
        variant="outline-light"
        className={`${styles.navPill} ${styles.navPillProfile}`}
      >
        <span className={styles.avatarCircle}>{avatarInitial}</span>
        <span className={styles.profileName}>{displayName}</span>
      </Dropdown.Toggle>
      <Dropdown.Menu align="end" className="shadow border-0 mt-2">
        <Dropdown.Header className="text-muted small">
          <div className="fw-semibold">{userInfo.name || 'کاربر'}</div>
          <div className="text-truncate" style={{ maxWidth: '200px' }}>
            {userInfo.email}
          </div>
        </Dropdown.Header>
        <Dropdown.Divider />
        <Link
          to="/profile"
          className="dropdown-item d-flex align-items-center gap-2 py-2"
        >
          <FaUser size={14} />
          پروفایل
        </Link>
        <Dropdown.Divider />
        <Dropdown.Item
          onClick={onLogout}
          className="text-danger d-flex align-items-center gap-2 py-2"
        >
          <span>🚪</span>
          خروج
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
