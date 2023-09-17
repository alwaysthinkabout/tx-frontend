import { NoticeBar, Radio, Button } from "antd-mobile";
import QRCode from "qrcode.react";
import { useEffect, useState } from "react";
import './index.scss';

export default function Page() {
  const [step, setStep] = useState(1)
  const [price, setPrice] = useState(190)

  useEffect(() => {
    // canvas to img
    if (step === 2) {
      const canvasImg = document.getElementsByTagName('canvas')[0];
      if (canvasImg) {
        const aLink = document.createElement('img');
        aLink.src = canvasImg?.toDataURL();
        canvasImg.parentNode?.replaceChild(aLink, canvasImg);
      }
    }
  }, [step])

  return (
    <div className="qrcode-page">
      {step === 2 &&
        <Button className="return-btn" onClick={() => setStep(1)}>返回</Button>
      }
      <div className="text-center font-bold text-2xl mb-8 mt-3">{window.userInfo?.UserName}的邀请二维码</div>
      { step === 1 ?<div className="price-content">
        <div className="title">价格</div>
        <Radio.Group onChange={(price) => setPrice(Number(price))} value={price}>
          {
            [190, 160, 135, 115, 95].map(value => <Radio value={value}>{value}</Radio>)
          }
        </Radio.Group>
        <Button className="product-qrcode-btn" color="primary" onClick={() => setStep(2)}>点击生成二维码</Button>
      </div> : null}
      { step === 2 ? <>
        <div className="flex items-center justify-center qrcode">
          {/* <QRCode value={`http://tongkang.soultrial.top/login/register?code=${window.userInfo?.UserID}&name=${window.userInfo?.UserName}&price=${price}`} id="qrcode" /> */}
          <QRCode value={`${location.origin}/login/register?code=${window.userInfo?.UserID}&name=${window.userInfo?.UserName}&price=${price}`} id="qrcode" />
        </div>
        <div className="mt-12">
          <NoticeBar content='长按二维码图片保存或截图保存二维码' color='info' />
        </div>
      </> : null}
    </div>
  );
}
