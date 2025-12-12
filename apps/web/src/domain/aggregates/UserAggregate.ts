import { UserEntity, type UserInfo } from '../entities/UserEntity';

export class UserAggregate {
  private readonly user: UserEntity;

  constructor(user: UserEntity) {
    this.user = user;
  }

  static fromUserInfo(userInfo: UserInfo) {
    return new UserAggregate(new UserEntity(userInfo));
  }

  toUserInfo(): UserInfo {
    return this.user.toUserInfo();
  }
}
