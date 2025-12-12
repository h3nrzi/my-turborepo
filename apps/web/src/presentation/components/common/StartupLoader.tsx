import { Spinner } from 'react-bootstrap';

const StartupLoader = () => {
  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center text-center py-5"
      style={{ minHeight: '60vh' }}
    >
      <Spinner
        animation="border"
        role="status"
        variant="primary"
        style={{ width: '4rem', height: '4rem' }}
        className="mb-3"
      />
      <h3 className="fw-bold mb-2">در حال راه‌اندازی سرور...</h3>
      <p className="text-muted mb-0">
        برای چند ثانیه صبر کنید تا سرور رایگان Render بیدار شود، سپس فروشگاه آماده است.
      </p>
    </div>
  );
};

export default StartupLoader;
