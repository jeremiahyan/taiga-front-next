import { User } from '@/app/api/users/users.model';

export interface Auth extends User {
  authToken: string;
}

export interface LoginInput {
  password?: string;
  type: 'normal' | 'github';
  username?: User['username'];
  code?: string;
}

export interface PublicRegistryInput {
  type: 'public';
  username: User['username'];
  password: string;
  email: User['email'];
  fullName: User['fullName'];
  acceptedTerms: User['acceptedTerms'];
}

export interface PrivateRegistryInput {
  type: 'private';
  existing: boolean;
  token: string;
  username: User['username'];
  password: string;
  email: User['email'];
  fullName: User['fullName'];
}
