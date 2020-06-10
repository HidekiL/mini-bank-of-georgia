export interface UserResponseData {
  token: string;
  expirationDate: number;
  name: string;
  username: string;
  image: string;
}

export interface ClientResponseData {
  firstName: string;
  lastName: string;
  image: string;
  clientKey: number;
  sumAmount: number;
  plusPoints: number;
}

export interface AccountsResponseData {
  accountKey: number;
  accountName: string;
  clientFirstName: string;
  clientLastName: string;
  amount: number;
}
