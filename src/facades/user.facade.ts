import * as UserRepository from '../repository/user.repository';
import { User } from '../models/user.type';

class UserFacade {
  async signIn(user: User) {
    try {
      return await UserRepository.signIn(user);
    } catch (error) {
      console.error(error);
      throw new Error('Error during sign-in process');
    }
  }

  async loginUser(email: string, password: string) {
    try {
      return await UserRepository.login(email, password);
    } catch (error) {
      console.error(error);
      throw new Error('Error during login process');
    }
  }

  async updateUser(user: User, newPassword: string) {
    try {
      return await UserRepository.update(user, newPassword);
    } catch (error) {
      console.error(error);
      throw new Error('Error during update process');
    }
  }

  getUserFromToken(token: string) {
    try {
      return UserRepository.getUser(token);
    } catch (error) {
      console.error(error);
      throw new Error('Error during getUserFromToken process');
    }
  }
}

export default new UserFacade();
