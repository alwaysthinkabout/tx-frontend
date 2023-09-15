import { getVipList } from "@/services/scan";
import { SearchBar, List, Button, Toast, InfiniteScroll } from "antd-mobile";
import { useState } from "react";

export default function Page() {
  const [list, setList] = useState<any[]>([]);
  const [keyword, setKeyword] = useState('');
  const [pageInfo, setPageInfo] = useState({
    Total: 100,
    PageSize: 10,
    PageNum: 1,
 });

  const loadMore = async () => {
    const res = await getVipList({
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

  const handleSearch = async (keyword: string) => {
    const res = await getVipList({
      PageSize: 10,
      PageNum: 1,
      Account: keyword,
      AccountType: 'phone',
    });
    if (res.ResponseMetadata.Code === 0) {
      setPageInfo(res.Result.PageInfo);
      setList(res.Result.List || [])
    } else {
      Toast.show({ content: res.ResponseMetadata.MessageCn });
    }
  }

  const handleScan = (id: number) => {
    window.wx.scanQRCode({
      needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
      scanType: ["qrCode"], // 可以指定扫二维码还是一维码，默认二者都有
      success: function (res: any) {
        console.log('scan res', res);
        var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
      }
    })
  }

  return (
    <div className="bg-white p-4">
      <SearchBar onSearch={handleSearch} placeholder="按姓名手机号搜索" />
      <List className="mt-6">
        {list.map(item => (
          <List.Item key={item.UserID}>
            <div className="flex justify-between">
              <div>{item.UserName}</div>
              <div>{item.UserPhone}</div>
              <Button onClick={() => handleScan(item.UserID)}>扫货</Button>
            </div>
          </List.Item>
        ))}
      </List>
      <InfiniteScroll loadMore={loadMore} hasMore={pageInfo.Total > pageInfo.PageNum * pageInfo.PageSize} />
    </div>
  );
}
