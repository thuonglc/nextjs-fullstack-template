export interface LoginPayload {
  identifier: string;
  password: string;
}

export interface User {
  name: string;
  email: string;
  role: number | string;
  avatar?: string;
}
