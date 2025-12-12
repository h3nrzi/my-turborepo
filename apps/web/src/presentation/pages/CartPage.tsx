import { Card, Col, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { addToCart, removeFromCart } from 'presentation/contexts/cart';
import CartItem from '../components/CartItem';
import CartSummary from '../components/CartSummary';
import Message from '../components/common/Message';
import { RootState } from 'presentation/contexts/store';
import Product from 'domain/entities/ProductEntity';
import CheckoutSteps from '../components/common/CheckoutSteps';

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orderItems = useSelector((s: RootState) => s.cart.orderItems);

  const addToCartHandler = (item: Product, qty: number) => {
    dispatch(addToCart({ ...item, qty }));
    toast.success('تعداد با موفقیت بهروزرسانی شد.');
  };

  const removeFromCartHandler = (_id: string) => {
    dispatch(removeFromCart({ _id }));
    toast.success('محصول از سبد خرید حذف شد.');
  };

  const checkoutHandler = () => {
    navigate('/login?isprivate=true&redirect=/shipping');
  };

  return (
    <Row>
      <CheckoutSteps step1 />
      <Col md={8}>
        <h1 className="mb-5 fw-bold">سبد خرید</h1>
        {orderItems.length === 0 ? (
          <Message variant="info">
            سبد خرید شما خالی است <Link to="/">بازگشت</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {orderItems.map((item) => (
              <ListGroup.Item key={item._id}>
                <CartItem
                  item={item}
                  onAddToCart={addToCartHandler}
                  onRemoveFromCart={removeFromCartHandler}
                />
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <CartSummary orderItems={orderItems} onCheckout={checkoutHandler} />
        </Card>
      </Col>
    </Row>
  );
};

export default CartPage;
