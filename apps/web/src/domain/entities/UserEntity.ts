import { EmailVO } from '../value-objects/EmailVO';

export interface UserInfo {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

export interface AuthState {
  userInfo?: UserInfo;
}

export class UserEntity {
  readonly id: string;
  readonly name: string;
  readonly email: EmailVO;
  readonly isAdmin: boolean;

  constructor(props: UserInfo) {
    this.id = props._id;
    this.name = props.name;
    this.email = EmailVO.create(props.email);
    this.isAdmin = props.isAdmin;
  }

  toUserInfo(): UserInfo {
    return {
      _id: this.id,
      name: this.name,
      email: this.email.value,
      isAdmin: this.isAdmin,
    };
  }
}
