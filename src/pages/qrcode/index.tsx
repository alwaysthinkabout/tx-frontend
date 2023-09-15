import { NoticeBar } from "antd-mobile";
import QRCode from "qrcode.react";
import { useEffect } from "react";

export default function Page() {

  useEffect(() => {
    // canvas to img
    const canvasImg = document.getElementsByTagName('canvas')[0];
    const aLink = document.createElement('img');
    aLink.src = canvasImg?.toDataURL();
    canvasImg.parentNode?.replaceChild(aLink, canvasImg);
  }, [])

  return (
    <div>
      <div className="text-center font-bold text-2xl mb-12 mt-6">{window.userInfo?.UserName}的邀请二维码</div>
      <div className="flex items-center justify-center">
        <QRCode value={`${location.origin}/login/register?code=${window.userInfo?.UserID}&name=${window.userInfo?.UserName}`} id="qrcode" />
      </div>
      <div className="mt-12">
        <NoticeBar content='长按二维码图片保存或截图保存二维码' color='info' />
      </div>
    </div>
  );
}
