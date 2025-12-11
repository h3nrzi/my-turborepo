export interface UserInfo {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

export interface AuthState {
  userInfo?: UserInfo;
}
