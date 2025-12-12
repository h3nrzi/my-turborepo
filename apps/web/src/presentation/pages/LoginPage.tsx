import { useEffect } from 'react';
import { Button, Col, Form, Row, Spinner, Stack, Alert } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useLoginMutation } from 'infrastructure/services/api/users-api';
import { setCredentials } from 'presentation/contexts/auth';
import FormContainer from '../components/common/FormContainer';
import { RootState } from 'presentation/contexts/store';

interface FormData {
  email: string;
  password: string;
}

const LoginPage = () => {
  const userInfo = useSelector((s: RootState) => s.auth.userInfo);
  const [loginMutation, { isLoading: LoginLoading }] = useLoginMutation();
  const { register, handleSubmit } = useForm<FormData>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { search } = useLocation();

  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get('redirect') || '/';
  const isprivate = Boolean(searchParams.get('isprivate'));
  const isAdmin = Boolean(searchParams.get('isAdmin'));

  useEffect(() => {
    if (isAdmin) toast('شما مجاز به انجام این عملیات نیستید', { icon: '⚠️' });
    if (!userInfo && isprivate) toast('ابتدا وارد حساب شوید!', { icon: '⚠️' });
    if (userInfo) navigate(redirect);
  }, [userInfo, redirect, navigate, isprivate, isAdmin]);

  const submitHandler = async (data: FormData) => {
    try {
      const res = await loginMutation(data).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err: unknown) {
      const error = err as { data?: { message?: string }; error?: string };
      toast.error(error?.data?.message || error?.error || 'خطایی رخ داد');
    }
  };

  return (
    <FormContainer>
      <h1>ورود</h1>
      <Form onSubmit={handleSubmit(submitHandler)}>
        <Stack gap={3}>
          <Form.Group controlId="email">
            <Form.Label>ایمیل</Form.Label>
            <Form.Control
              type="email"
              placeholder="ایمیل خود را وارد کنید..."
              {...register('email')}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>رمز عبور</Form.Label>
            <Form.Control
              type="password"
              placeholder="رمز عبور خود را وارد کنید..."
              {...register('password')}
            />
          </Form.Group>
          <Button
            type="submit"
            variant="primary"
            className="w-25"
            disabled={LoginLoading}
          >
            ورود
            {LoginLoading && <Spinner size="sm" className="ms-2" />}
          </Button>
        </Stack>
      </Form>
      <Row className="py-3">
        <Col>
          کاربر جدید هستید؟
          <Link
            to={redirect ? `/register?redirect=${redirect}` : '/register'}
            className="ms-1"
          >
            ثبت نام
          </Link>
        </Col>
      </Row>
      <Row>
        <Col>
          <Alert variant="info" className="text-red">
            ورود آزمایشی مدیر: admin@gmail.com | رمز: 123456
          </Alert>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginPage;
