import { request } from '@/utils/request';

export const sendVerifyCode = async ({
  Address,
  AddressType,
}: {
  Address: string;
  AddressType: 'phone' | 'mail';
}) => {
  return request(
    '/api/v1/SendVerificationCode?Action=SendVerificationCode',
    'post',
    {
      Address,
      AddressType,
    }
  )
};

export const login = async ({
  Account,
  AccountType,
  Password,
}: {
  Account: string;
  AccountType: 'phone' | 'mail' | 'IDCard';
  Password: string;
}) => {
  return request(
    '/api/v1/Login?Action=Login',
    'post',
    {
      Account,
      AccountType,
      Password,
    }
  );
};

export const checkLoginStatusRequest = async () => {
  const path = location.href.split('#')[0];
  return request(
    `/api/v1/CheckLoginStatus?Action=CheckLoginStatus&AuthUrl=${path}`,
    'get',
  );
}

export const register = async ({
  Address,
  AddressType,
  Password,
  IdentityID,
  Name,
  Price,
  SuperiorID,
  VerificationCode,
  BizID,
} : {
  Address: string;
  AddressType: 'phone' | 'mail'
  Password: string;
  IdentityID: string;
  Name: string;
  Price: number;
  SuperiorID: number;
  VerificationCode?: string;
  BizID?: string;
}) => {
  return request(
    '/api/v1/Register?Action=Register',
    'post',
    {
      Address,
      AddressType,
      Password,
      IdentityID,
      Price,
      Name,
      SuperiorID,
      VerificationCode,
      BizID,
    }
  )
}

export const forgetPassword = async ({
  Address,
  AddressType,
  NewPassword,
  VerificationCode,
  BizID,
} : {
  Address: string;
  AddressType: 'phone' | 'mail'
  NewPassword: string;
  VerificationCode?: string;
  BizID?: string;
}) => {
  return request(
    '/api/v1/UpdatePassword?Action=UpdatePassword',
    'post',
    {
      Address,
      AddressType,
      NewPassword,
      VerificationCode,
      BizID,
    }
  )
}

export const logout = async () => {
  return request(
    '/api/v1/LoginOut?Action=LoginOut',
    'post',
  );
}