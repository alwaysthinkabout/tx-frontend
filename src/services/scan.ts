import { request } from '@/utils/request';

export const getVipList = async ({
  Account,
  AccountType,
  UserStatus,
  PageNum,
  PageSize,
}: {
  Account?: string;
  AccountType?: "mail" | "phone" | "IDCard";
  UserStatus?: "review" | "passed";
  PageNum: number;
  PageSize: number;
}) => {
  return request(
    '/api/v1/ListVip?Action=ListVip',
    'post',
    {
      Account,
      AccountType,
      UserStatus,
      PageNum,
      PageSize,
    }
  )
};

export const deliveryProduct = async ({
  TargetUserID,
  QRCodeIDs,
}: {
  "TargetUserID": number; // 目标用户id
  "QRCodeIDs": string[];
}) => {
  return request(
    '/api/v1/Return?Action=Return',
    'post',
    {
      TargetUserID,
      QRCodeIDs,
    }
  )
};

export const returnProduct = async ({
  TargetUserID,
  QRCodeIDs,
}: {
  "TargetUserID": number; // 目标用户id
  "QRCodeIDs": string[];
}) => {
  return request(
    '/api/v1/Delivery?Action=Delivery',
    'post',
    {
      TargetUserID,
      QRCodeIDs,
    }
  )
};

export const getProductDetail = async ({
  QRCodeID,
}: {
  QRCodeID: string
}) => {
  return request(
    `/api/v1/GetProductDetail?Action=GetProductDetail&QRCodeID=${QRCodeID}`,
    'get',
  )
};
