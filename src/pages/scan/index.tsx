import { deliveryProduct, getVipList, returnProduct } from "@/services/scan";
import { SearchBar, List, Button, Toast, InfiniteScroll, Modal, Input, Radio } from "antd-mobile";
import { useEffect, useRef, useState } from "react";
import './index.scss'
export default function Page() {
  const [list, setList] = useState<any[]>([
  //   {
  //     "UserID": 2313,
  //     "UserName": "test",
  //     "UserPhone": "13444444444",
  //     "UserIDCardNo": "123",
  //     "UserLevel": 190,
  //     "SuperiorName": "李大嘴",
  //     "IsForbiddenScan": true
  // }
  ]);
  const [scanCount, setScanCount] = useState(1);
  const [scanId, setScanId] = useState(0);
  const [keyword, setKeyword] = useState('');
  const [isDelivery, setIsDelivery] = useState(true);
  const [modalVisible, setModalVisible] = useState(false)
  const [errorModalVisible, setErrorModalVisible] = useState(false)
  const [pageInfo, setPageInfo] = useState({
    Total: 100,
    PageSize: 10,
    PageNum: 0,
 });

  const loadMore = async () => {
    const res = await getVipList({
      PageSize: pageInfo.PageSize,
      PageNum: pageInfo.PageNum + 1,
    });
    if (res.ResponseMetadata.Code === 0) {
      setPageInfo(res.Result.PageInfo);
      if (res.Result.List?.length > 0) {
        setList(list.concat(res.Result.List) || list)
      }
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

  const errorModal = (param?: { id: string; errorMsg: string }) =>  Modal.alert({
    title: '错误信息',
    className: 'error-info-modal',
    content: <div className="error-info-content">
      <div className="error-line"><span>Log ID</span><span>{param?.id}</span></div>
      <div className="error-line"><span>错误信息</span><span>{param?.errorMsg}</span></div>
    </div>,
    showCloseButton: true
  })

  const deliveryAction = (TargetUserID: number, scanCount?: number) => {
    const scanFunc = (scanCount?: number) => window.wx.scanQRCode({
      needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
      scanType: ["qrCode"], // 可以指定扫二维码还是一维码，默认二者都有
      success: async function (res: any) {
        console.log('scan res', res);
        var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
        if (result && typeof result === 'string') {
          let matchRegArr = result.match(/tkn=(.*)/)
          if (matchRegArr && matchRegArr[1]) {
            const tkn = matchRegArr[1]
            try {
              const res = await deliveryProduct({ TargetUserID, QRCodeIDs: [tkn]})
              if (res.ResponseMetadata.Code === 0) {
                Toast.show({ content: '发货成功' });
                if (scanCount && scanCount > 1) {
                  setTimeout(() => scanFunc(scanCount - 1), 1000)
                }
              } else {
                errorModal({ id: res.ResponseMetadata.RequestID, errorMsg: res.ResponseMetadata.MessageCn })
              }
            } catch (e) {
              Toast.show({ content: '发货失败' });
            }
          }
        }
      }
    })
    scanFunc(scanCount)
  }


  const returnAction = (TargetUserID: number, scanCount?: number) => {
    const scanFunc = (scanCount?: number) => window.wx.scanQRCode({
      needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
      scanType: ["qrCode"], // 可以指定扫二维码还是一维码，默认二者都有
      success: async function (res: any) {
        console.log('scan res', res);
        var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
        if (result && typeof result === 'string') {
          let matchRegArr = result.match(/tkn=(.*)/)
          if (matchRegArr && matchRegArr[1]) {
            const tkn = matchRegArr[1]
            try {
              const res = await returnProduct({ TargetUserID, QRCodeIDs: [tkn] })
              if (res.ResponseMetadata.Code === 0) {
                Toast.show({ content: '退货成功' });
                if (scanCount && scanCount > 1) {
                  setTimeout(() => scanFunc(scanCount - 1), 1000)
                }
              } else {
                errorModal({ id: res.ResponseMetadata.RequestID, errorMsg: res.ResponseMetadata.MessageCn })
              }
            } catch (e) {
              Toast.show({ content: '退货失败' });
            }
          }
        }
      }
    })
    scanFunc(scanCount)
  }

  const handleScan = (id: number) => {
    setScanId(id)
    setScanCount(1)
    setIsDelivery(true)
    setModalVisible(true)
  }

  return (
    <div className="bg-white p-4 scan-page">
      <div className="header">
        <SearchBar onChange={val => setKeyword(val)} onSearch={handleSearch} placeholder="输入手机号搜索" className="search-bar" />
        <Button onClick={() => handleSearch(keyword)}>搜索</Button>
      </div>
      <div className="ml-3" style={{ color: '#999' }}>手机号为空时，可查看所有直推。</div>
      <List className="mt-6">
        {list.map(item => (
          <List.Item key={item.UserID}>
            <div className="flex justify-between">
              <div>{item.UserName}</div>
              <div>{item.UserPhone}</div>
              <Button disabled={item?.IsForbiddenScan} onClick={() => handleScan(item.UserID)}>扫货</Button>
            </div>
          </List.Item>
        ))}
      </List>
      <InfiniteScroll loadMore={loadMore} hasMore={pageInfo.Total > pageInfo.PageNum * pageInfo.PageSize} />
      <Modal
        visible={modalVisible}
        title="扫货"
        showCloseButton
        closeOnMaskClick
        onClose={() => setModalVisible(false)}
        content={<div className="sao-ma-modal">
        <div className="title">输入货物数量，选择发货或退货，点击扫码。</div>
        <div className="count">
          <span>货物数量</span>
          <Input type="number" value={scanCount ? scanCount.toString() : ''} placeholder="1 - 13" onChange={(val) => {
              if (!val) {
                setScanCount(0)
                return
              }
              const count = Number(val) || 0
              if (count < 1) {
                setScanCount(1)
              } else if (count > 13) {
                setScanCount(13)
              } else {
                setScanCount(count)
              }
            }
          }/>
        </div>
        <div className="is-delivery">
          <Radio.Group value={isDelivery ? '1' : '2'} onChange={(val: any) => setIsDelivery(val === '1')}>
            <Radio value="1">发货</Radio>
            <Radio value="2">退货</Radio>
          </Radio.Group>
        </div>
          <Button className="scan-act" color="primary" onClick={() => {
            if (isDelivery) {
              deliveryAction(scanId, scanCount)
            } else {
              returnAction(scanId, scanCount)
            }
          }}>扫码</Button>
      </div>}
      />
    </div>
  );
}
