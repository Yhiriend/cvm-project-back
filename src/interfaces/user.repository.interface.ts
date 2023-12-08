import { User } from "../models/user.type";

export interface UserRepository {
    login(email: string, password: string): Promise<any>;
    signIn(user: User): Promise<any>;
    update(user: User, newPassword: string): Promise<any>;
    getUser(token: string): Promise<any | null>;
  }
  