export type UserItem = {
  id: string;
  email: string;
  password: string;
  creation_date: number;
  role: string;
};

export type UserProfile = Omit<UserItem, 'password'>;
