import { StatusCodes } from 'http-status-codes';
import dotenv from 'dotenv';
import Database from '../../resources/database/Database';
import NewUserEntity from './entities/newUserEntity';
import ExistingUserEntity from './entities/existingUserEntity';
import CustomException from '../errors/CustomException';
import ErrorMessagesEnum from '../errors/enums/ErrorMessagesEnum';
import { UserItem } from './entities/types/userTypes';

dotenv.config();

const database = Database(process.env.DB_NAME);

const usersTable = process.env.USER_TABLE_NAME;

export async function getUsers() {
  try {
    const Table = database.getTable(usersTable ?? '');
    const Users = (await Table.scan()) as UserItem[];

    if (!Users || !Users.length) {
      throw new CustomException(
        ErrorMessagesEnum.TABLE_IS_EMPTY,
        StatusCodes.CONFLICT
      ).handle();
    }

    return Users.map((User) => new ExistingUserEntity(User).get());
  } catch (error) {
    if (error instanceof CustomException) {
      throw error;
    }

    throw new CustomException(
      error.message,
      StatusCodes.INTERNAL_SERVER_ERROR
    ).handle();
  }
}

export async function getUserProfile(payload: { id: string }) {
  const Table = database.getTable(usersTable ?? '');
  const User = await Table.getItem(payload.id);

  if (!User) {
    throw new CustomException(
      ErrorMessagesEnum.USER_NOT_FOUND,
      StatusCodes.NOT_FOUND
    ).handle();
  }

  const userProfile = new ExistingUserEntity(User).get();

  return userProfile;
}

export async function getUserByEmail(payload: { email: string }) {
  const Table = database.getTable(usersTable ?? '');
  const User = await Table.findItems({ email: payload.email });

  return User?.[0];
}

export async function createUser(userData) {
  const Table = database.getTable(usersTable ?? '');
  const User = new NewUserEntity(userData.email, userData.password).get();

  if (await getUserByEmail(User)) {
    throw new CustomException(
      ErrorMessagesEnum.USER_ALREADY_EXISTS,
      StatusCodes.CONFLICT
    ).handle();
  }

  await Table.addItem(User.id, User);

  return new ExistingUserEntity(User).get();
}
