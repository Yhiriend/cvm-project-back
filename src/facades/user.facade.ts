//import * as UserRepository from '../repository/user.repository';
import UserRepository from "../repository/user.repository";
import { User } from "../models/user.type";

export default class UserFacade {
  constructor(private userRepository: UserRepository) {}

  async signIn(user: User) {
    try {
      return await this.userRepository.signIn(user);
    } catch (error) {
      console.error(error);
      throw new Error("Error during sign-in process");
    }
  }

  async loginUser(email: string, password: string) {
    try {
      return await this.userRepository.login(email, password);
    } catch (error) {
      console.error(error);
      throw new Error("Error during login process");
    }
  }

  async updateUser(user: User, newPassword: string) {
    try {
      return await this.userRepository.update(user, newPassword);
    } catch (error) {
      console.error(error);
      throw new Error("Error during update process");
    }
  }

  async getUserFromToken(token: string) {
    try {
      return await this.userRepository.getUser(token);
    } catch (error) {
      console.error(error);
      throw new Error("Error during getUserFromToken process");
    }
  }
}

