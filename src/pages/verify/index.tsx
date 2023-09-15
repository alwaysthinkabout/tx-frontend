import { getVerifyList, updateVerifyStatus } from "@/services/verify";
import { List, Button, InfiniteScroll, Toast } from "antd-mobile";
import { useState } from "react";

export default function Page() {
  const [list, setList] = useState<any[]>([]);
  const [pageInfo, setPageInfo] = useState({
    Total: 100,
    PageSize: 10,
    PageNum: 1,
 });

  const loadMore = async () => {
    const res = await getVerifyList({
      PageSize: pageInfo.PageSize,
      PageNum: pageInfo.PageNum,
    });
    if (res.ResponseMetadata.Code === 0) {
      setPageInfo(res.Result.PageInfo);
      setList(res.Result.List || [])
    } else {
      Toast.show({ content: res.ResponseMetadata.MessageCn });
    }
  }

  const handleClick = async (id: number, status: string) => {
    const res = await updateVerifyStatus({
      UserID: id,
      Status: status,
    });
    if (res.ResponseMetadata.Code === 0) {
      const prevList = [...list];
      const item = prevList.find(prev => prev.UserID === id);
      if (item) {
        item.Status = status;
      }
      setList(prevList);
    } else {
      Toast.show({ content: res.ResponseMetadata.MessageCn });
    }
  }

  return (
    <div className="bg-white p-4">
      <List className="mt-6">
        <List.Item key="title">
          <div className="flex justify-between font-bold">
            <div>姓名</div>
            <div style={{ width: 90, textAlign: 'center' }}>手机</div>
            <div>邀请人</div>
            <div style={{ width: 140, textAlign: 'center' }}>操作</div>
          </div>
        </List.Item>
        {list.map(item => (
          <List.Item key={item.UserID}>
            <div className="flex justify-between">
              <div>{item.UserName}</div>
              <div>{item.UserPhone || item.UserMail}</div>
              <div>{item.SuperiorName}</div>
              {!item.Status ?
                <div>
                  <Button size="small" color="primary" onClick={() => handleClick(item.UserID, 'passed')}>通过</Button>
                  <Button size="small" className="ml-3" onClick={() => handleClick(item.UserID, 'refused')}>不通过</Button>
                </div> :
                item.Status === 'passed' ?
                  <div style={{ width: 140, textAlign: 'center' }}>
                    <Button size="small" disabled>已通过</Button>
                  </div> :
                  <div style={{ width: 140, textAlign: 'center' }}>
                    <Button size="small" disabled>已拒绝</Button>
                  </div>
              }
            </div>
          </List.Item>
        ))}
      </List>
      <InfiniteScroll loadMore={loadMore} hasMore={pageInfo.Total > pageInfo.PageNum * pageInfo.PageSize} />
    </div>
  );
}
