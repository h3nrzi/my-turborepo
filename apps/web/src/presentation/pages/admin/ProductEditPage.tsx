import { useEffect } from 'react';
import { Button, Form, Stack } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from '@/components/ui/sonner';
import {
  useGetProductQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from 'infrastructure/services/api/products-api';
import FormContainer from '../../components/common/FormContainer';
import Loader from '../../components/common/Loader';
import Message from '../../components/common/Message';
import Product from 'domain/entities/ProductEntity';
import getErrorMessage from 'shared/utils/getErrorMessage';

type FormData = Product;

const ProductEditPage = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();
  const {
    data: product,
    isLoading: productLoading,
    error: productError,
  } = useGetProductQuery({ productId: productId! });
  const [updateProductMutation, { isLoading: updateProductLoading }] =
    useUpdateProductMutation();
  const [uploadProductImageMutation, { isLoading: uploadProductImageLoading }] =
    useUploadProductImageMutation();

  useEffect(() => {
    if (product) {
      setValue('name', product.name);
      setValue('price', product.price);
      setValue('image', product.image);
      setValue('brand', product.brand);
      setValue('category', product.category);
      setValue('countInStock', product.countInStock);
      setValue('description', product.description);
    }
  }, [product, setValue]);

  const submitHandler: SubmitHandler<FormData> = async (data) => {
    try {
      await updateProductMutation({ productId, data });
      toast.success('محصول با موفقیت بهروزرسانی شد');
      navigate('/admin/product-list');
    } catch (err: unknown) {
      const error = err as { data?: { message?: string }; error?: string };
      toast.error(error?.data?.message || error.error || 'خطایی رخ داد');
    }
  };

  const uploadFileHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file);
      try {
        const res = await uploadProductImageMutation(formData).unwrap();
        setValue('image', res.image);
        toast.success(res.message);
      } catch (err: unknown) {
        const error = err as { data?: { message?: string }; error?: string };
        toast.error(error?.data?.message || error?.error || 'خطایی رخ داد');
      }
    }
  };

  if (productLoading) return <Loader />;
  if (productError)
    return <Message variant="danger">{getErrorMessage(productError)}</Message>;

  return (
    <FormContainer>
      <h1>ویرایش محصول</h1>
      <Form onSubmit={handleSubmit(submitHandler)}>
        <Stack gap={4} direction="vertical">
          <Form.Group controlId="name">
            <Form.Label>نام</Form.Label>
            <Form.Control
              type="text"
              {...register('name', { required: 'نام الزامی است' })}
            />
            {errors.name && (
              <p className="text-danger">{errors.name.message}</p>
            )}
          </Form.Group>
          <Form.Group controlId="image">
            <Form.Label>تصویر</Form.Label>{' '}
            {uploadProductImageLoading && <Loader size="sm" />}
            <Stack gap={4} direction="horizontal">
              <Form.Control type="file" onChange={uploadFileHandler} />
              <Form.Control type="text" {...register('image')} disabled />
            </Stack>
          </Form.Group>
          <Stack gap={4} direction="horizontal">
            <Form.Group controlId="category" className="flex-grow-1">
              <Form.Label>دستهبندی</Form.Label>
              <Form.Control
                as="select"
                {...register('category', {
                  required: 'انتخاب دستهبندی الزامی است',
                })}
              >
                <option value="Electronics">الکترونیکی</option>
                <option value="Sample Category">دسته نمونه</option>
              </Form.Control>
              {errors.category && (
                <p className="text-danger">{errors.category.message}</p>
              )}
            </Form.Group>
            <Form.Group controlId="brand" className="flex-grow-1">
              <Form.Label>برند</Form.Label>
              <Form.Control
                as="select"
                {...register('brand', { required: 'انتخاب برند الزامی است' })}
              >
                <option value="Apple">Apple</option>
                <option value="Samsung">Samsung</option>
              </Form.Control>
              {errors.brand && (
                <p className="text-danger">{errors.brand.message}</p>
              )}
            </Form.Group>
          </Stack>
          <Stack direction="horizontal" gap={4}>
            <Form.Group controlId="price" className="flex-grow-1">
              <Form.Label>قیمت</Form.Label>
              <Form.Control
                type="number"
                min=".00"
                step=".01"
                {...register('price', {
                  valueAsNumber: true,
                  required: 'قیمت الزامی است',
                })}
              />
              {errors.price && (
                <p className="text-danger">{errors.price.message}</p>
              )}
            </Form.Group>
            <Form.Group controlId="countInStock" className="flex-grow-1">
              <Form.Label>موجودی</Form.Label>
              <Form.Control
                type="number"
                min="0"
                {...register('countInStock', {
                  valueAsNumber: true,
                  required: 'تعیین موجودی الزامی است',
                })}
              />
              {errors.countInStock && (
                <p className="text-danger">{errors.countInStock.message}</p>
              )}
            </Form.Group>
          </Stack>
          <Form.Group controlId="description">
            <Form.Label>توضیحات</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              {...register('description', {
                required: 'توضیحات الزامی است',
              })}
            />
            {errors.description && (
              <p className="text-danger">{errors.description.message}</p>
            )}
          </Form.Group>
          <Button type="submit" variant="secondary" className="text-white">
            بهروزرسانی {updateProductLoading && <Loader size="sm" />}
          </Button>
        </Stack>
      </Form>
    </FormContainer>
  );
};

export default ProductEditPage;
