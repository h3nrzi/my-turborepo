import _ from 'lodash';
import { FC, useEffect, useState } from 'react';
import { Button, Col, Form, Nav, Row, Stack, Table } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useGetMyOrdersQuery } from 'infrastructure/services/api/orders-api';
import { useUpdateProfileMutation } from 'infrastructure/services/api/users-api';
import { setCredentials } from 'presentation/contexts/auth';
import Loader from '../components/common/Loader';
import Message from '../components/common/Message';
import { RootState } from 'presentation/contexts/store';
import Order from 'domain/aggregates/OrderAggregate';
import getErrorMessage from 'shared/utils/getErrorMessage';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<TabKey>('profile');
  const dispatch = useDispatch();
  const [updateProfileMutation, { isLoading: updateProfileLoading }] =
    useUpdateProfileMutation();
  const {
    data: orders,
    isLoading: ordersLoading,
    error: ordersError,
  } = useGetMyOrdersQuery(undefined, { skip: activeTab !== 'orders' });

  const submitHandler = async ({
    name,
    email,
    password,
    confirmPassword,
  }: FormData) => {
    if (password !== confirmPassword)
      return toast.error('رمز عبور و تکرار آن یکسان نیست');

    try {
      const res = await updateProfileMutation({
        name,
        email,
        password,
      }).unwrap();
      dispatch(setCredentials(res));
      toast.success('پروفایل با موفقیت بهروزرسانی شد');
    } catch (err: unknown) {
      const error = err as { data?: { message?: string }; error?: string };
      toast.error(error?.data?.message || error?.error || 'خطایی رخ داد');
    }
  };

  return (
    <Row className="g-4 align-items-start">
      <Col md={3}>
        <h2 className="mb-3">پروفایل</h2>
        <Nav variant="pills" className="flex-column gap-2">
          <Nav.Item>
            <Nav.Link
              active={activeTab === 'profile'}
              onClick={() => setActiveTab('profile')}
              className="text-center text-md-start"
            >
              اطلاعات کاربر
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              active={activeTab === 'orders'}
              onClick={() => setActiveTab('orders')}
              className="text-center text-md-start"
            >
              سفارش‌ها
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Col>
      <Col md={9}>
        <div className="p-4 border rounded">
          {activeTab === 'profile' ? (
            <>
              <h3 className="mb-3">اطلاعات کاربر</h3>
              <ProfileForm
                onSubmit={submitHandler}
                updateProfileLoading={updateProfileLoading}
              />
            </>
          ) : (
            <>
              <h3 className="mb-3">سفارش‌ها</h3>
              {ordersLoading ? (
                <Loader />
              ) : ordersError ? (
                <Message variant="danger">{getErrorMessage(ordersError)}</Message>
              ) : (
                <OrdersTable orders={orders} />
              )}
            </>
          )}
        </div>
      </Col>
    </Row>
  );
}

type TabKey = 'profile' | 'orders';

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface ProfileFormProps {
  onSubmit: (data: FormData) => void;
  updateProfileLoading: boolean;
}

const ProfileForm: FC<ProfileFormProps> = ({
  onSubmit,
  updateProfileLoading,
}) => {
  const userInfo = useSelector((s: RootState) => s.auth.userInfo);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  useEffect(() => {
    if (userInfo) {
      setValue('name', userInfo.name);
      setValue('email', userInfo.email);
    }
  }, [userInfo, setValue]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="mb-5 mb-md-0">
      <Stack gap={4}>
        <Form.Group controlId="name">
          <Form.Label>نام</Form.Label>
          <Form.Control
            type="text"
            placeholder="نام خود را وارد کنید"
            {...register('name', { required: true })}
          />
          {errors.name && <span className="text-danger">نام الزامی است</span>}
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>ایمیل</Form.Label>
          <Form.Control
            type="email"
            placeholder="ایمیل خود را وارد کنید"
            {...register('email', { required: true })}
          />
          {errors.email && (
            <span className="text-danger">ایمیل الزامی است</span>
          )}
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>رمز عبور</Form.Label>
          <Form.Control
            type="password"
            placeholder="رمز عبور خود را وارد کنید"
            {...register('password')}
          />
        </Form.Group>
        <Form.Group controlId="confirmPassword">
          <Form.Label>تکرار رمز عبور</Form.Label>
          <Form.Control
            type="password"
            placeholder="رمز عبور را دوباره وارد کنید"
            {...register('confirmPassword')}
          />
        </Form.Group>
        <Button type="submit" variant="primary" className="w-50">
          بهروزرسانی
          {updateProfileLoading && <Loader size="sm" />}
        </Button>
      </Stack>
    </Form>
  );
};

interface OrdersTableProps {
  orders?: Order[];
}

const OrdersTable: FC<OrdersTableProps> = ({ orders }) => {
  return (
    <Table responsive="lg" className="text-nowrap">
      <thead>
        <tr>
          <th className="px-5 px-lg-0">شناسه</th>
          <th className="px-5 px-lg-0">تاریخ</th>
          <th className="px-5 px-lg-0">مبلغ کل</th>
          <th className="px-5 px-lg-0">پرداخت</th>
          <th className="px-5 px-lg-0">تحویل</th>
          <th className="px-5 px-lg-0"></th>
        </tr>
      </thead>
      <tbody>
        {orders?.map((order) => (
          <tr key={order._id}>
            <td>
              <Link to={`/order/${order._id}`}>
                {_.takeRight(order._id.split(''), 4).join('')}
              </Link>
            </td>
            <td>{order.createdAt.substring(0, 10)}</td>
            <td>{order.totalPrice} $</td>
            <td>
              {order.isPaid ? (
                <span className=" text-success">
                  {order.paidAt?.substring(0, 10)}
                </span>
              ) : (
                <FaTimes color="red" />
              )}
            </td>
            <td>
              {order.isDelivered ? (
                <span className=" text-success">
                  {order.deliveredAt?.substring(0, 10)}
                </span>
              ) : (
                <FaTimes color="red" />
              )}
            </td>
            <td>
              {order.isPaid && order.isDelivered ? (
                <FaCheck color="green" />
              ) : (
                <Link to={`/order/${order._id}`}>
                  <Button
                    size="sm"
                    as="span"
                    variant="secondary"
                    className="text-white"
                  >
                    جزئیات
                  </Button>
                </Link>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
