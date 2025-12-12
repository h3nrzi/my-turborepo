import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface Props {
  step1?: boolean;
  step2?: boolean;
  step3?: boolean;
  step4?: boolean;
}

const CheckoutSteps = ({ step1, step2, step3, step4 }: Props) => {
  return (
    <Nav className="justify-content-center mb-4">
      <Nav.Item>
        {step1 ? (
          <Link to="/cart" className="fw-bold">
            <Nav.Link as="span">سبد خرید</Nav.Link>
          </Link>
        ) : (
          <Nav.Link disabled>سبد خرید</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step2 ? (
          <Link to="/shipping" className="fw-bold">
            <Nav.Link as="span">آدرس ارسال</Nav.Link>
          </Link>
        ) : (
          <Nav.Link disabled>آدرس ارسال</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step3 ? (
          <Link to="/payment" className="fw-bold">
            <Nav.Link as="span">روش پرداخت</Nav.Link>
          </Link>
        ) : (
          <Nav.Link disabled>روش پرداخت</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step4 ? (
          <Link to="/placeorder" className="fw-bold">
            <Nav.Link as="span">ثبت سفارش</Nav.Link>
          </Link>
        ) : (
          <Nav.Link disabled>ثبت سفارش</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default CheckoutSteps;
