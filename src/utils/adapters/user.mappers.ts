import bcrypt from 'bcrypt';
import { User } from '../../models/user.type';

export interface DbUser {
  id?: number;
  name: string;
  surname: string;
  password?: string;
  email: string;
  address: string | null;
  gender: string | null;
  phone: string | null;
  role: string;
  identification: number | null;
  birthdate: string | null;
}

export const mapUserToDb = async (user: User): Promise<DbUser> => {
  const hashedPassword = await bcrypt.hash(user.password!, 10);

  return {
    name: user.name,
    surname: user.surname,
    password: hashedPassword,
    email: user.email,
    address: user.address,
    gender: user.gender,
    phone: user.phone,
    role: user.role || 'CUSTOMER',
    identification: user.identification || null,
    birthdate: user.birthdate || null
  };
};

export const mapDbUserToUser = (dbUser: DbUser): User => {
  return {
    id: dbUser.id,
    identification: dbUser.identification || null,
    password: dbUser.password!,
    email: dbUser.email,
    phone: dbUser.phone || null,
    address: dbUser.address || null,
    name: dbUser.name,
    surname: dbUser.surname,
    gender: dbUser.gender || null,
    role: dbUser.role,
    birthdate: dbUser.birthdate || null,
  };
};
