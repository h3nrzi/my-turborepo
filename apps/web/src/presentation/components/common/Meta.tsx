import { FC } from 'react';
import { Helmet } from 'react-helmet-async';

interface Props {
  title?: string;
  description?: string;
  keywords?: string;
}

const Meta: FC<Props> = ({
  title = 'به پروشاپ خوش آمدید',
  description = 'بهترین کالاها را با قیمت مناسب خریداری کنید',
  keywords = 'خرید آنلاین, لوازم الکترونیکی, پروشاپ',
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description}></meta>
      <meta name="keywords" content={keywords}></meta>
    </Helmet>
  );
};

export default Meta;
