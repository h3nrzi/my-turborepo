import { Badge, Nav } from 'react-bootstrap';
import { FaRegUserCircle, FaShoppingCart, FaUser } from 'react-icons/fa';
import { MdAdminPanelSettings } from 'react-icons/md';
import { IoClose } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'presentation/contexts/store';
import { UserInfo } from 'presentation/contexts/auth';
import SearchBox from 'presentation/components/common/SearchBox';
import ThemeSwitch from 'presentation/components/common/ThemeSwitch';
import styles from './Header.module.css';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  userInfo: UserInfo | undefined;
  onLogout: () => void;
}

export default function MobileSidebar({
  isOpen,
  onClose,
  userInfo,
  onLogout,
}: MobileSidebarProps) {
  const orderItems = useSelector((s: RootState) => s.cart.orderItems);
  const totalItems = orderItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <div
      className={`d-lg-none ${styles.mobileSidebar} ${
        isOpen ? styles.mobileOpen : ''
      }`}
    >
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <p className={`mb-1 ${styles.eyebrow}`}>ناوبری سریع</p>
          <h5 className={`mb-0 ${styles.heading}`}>منوی موبایل</h5>
        </div>
        <button
          className={styles.iconButton}
          type="button"
          aria-label="بستن منوی موبایل"
          onClick={onClose}
        >
          <IoClose size={22} />
        </button>
      </div>
      <div className={styles.mobileSearch}>
        <SearchBox />
      </div>

      <Nav className="flex-column gap-2">
        {userInfo ? (
          <>
            <div className={styles.userCard}>
              <div className="d-flex align-items-center gap-2 mb-2">
                <FaRegUserCircle size={26} />
                <div className="overflow-hidden">
                  <div className={`fw-semibold ${styles.heading} text-truncate`}>
                    {userInfo.name || 'کاربر'}
                  </div>
                  <small className={`${styles.mutedText} text-truncate d-block`}>
                    {userInfo.email}
                  </small>
                </div>
              </div>
              <div className="d-flex gap-2">
                <Link
                  to="/profile"
                  className={`${styles.navItem} ${styles.navItemSurface} flex-fill`}
                  onClick={onClose}
                >
                  <FaUser size={15} />
                  پروفایل
                </Link>
                <button
                  onClick={() => {
                    onClose();
                    onLogout();
                  }}
                  className={`${styles.navItem} ${styles.navItemDanger} flex-fill border-0 bg-transparent`}
                  type="button"
                >
                  <span>🚪</span>
                  خروج
                </button>
              </div>
            </div>

            {userInfo.isAdmin && (
              <>
                <div className={styles.sectionLabel}>
                  <MdAdminPanelSettings className="me-1" />
                  پنل مدیریت
                </div>
                <Link
                  to="/admin/product-list"
                  className={`${styles.navItem} ${styles.navItemSurface}`}
                  onClick={onClose}
                >
                  <span>📦</span>
                  محصولات
                </Link>
                <Link
                  to="/admin/user-list"
                  className={`${styles.navItem} ${styles.navItemSurface}`}
                  onClick={onClose}
                >
                  <span>👥</span>
                  کاربران
                </Link>
                <Link
                  to="/admin/order-list"
                  className={`${styles.navItem} ${styles.navItemSurface}`}
                  onClick={onClose}
                >
                  <span>📋</span>
                  سفارشها
                </Link>
              </>
            )}
          </>
        ) : (
          <Link
            to="/login"
            className={`${styles.navItem} ${styles.navItemPrimary}`}
            onClick={onClose}
          >
            <FaUser size={15} />
            ورود یا ثبت‌نام
          </Link>
        )}

        <Link
          to="/cart"
          className={`${styles.navItem} ${styles.navItemAccent}`}
          onClick={onClose}
        >
          <div className="position-relative">
            <FaShoppingCart size={18} />
            {orderItems.length > 0 && (
              <Badge
                bg="danger"
                className={`position-absolute top-0 start-100 translate-middle rounded-pill ${styles.cartBadge}`}
              >
                {totalItems}
              </Badge>
            )}
          </div>
          سبد خرید ({totalItems})
        </Link>

        <div className={styles.inlineControl}>
          <span className={`${styles.mutedText} small`}>حالت نمایش</span>
          <ThemeSwitch />
        </div>
      </Nav>
    </div>
  );
}
