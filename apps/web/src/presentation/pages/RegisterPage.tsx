import { useEffect } from 'react';
import { Button, Col, Form, Row, Spinner } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useRegisterMutation } from 'infrastructure/services/api/users-api';
import { setCredentials } from 'presentation/contexts/auth';
import FormContainer from '../components/common/FormContainer';
import { RootState } from 'presentation/contexts/store';

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterPage = () => {
  const { register, handleSubmit } = useForm<FormData>();
  const userInfo = useSelector((s: RootState) => s.auth.userInfo);
  const [registerMutation, { isLoading: registerLoading }] =
    useRegisterMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { search } = useLocation();

  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get('redirect') || '/';

  useEffect(() => {
    if (userInfo) navigate(redirect);
  }, [userInfo, redirect, navigate]);

  const submitHandler = async (data: FormData) => {
    if (data.password !== data.confirmPassword)
      return toast('رمز عبور و تکرار آن یکسان نیست', { icon: '⚠️' });

    try {
      const res = await registerMutation(data).unwrap();
      dispatch(setCredentials(res));
      navigate(redirect);
    } catch (err: unknown) {
      const error = err as { data?: { message?: string }; error?: string };
      toast.error(error?.data?.message || error.error || 'خطایی رخ داد');
    }
  };

  return (
    <FormContainer>
      <h1>ثبت نام</h1>
      <Form onSubmit={handleSubmit(submitHandler)}>
        <Form.Group controlId="name" className="my-3">
          <Form.Label>نام</Form.Label>
          <Form.Control
            type="text"
            placeholder="نام خود را وارد کنید..."
            {...register('name')}
          />
        </Form.Group>
        <Form.Group controlId="email" className="my-3">
          <Form.Label>ایمیل</Form.Label>
          <Form.Control
            type="email"
            placeholder="ایمیل خود را وارد کنید..."
            {...register('email')}
          />
        </Form.Group>
        <Form.Group controlId="password" className="my-3">
          <Form.Label>رمز عبور</Form.Label>
          <Form.Control
            type="password"
            placeholder="رمز عبور خود را وارد کنید..."
            {...register('password')}
          />
        </Form.Group>
        <Form.Group controlId="confirmPassword" className="my-3">
          <Form.Label>تکرار رمز عبور</Form.Label>
          <Form.Control
            type="password"
            placeholder="رمز عبور را دوباره وارد کنید..."
            {...register('confirmPassword')}
          />
        </Form.Group>
        <Button
          type="submit"
          variant="primary"
          className="mt-2 w-25"
          disabled={registerLoading}
        >
          ثبت نام
          {registerLoading && <Spinner size="sm" className="ms-2" />}
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          قبلاً ثبت نام کرده‌اید؟
          <Link
            to={redirect ? `/login?redirect=${redirect}` : '/login'}
            className="ms-1"
          >
            ورود
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterPage;
