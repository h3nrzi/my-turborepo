import { Fragment, useEffect } from 'react';
import {
  Button,
  Card,
  Col,
  Image,
  ListGroup,
  Row,
  Spinner,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useCreateOrderMutation } from 'infrastructure/services/api/orders-api';
import {
  resetCart,
  type CartState,
  type ShippingAddress,
} from 'presentation/contexts/cart';
import CheckoutSteps from '../components/common/CheckoutSteps';
import Message from '../components/common/Message';
import { RootState } from 'presentation/contexts/store';
import Product from 'domain/entities/ProductEntity';

export default function PlaceOrderPage() {
  const cart = useSelector((s: RootState) => s.cart) as CartState;
  const paymentMethod = useSelector((s: RootState) => s.cart.paymentMethod);
  const [createOrder, { isLoading: createOrderLoading }] =
    useCreateOrderMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!paymentMethod) {
      toast('لطفاً روش پرداخت را وارد کنید!', { icon: '⚠️' });
      navigate('/payment');
    }
  }, [navigate, paymentMethod]);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder(cart).unwrap();
      dispatch(resetCart());
      navigate(`/order/${res._id}`);
    } catch (err: unknown) {
      const error = err as { data?: { message?: string }; error?: string };
      if (error)
        toast.error(error?.data?.message || error.error || 'خطایی رخ داد');
    }
  };

  return (
    <Fragment>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ShippingInfo shippingAddress={cart.shippingAddress} />
            <PaymentInfo paymentMethod={cart.paymentMethod} />
            <OrderItems orderItems={cart.orderItems} />
          </ListGroup>
        </Col>
        <Col md={4}>
          <OrderSummary
            cart={cart}
            onPlaceOrder={placeOrderHandler}
            createOrderLoading={createOrderLoading}
          />
        </Col>
      </Row>
    </Fragment>
  );
}

interface ShippingInfoProps {
  shippingAddress?: ShippingAddress;
}

const ShippingInfo = ({ shippingAddress }: ShippingInfoProps) => (
  <ListGroup.Item>
    <h2 className="fw-bold">آدرس ارسال</h2>
    <p>
      <strong className="me-1">آدرس:</strong>
      {shippingAddress?.address}, {shippingAddress?.city},{' '}
      {shippingAddress?.postalCode}, {shippingAddress?.country}
    </p>
  </ListGroup.Item>
);

interface PaymentInfoProps {
  paymentMethod?: string;
}

const PaymentInfo = ({ paymentMethod }: PaymentInfoProps) => (
  <ListGroup.Item>
    <h2 className="fw-bold">روش پرداخت</h2>
    <p>
      <strong className="me-1">روش:</strong>
      {paymentMethod}
    </p>
  </ListGroup.Item>
);

interface OrderItemsProps {
  orderItems: Product[];
}

const OrderItems = ({ orderItems }: OrderItemsProps) => (
  <ListGroup.Item>
    <h2 className="fw-bold">اقلام سفارش</h2>
    {orderItems.length === 0 ? (
      <Message variant="info">سبد خرید شما خالی است</Message>
    ) : (
      orderItems.map((item) => (
        <ListGroup key={item._id} className="my-5 my-md-2">
          <Row className="align-items-center gap-2 gap-md-0">
            <Col md={1}>
              <Image src={item.image} alt={item.name} fluid rounded />
            </Col>
            <Col md={5}>
              <Link to={`/product/${item._id}`}>{item.name}</Link>
            </Col>
            <Col className="text-md-end">
              {item.qty > 1
                ? `${item.qty} X $${item.price} = $${item.qty * item.price}`
                : `$${item.price}`}
            </Col>
          </Row>
        </ListGroup>
      ))
    )}
  </ListGroup.Item>
);

interface OrderSummaryProps {
  cart: CartState;
  onPlaceOrder: () => void;
  createOrderLoading: boolean;
}

const OrderSummary = ({
  cart,
  onPlaceOrder,
  createOrderLoading,
}: OrderSummaryProps) => (
  <Card>
    <ListGroup variant="flush">
      <ListGroup.Item>
        <h2 className="fw-bold">خلاصه سفارش</h2>
      </ListGroup.Item>
      <ListGroup.Item>
        <Row>
          <Col>مبلغ کالاها:</Col>
          <Col>{cart.itemsPrice} $</Col>
        </Row>
      </ListGroup.Item>
      <ListGroup.Item>
        <Row>
          <Col>هزینه ارسال:</Col>
          <Col>{cart.itemsPrice} $</Col>
        </Row>
      </ListGroup.Item>
      <ListGroup.Item>
        <Row>
          <Col>مالیات:</Col>
          <Col>{cart.taxPrice} $</Col>
        </Row>
      </ListGroup.Item>
      <ListGroup.Item>
        <Row>
          <Col>مبلغ کل:</Col>
          <Col>{cart.totalPrice} $</Col>
        </Row>
      </ListGroup.Item>
      <ListGroup.Item className="text-center">
        <Button
          className="text-white w-100"
          disabled={cart.orderItems.length === 0}
          onClick={onPlaceOrder}
        >
          ثبت سفارش
          {createOrderLoading && <Spinner size="sm" className="ms-2" />}
        </Button>
      </ListGroup.Item>
    </ListGroup>
  </Card>
);
