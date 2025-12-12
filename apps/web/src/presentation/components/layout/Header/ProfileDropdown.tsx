import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserInfo } from 'presentation/contexts/auth';
import styles from './Header.module.css';

interface ProfileDropdownProps {
  userInfo: UserInfo;
  onLogout: () => void;
}

export default function ProfileDropdown({
  userInfo,
  onLogout,
}: ProfileDropdownProps) {
  const displayName = userInfo.name || userInfo.email || 'کاربر';
  const avatarInitial = displayName.trim().charAt(0).toUpperCase();

  return (
    <Dropdown>
      <style>
        {`
          .dropdown-toggle::after {
            display: none !important;
          }
        `}
      </style>
      <Dropdown.Toggle
        id="profile-dropdown"
        variant="link"
        className={`${styles.dropdownToggle} text-decoration-none border-0 p-0 dropdown-toggle`}
      >
        {userInfo.avatar ? (
          <img
            src={userInfo.avatar}
            alt="پروفایل"
            className="rounded-circle"
            width={32}
            height={32}
            style={{ objectFit: 'cover' }}
          />
        ) : (
          <div
            className={`${styles.avatarCircle} d-flex align-items-center justify-content-center`}
            style={{ width: '32px', height: '32px', fontSize: '14px' }}
          >
            {avatarInitial}
          </div>
        )}
      </Dropdown.Toggle>
      <Dropdown.Menu align="end" className="shadow border-0 mt-2">
        <Dropdown.Header className="text-muted small">
          <div className="fw-semibold">{userInfo.name || 'کاربر'}</div>
          <div className="text-truncate" style={{ maxWidth: '200px' }}>
            {userInfo.email}
          </div>
        </Dropdown.Header>
        <Dropdown.Divider />
        <Link to="/profile" className="dropdown-item">
          پروفایل
        </Link>
        <Dropdown.Divider />
        <Dropdown.Item onClick={onLogout} className="text-danger">
          خروج
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
