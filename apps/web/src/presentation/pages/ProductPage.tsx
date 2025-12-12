import { useState } from 'react';
import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Form,
  Image,
  Row,
} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  useCreateProductReviewMutation,
  useGetProductQuery,
} from 'infrastructure/services/api/products-api';
import { addToCart } from 'presentation/contexts/cart';
import { RootState } from 'presentation/contexts/store';

interface FormData {
  rating: number;
  comment: string;
}

export default function ProductPage() {
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const orderItems = useSelector((state: RootState) => state.cart.orderItems);
  const existingCartItem = orderItems.find((item) => item._id === productId);
  const { data: product, isLoading } = useGetProductQuery({ productId });
  const { register, handleSubmit } = useForm<FormData>();
  const [createProductReviewMutation] = useCreateProductReviewMutation();
  const [qty, setQty] = useState(1);

  async function submitHandler(data: FormData) {
    try {
      await createProductReviewMutation({ productId, ...data }).unwrap();
      toast.success('نظر شما با موفقیت ثبت شد');
    } catch {
      toast.error('ثبت نظر با مشکل روبه‌رو شد');
    }
  }

  function addToCartHandler() {
    if (!product) return;

    if (existingCartItem && existingCartItem.qty === qty) {
      toast('این محصول با همین تعداد در سبد موجود است!', {
        icon: '⚠️',
      });
      return;
    }

    if (existingCartItem && existingCartItem.qty !== qty) {
      dispatch(addToCart({ ...product, qty }));
      toast.success('تعداد در سبد خرید به‌روزرسانی شد');
      return;
    }

    dispatch(addToCart({ ...product, qty }));
    toast.success('محصول به سبد خرید اضافه شد');
  }

  if (isLoading) return <div>در حال بارگذاری...</div>;
  if (!product) return <div>محصولی یافت نشد</div>;

  return (
    <Container className="py-4">
      {/* Product Details Section */}
      <Row className="mb-5">
        <Col lg={6} className="mb-4">
          <Card className="h-100 border-0 shadow-sm">
            <Card.Body className="p-0">
              <Image
                src={product.image}
                alt={product.name}
                fluid
                className="w-100"
                style={{ height: '400px', objectFit: 'cover' }}
              />
            </Card.Body>
          </Card>
        </Col>

        <Col lg={6}>
          <div className="mb-4">
            <h1 className="display-6 fw-bold mb-3">{product.name}</h1>
            <div className="mb-3">
              <span className="text-warning me-2">
                {'★'.repeat(Math.floor(product.rating))}
                {'☆'.repeat(5 - Math.floor(product.rating))}
              </span>
              <span className="text-muted">({product.numReviews} نظر)</span>
            </div>
            <p className="lead text-muted mb-4">{product.description}</p>
          </div>

          <Card className="shadow-sm">
            <Card.Body>
              <Row className="align-items-center mb-3">
                <Col>
                  <h3 className="text-success mb-0">${product.price}</h3>
                </Col>
                <Col className="text-end">
                  <Badge
                    bg={product.countInStock > 0 ? 'success' : 'danger'}
                    className="fs-6"
                  >
                    {product.countInStock > 0 ? 'موجود' : 'ناموجود'}
                  </Badge>
                </Col>
              </Row>

              {product.countInStock > 0 && (
                <Row className="mb-3">
                  <Col xs={4}>
                    <Form.Label className="fw-semibold">تعداد:</Form.Label>
                  </Col>
                  <Col xs={8}>
                    <Form.Select
                      value={qty}
                      onChange={(e) => setQty(Number(e.target.value))}
                      size="sm"
                    >
                      {Array.from(
                        { length: Math.min(product.countInStock, 10) },
                        (_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1}
                          </option>
                        ),
                      )}
                    </Form.Select>
                  </Col>
                </Row>
              )}

              <Button
                size="lg"
                disabled={product.countInStock === 0}
                className="w-100"
                onClick={addToCartHandler}
              >
                {existingCartItem ? 'به‌روزرسانی سبد' : 'افزودن به سبد'}
              </Button>

              {existingCartItem && (
                <div className="text-center mt-2">
                  <small className="text-muted">
                    تعداد فعلی در سبد: {existingCartItem.qty}
                  </small>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Reviews Section */}
      <Row>
        <Col lg={8} className="mx-auto">
          <Card className="shadow-sm">
            <Card.Header>
              <h2 className="fw-bold mb-0">نظرات کاربران</h2>
            </Card.Header>
            <Card.Body>
              {product.reviews?.length === 0 ? (
                <div className="text-center text-muted py-4">
                  <p>هنوز نظری ثبت نشده است. شما اولین نفر باشید!</p>
                </div>
              ) : (
                <div className="mb-4">
                  {product.reviews?.map((review) => (
                    <Card
                      key={review._id}
                      className="mb-3 border-start border-primary border-3"
                    >
                      <Card.Body>
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <h5 className="mb-1">{review.name}</h5>
                          <div className="text-warning">
                            {'★'.repeat(review.rating)}
                            {'☆'.repeat(5 - review.rating)}
                          </div>
                        </div>
                        <small className="text-muted">
                          {review.createdAt?.substring(0, 10)}
                        </small>
                        <p className="mt-2 mb-0">{review.comment}</p>
                      </Card.Body>
                    </Card>
                  ))}
                </div>
              )}

              {/* Review Form */}
              <Card>
                <Card.Body>
                  <h4 className="fw-bold mb-4">نوشتن نظر</h4>
                  <Form onSubmit={handleSubmit(submitHandler)}>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label className="fw-semibold">
                            امتیاز
                          </Form.Label>
                          <Form.Select
                            {...register('rating', {
                              valueAsNumber: true,
                              required: 'امتیاز لازم است',
                            })}
                          >
                            <option value="">انتخاب امتیاز</option>
                            <option value="1">★ 1 - ضعیف</option>
                            <option value="2">★★ 2 - قابل قبول</option>
                            <option value="3">★★★ 3 - خوب</option>
                            <option value="4">★★★★ 4 - بسیار خوب</option>
                            <option value="5">★★★★★ 5 - عالی</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">نظر شما</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={4}
                        placeholder="دیدگاه خود را درباره این محصول بنویسید..."
                        {...register('comment', {
                          required: 'ثبت نظر الزامی است',
                        })}
                      />
                    </Form.Group>

                    <Button type="submit" size="lg">
                      ثبت نظر
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
