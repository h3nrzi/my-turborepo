import type { UserRepository } from 'domain/repositories/UserRepository';
import type { UserInfo } from 'domain/entities/UserEntity';

export class GetUserProfileUseCase {
  private readonly repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  execute(id: string): Promise<UserInfo> {
    return this.repository.findById(id);
  }
}
