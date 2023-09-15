import { useEffect } from "react";
import { useLocation } from "umi";

export default function Page() {
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === '/scanCheck') {
      window.wx.scanQRCode({
        needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType: ["qrCode"], // 可以指定扫二维码还是一维码，默认二者都有
        success: function (res: any) {
          console.log('scan res', res);
          var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
        }
      })
    }
  }, [location.pathname])

  return (
    <div className="bg-white p-4">
      查看货物结果
    </div>
  );
}
