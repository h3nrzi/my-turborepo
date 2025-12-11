import type { UserInfo } from '../entities/UserEntity';

export interface UserRepository {
  findById(id: string): Promise<UserInfo>;
  save(user: UserInfo): Promise<UserInfo>;
}
