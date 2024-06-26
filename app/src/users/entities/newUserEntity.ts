import { randomUUID } from 'crypto';
import bcrypt from 'bcrypt';
import dayjs from 'dayjs';
import { UserItem } from './types/userTypes';
import { UserRolesEnum } from '../enums/UserRolesEnum';

export default class NewUserEntity {
  private id: string;

  private email: string;

  private password: string;

  private creation_date: number;

  private role: string;

  constructor(email: string, password: string) {
    this.id = randomUUID();
    this.email = email?.trim().toLowerCase();
    this.password = password;
    this.creation_date = dayjs().unix();
    this.role = UserRolesEnum.USER;
    this.validate();
    this.buildPassword();
  }

  get(): UserItem {
    return {
      id: this.id,
      email: this.email,
      role: this.role,
      password: this.password,
      creation_date: this.creation_date,
    };
  }

  private validate() {
    // Validate email
    if (!this.email) {
      throw new Error(
        JSON.stringify({ message: 'Email is required', status: 400 })
      );
    }
    // Validate password
    if (!this.password) {
      throw new Error(
        JSON.stringify({ message: 'Password is required', status: 400 })
      );
    }
  }

  private buildPassword() {
    this.password = bcrypt.hashSync(this.password, 10);
  }
}
