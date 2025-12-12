import { useEffect } from 'react';
import { Button, Form, Stack } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
  useGetUserQuery,
  useUpdateUserMutation,
} from 'infrastructure/services/api/users-api';
import { setCredentials } from 'presentation/contexts/auth';
import FormContainer from '../../components/common/FormContainer';
import Loader from '../../components/common/Loader';
import Message from '../../components/common/Message';
import { RootState } from 'presentation/contexts/store';
import getErrorMessage from 'shared/utils/getErrorMessage';

interface FormData {
  _id: string;
  name: string;
  email: string;
  isAdmin: string | boolean;
}

const UserEditPage = () => {
  const { id: userId } = useParams();
  const userInfo = useSelector((s: RootState) => s.auth.userInfo);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();
  const {
    data: user,
    isLoading: userLoading,
    error: userError,
    refetch: userRefetch,
  } = useGetUserQuery({ userId });

  const [updateUserMutation, { isLoading: updateUserLoading }] =
    useUpdateUserMutation();

  useEffect(() => {
    if (user) {
      setValue('_id', user._id);
      setValue('name', user.name);
      setValue('email', user.email);
      setValue('isAdmin', user.isAdmin ? 'true' : 'false');
    }
  }, [user, setValue]);

  const submitHandler: SubmitHandler<FormData> = async (data) => {
    try {
      const updatedUser = await updateUserMutation({
        userId,
        data: {
          ...data,
          isAdmin: data.isAdmin === 'true' ? true : false,
        },
      }).unwrap();

      if (userInfo?._id === updatedUser._id)
        dispatch(setCredentials(updatedUser));

      userRefetch();
      toast.success('کاربر با موفقیت بهروزرسانی شد');
      navigate('/admin/user-list');
    } catch (err: unknown) {
      const error = err as { data?: { message?: string }; error?: string };
      toast.error(error?.data?.message || error.error || 'خطایی رخ داد');
    }
  };

  if (userLoading) return <Loader />;
  if (userError)
    return <Message variant="danger">{getErrorMessage(userError)}</Message>;

  return (
    <FormContainer>
      <h1>ویرایش کاربر</h1>
      <Form onSubmit={handleSubmit(submitHandler)}>
        <Stack gap={4} direction="vertical">
          <Form.Group controlId="name">
            <Form.Label>نام</Form.Label>
            <Form.Control
              type="text"
              {...register('name', {
                required: 'نام الزامی است',
                minLength: {
                  value: 3,
                  message: 'نام باید حداقل ۳ کاراکتر باشد',
                },
              })}
              isInvalid={!!errors.name}
            />
            <Form.Control.Feedback type="invalid">
              {errors.name?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>ایمیل</Form.Label>
            <Form.Control
              type="text"
              {...register('email', {
                required: 'ایمیل الزامی است',
                pattern: {
                  value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                  message: 'یک ایمیل معتبر وارد کنید',
                },
              })}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="isAdmin">
            <Form.Label>وضعیت مدیریت</Form.Label>
            <Stack direction="horizontal" gap={3}>
              <Form.Check
                type="radio"
                label="بله"
                value="true"
                {...register('isAdmin', {
                  required: 'تعیین وضعیت مدیریت الزامی است',
                })}
                isInvalid={!!errors.isAdmin}
              />
              <Form.Check
                type="radio"
                label="خیر"
                value="false"
                {...register('isAdmin', {
                  required: 'تعیین وضعیت مدیریت الزامی است',
                })}
                isInvalid={!!errors.isAdmin}
              />
            </Stack>
            <Form.Control.Feedback type="invalid">
              {errors.isAdmin?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Button type="submit" variant="secondary" className="text-white">
            بهروزرسانی {updateUserLoading && <Loader size="sm" />}
          </Button>
        </Stack>
      </Form>
    </FormContainer>
  );
};

export default UserEditPage;
