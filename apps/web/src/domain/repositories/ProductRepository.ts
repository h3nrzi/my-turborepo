import type ProductEntity from '../entities/ProductEntity';

export interface ProductRepository {
  findById(id: string): Promise<ProductEntity>;
  list(): Promise<ProductEntity[]>;
  save(product: ProductEntity): Promise<ProductEntity>;
}
