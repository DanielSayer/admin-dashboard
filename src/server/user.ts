import { mimicServerCall } from "./lib";

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
};

export const getUser = (): User | null => {
  const userFromStorage = localStorage.getItem("user");
  return userFromStorage ? JSON.parse(userFromStorage) : null;
};

export const createUser = async (req: {
  firstName: string;
  lastName: string;
  email: string;
}) => {
  const { firstName, lastName, email } = req;
  await mimicServerCall();

  const user: User = {
    id: crypto.randomUUID(),
    firstName,
    lastName,
    fullName: `${firstName} ${lastName}`,
    email,
  };

  localStorage.setItem("user", JSON.stringify(user));

  return user;
};

export const logOut = async (): Promise<void> => {
  localStorage.removeItem("user");
};
