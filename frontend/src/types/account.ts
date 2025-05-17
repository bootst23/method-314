export interface Account {
  id: number;
  username: string;
  password: string;
  profile: string;
  suspended: number;
}

export interface AccountResponse {
  user: Account;
}

export interface CreateAccount {
  username: string;
  password: string;
  profile: string;
  suspended: number;
}

export enum Role {
  ADMIN = "useradmin",
  CLEANER = "cleaner",
  HOMEOWNER = "homeowner",
  PLATFORMMANAGER = "platformmanager",
}
