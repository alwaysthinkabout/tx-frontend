import { getVerifyList, updateVerifyStatus } from "@/services/verify";
import { List, Button, InfiniteScroll, Toast } from "antd-mobile";
import { useState } from "react";

export default function Page() {
  const [list, setList] = useState<any[]>([]);
  const [pageInfo, setPageInfo] = useState({
    Total: 100,
    PageSize: 10,
    PageNum: 0,
 });

  const loadMore = async (_: boolean, pageNum?: number) => {
    const res = await getVerifyList({
      PageSize: pageInfo.PageSize,
      PageNum: pageNum || (pageInfo.PageNum + 1),
    });
    if (res.ResponseMetadata.Code === 0) {
      setPageInfo(res.Result.PageInfo);
      if (res.Result.List?.length > 0) {
        if (pageNum === 1) {
          setList(res.Result.List || [])
        } else {
          const uniqueIdSet = new Set(list.map(item => item.UserID))
          setList(list.concat(res.Result.List.filter((item: any) => !uniqueIdSet.has(item.UserID))) || list)
        }
      }
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

  const handleRefresh = async () => {
    loadMore(false, 1)
  }

  return (
    <div className="bg-white p-4">
      <List className="mt-6">
        <Button size="small" className="ml-3" onClick={handleRefresh}>刷新</Button>
        <List.Item key="title">
          <div className="flex justify-between font-bold">
            <div>姓名</div>
            <div style={{ width: 90, textAlign: 'center' }}>手机</div>
            <div style={{ width: 45, textAlign: 'center' }}>价格</div>
            <div>邀请人</div>
            <div style={{ width: 140, textAlign: 'center' }}>操作</div>
          </div>
        </List.Item>
        {list.map(item => (
          <List.Item key={item.UserID}>
            <div className="flex justify-between">
              <div>{item.UserName}</div>
              <div>{item.UserPhone || item.UserMail}</div>
              <div>{item.UserLevel}</div>
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
