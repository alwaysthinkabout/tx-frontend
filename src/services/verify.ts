import { request } from '@/utils/request';

export const getVerifyList = async ({
  PageNum,
  PageSize,
}: {
  PageNum: number;
  PageSize: number;
}) => {
  return request(
    '/api/v1/ListPendingReviewVip?Action=ListPendingReviewVip',
    'post',
    {
      PageNum,
      PageSize,
    }
  )
};

export const updateVerifyStatus = async ({
  UserID, 
  Status,
}: {
  UserID: number;
  Status: string;
}) => {
  return request(
    '/api/v1/ReviewVip?Action=ReviewVip',
    'post',
    {
      UserID,
      Status,
    }
  );
};