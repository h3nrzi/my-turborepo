import type { UserInfo } from './UserEntity';

export interface ReviewEntity {
  _id: string;
  comment: string;
  createdAt: string;
  name: string;
  rating: number;
  user: string | UserInfo;
}

export default interface ProductEntity {
  _id: string;
  brand: string;
  category: string;
  countInStock: number;
  description: string;
  image: string;
  name: string;
  numReviews: number;
  price: number;
  qty: number;
  rating: number;
  reviews?: ReviewEntity[];
}
