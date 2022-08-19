import { IUser } from '@shared';

export type LoginData = Pick<IUser, 'password' | 'email'>;
