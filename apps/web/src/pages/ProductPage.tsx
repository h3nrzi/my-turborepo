import { Fragment } from 'react';
import {
  Button,
  Col,
  Form,
  ListGroup,
  Row,
  Stack,
  FloatingLabel,
} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  useCreateProductReviewMutation,
  useGetProductQuery,
} from '../api/products-api';
import { addToCart } from '../app/cart-slice';
import Message from '../components/common/Message';
import Rating from '../components/common/Rating';
import ProductDetail from '../components/ProductDetail';
import ProductDetailPlaceholder from '../components/ProductDetailSkeleton';
import { RootState } from '../store';
import getErrorMessage from '../utils/getErrorMessage';
import Meta from '../components/common/Meta';

interface FormData {
  rating: number;
  comment: string;
}

export default function ProductPage() {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const orderItems = useSelector((state: RootState) => state.cart.orderItems);
  const existingCartItem = orderItems.find((item) => item._id === productId);
  const shouldSkipProductQuery = !productId;
  const {
    data: product,
    isLoading: productQueryLoading,
    isFetching: productQueryFetching,
    error: productQueryError,
    refetch: productQueryRefetch,
  } = useGetProductQuery({ productId }, { skip: shouldSkipProductQuery });
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();
  const [
    createProductReviewMutation,
    { isLoading: createProductReviewLoading },
  ] = useCreateProductReviewMutation();
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const isProductLoading = productQueryLoading || productQueryFetching;

  async function submitHandler(data: FormData) {
    if (!productId || !product?._id) {
      toast.error('Product not found', { position: 'top-center' });
      return;
    }

    if (!data.rating || !data.comment)
      return toast.error('Please fill out the form', {
        position: 'top-center',
      });

    try {
      const res = await createProductReviewMutation({
        productId,
        ...data,
      }).unwrap();
      productQueryRefetch();
      toast.success(res.message, { position: 'top-center' });
      setValue('comment', '');
      setValue('rating', 0);
    } catch (err: unknown) {
      const error = err as { data?: { message?: string }; error?: string };
      toast.error(error?.data?.message || error.error, {
        position: 'top-center',
      });
    }
  }

  function addToCartHandler(qty: number) {
    if (!product) {
      toast.error('Product not found', { position: 'top-center' });
      return;
    }

    if (existingCartItem && existingCartItem.qty === qty)
      return toast.warn('Product already added!', { position: 'top-center' });

    if (existingCartItem && existingCartItem.qty !== qty) {
      dispatch(addToCart({ ...product, qty }));
      return toast.success('Quantity updated successfully.', {
        onClick: () => navigate('/cart'),
        position: 'top-center',
        style: { cursor: 'pointer' },
      });
    }

    dispatch(addToCart({ ...product, qty }));
    return toast.success('Product Added to your cart.', {
      onClick: () => navigate('/cart'),
      position: 'top-center',
      style: { cursor: 'pointer' },
    });
  }

  if (!productId) {
    return (
      <Message variant="danger">Product ID is missing from the URL.</Message>
    );
  }

  if (productQueryError) {
    return (
      <Message variant="danger">{getErrorMessage(productQueryError)}</Message>
    );
  }

  return (
    <Fragment>
      <Meta title={product?.name} description={product?.description} />
      {isProductLoading ? (
        <ProductDetailPlaceholder />
      ) : product ? (
        <ProductDetail product={product} onAddToCart={addToCartHandler} />
      ) : (
        <Message variant="danger">Product not found.</Message>
      )}

      {product && (
        <Row className="mt-5">
          <Col md={6}>
            <h2 className="fw-bold">Reviews</h2>
            {product.reviews?.length === 0 && (
              <Message variant="info">No Reviews</Message>
            )}
            <ListGroup variant="flush">
              {product.reviews?.map((review) => (
                <ListGroup.Item key={review._id}>
                  <strong>{review.name || 'Anonymous'}</strong>
                  <Rating value={review.rating || 0} />
                  <p>{review.createdAt?.substring(0, 10) || 'Unknown date'}</p>
                  <p>{review.comment || 'No comment'}</p>
                </ListGroup.Item>
              ))}

              <ListGroup.Item className="p-0 mt-5">
                {!userInfo ? (
                  <Fragment>
                    <h2 className="flex-md-grow-1 fw-bold">
                      Write a Customer Review
                    </h2>
                    <Message variant="info">
                      Please{' '}
                      <Link to={`/login?redirect=/product/${product._id}`}>
                        sign in
                      </Link>{' '}
                      to write a review
                    </Message>
                  </Fragment>
                ) : (
                  <Form onSubmit={handleSubmit(submitHandler)}>
                    <Form.Group controlId="rating" className="my-2">
                      <Stack className="flex-column flex-md-row align-items-md-start gap-md-2">
                        <h2 className="flex-md-grow-1 fw-bold">
                          Write a Customer Review
                        </h2>
                        <FloatingLabel controlId="rating" label="Rating">
                          <Form.Select
                            aria-label="Rating"
                            defaultValue=""
                            {...register('rating', {
                              valueAsNumber: true,
                              required: 'Rating is required',
                            })}
                            isInvalid={!!errors.rating}
                          >
                            <option value=""></option>
                            <option value="1">1 - Poor</option>
                            <option value="2">2 - Fair</option>
                            <option value="3">3 - Good</option>
                            <option value="4">4 - Very Good</option>
                            <option value="5">5 - Excellent</option>
                          </Form.Select>
                          {errors.rating && (
                            <p className="text-danger">
                              {errors.rating.message}
                            </p>
                          )}
                        </FloatingLabel>
                      </Stack>
                    </Form.Group>
                    <Form.Group as="fieldset" controlId="comment">
                      <Form.Label as="legend">Comment</Form.Label>
                      <Form.Control
                        as="textarea"
                        placeholder="Write a comment..."
                        rows={5}
                        {...register('comment', {
                          required: 'Comment is required',
                        })}
                        isInvalid={!!errors.comment}
                      />
                      {errors.comment && (
                        <p className="text-danger">{errors.comment?.message}</p>
                      )}
                    </Form.Group>
                    <Button
                      type="submit"
                      className="mt-2 w-25"
                      disabled={createProductReviewLoading}
                    >
                      Submit
                    </Button>
                  </Form>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      )}
    </Fragment>
  );
}
