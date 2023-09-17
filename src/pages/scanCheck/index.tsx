import { getProductDetail } from "@/services/scan";
import { Button, Toast } from "antd-mobile";
import { useEffect, useState } from "react";
import { useLocation } from "umi";
import './index.scss'

export default function Page() {
  const location = useLocation();
  const [productInfo, setProductInfo] = useState<{ QRCodeID?: string;
    ProductNameCn?: string; UserName?: string; UserPhone?: string;  }>({});
  const getProductInfo = async (QRCodeID: string) => {
    try {
      const res = await getProductDetail({ QRCodeID})
      if (res.ResponseMetadata.Code === 0) {
        setProductInfo(res.Result)
      } else {
        setProductInfo({})
        Toast.show({ content: res.ResponseMetadata.MessageCn });
      }
    } catch (_) {
      setProductInfo({})
    }
  }

  const scan = () => {
    window.wx.scanQRCode({
      needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
      scanType: ["qrCode"], // 可以指定扫二维码还是一维码，默认二者都有
      success: function (res: any) {
        console.log('scan res', res);
        var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
        if (result && typeof result === 'string') {
          let matchRegArr = result.match(/tkn=(.*)/)
          if (matchRegArr && matchRegArr[1]) {
            const tkn = matchRegArr[1]
            getProductInfo(tkn)
          }
        }
      }
    })
  }
  useEffect(() => {
    if (location.pathname === '/scanCheck') {
      scan()
    }
  }, [location.pathname])

  return (
    <div className="bg-white p-4 product-result">
      查看货物结果
      <div className="info">
        <span>二维码ID</span>
        <span>{productInfo.QRCodeID }</span>
      </div>
      <div className="info">
        <span>商品名称</span>
        <span>{productInfo.ProductNameCn  }</span>
      </div>
      <div className="info">
        <span>归属人</span>
        <span>{productInfo.UserName }</span>
      </div>
      <div className="info">
        <span>手机号</span>
        <span>{productInfo.UserPhone}</span>
      </div>
      <div className="bottom">
        <Button color="primary" className="btn-continue" onClick={() => scan()}>继续扫码</Button>
      </div>
    </div>
  );
}
