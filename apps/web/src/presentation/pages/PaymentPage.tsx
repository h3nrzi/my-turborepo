import { FormEvent, useEffect, useRef } from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { savePaymentMethod } from 'presentation/contexts/cart';
import CheckoutSteps from '../components/common/CheckoutSteps';
import FormContainer from '../components/common/FormContainer';
import { RootState } from 'presentation/contexts/store';

const PaymentPage = () => {
  const ref = useRef<HTMLInputElement>(null);
  const shippingAddress = useSelector((s: RootState) => s.cart.shippingAddress);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!shippingAddress) {
      navigate('/shipping');
      toast.warn('لطفاً آدرس ارسال را تکمیل کنید', {
        position: 'top-center',
      });
    }
  }, [shippingAddress, navigate]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const paymentMethod = ref.current?.value ?? '';
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder');
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1 className="fw-bold">روش پرداخت</h1>
      <Form onSubmit={handleSubmit} className="mt-5">
        <Form.Group>
          <Form.Label as="legend">انتخاب روش</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label="پی‌پال یا کارت بانکی"
              id="PayPal"
              required
              value="PayPal"
              name="paymentMethod"
              ref={ref}
            />
            <Button type="submit" variant="primary" className="mt-3 w-25">
              ادامه
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </FormContainer>
  );
};

export default PaymentPage;
