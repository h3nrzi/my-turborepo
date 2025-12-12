import { useEffect } from 'react';
import { Button, Form, Stack } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { saveShippingAddress } from 'presentation/contexts/cart';
import FormContainer from '../components/common/FormContainer';
import { RootState } from 'presentation/contexts/store';
import CheckoutSteps from '../components/common/CheckoutSteps';

type FormData = {
  address: string;
  city: string;
  country: string;
  postalCode: string;
};

const ShippingPage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();
  const { orderItems, shippingAddress } = useSelector((s: RootState) => s.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setValue('address', shippingAddress?.address as string);
    setValue('city', shippingAddress?.city as string);
    setValue('country', shippingAddress?.country as string);
    setValue('postalCode', shippingAddress?.postalCode as string);

    if (orderItems.length === 0) {
      toast('لطفاً ابتدا محصولی را انتخاب کنید', { icon: '⚠️' });
      navigate('/cart');
    }
  }, [orderItems, navigate, shippingAddress, setValue]);

  const submitHandler = (data: FormData) => {
    dispatch(saveShippingAddress(data));
    navigate('/payment');
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1 className="fw-bold">آدرس ارسال</h1>
      <Form className="mt-5" onSubmit={handleSubmit(submitHandler)}>
        <Stack direction="vertical" gap={3}>
          <Form.Group controlId="address">
            <Form.Label>آدرس</Form.Label>
            <Form.Control
              type="text"
              placeholder="آدرس خود را وارد کنید..."
              {...register('address', { required: true })}
            />
            {errors.address && (
              <span className="text-danger">آدرس الزامی است</span>
            )}
          </Form.Group>
          <Form.Group controlId="city">
            <Form.Label>شهر</Form.Label>
            <Form.Control
              type="text"
              placeholder="شهر خود را وارد کنید..."
              {...register('city', { required: true })}
            />
            {errors.city && (
              <span className="text-danger">نام شهر الزامی است</span>
            )}
          </Form.Group>
          <Form.Group controlId="postalCode">
            <Form.Label>کد پستی</Form.Label>
            <Form.Control
              type="text"
              placeholder="کد پستی خود را وارد کنید..."
              {...register('postalCode', { required: true })}
            />
            {errors.postalCode && (
              <span className="text-danger">کد پستی الزامی است</span>
            )}
          </Form.Group>
          <Form.Group controlId="country">
            <Form.Label>کشور</Form.Label>
            <Form.Control
              type="text"
              placeholder="کشور خود را وارد کنید..."
              {...register('country', { required: true })}
            />
            {errors.country && (
              <span className="text-danger">نام کشور الزامی است</span>
            )}
          </Form.Group>
          <Button type="submit" variant="primary" className="w-25">
            ادامه
          </Button>
        </Stack>
      </Form>
    </FormContainer>
  );
};

export default ShippingPage;
