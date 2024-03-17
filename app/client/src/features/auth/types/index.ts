export interface RegisterRequest {
  email: String;
  password: string;
  firstName: string;
  lastName: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}