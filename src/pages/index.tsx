import { EditSFill, CheckCircleFill, EyeFill, InformationCircleFill, StarFill } from "antd-mobile-icons";
import Widget from "@/components/widget";
import { history } from "umi";
import { useContext, useEffect, useState } from "react";
import context from "@/models/user";

export default function HomePage() {
  const { userInfo } = useContext(context);
  const [isAdmin, setIsAdmim] = useState(false);

  useEffect(() => {
    setIsAdmim(userInfo.IsAdmin);
  }, [userInfo.IsAdmin]);

  return (
    <div className="p-5 flex justify-between flex-wrap">
      <Widget
        onClick={() => history.push('/scan')}
        icon={<EditSFill width={40} height={40} color="var(--adm-color-primary)" />}
        name="扫货"
      />
      <Widget
        onClick={() => history.push('/scanCheck')}
        icon={<EyeFill width={40} height={40} color="var(--adm-color-primary)" />}
        name="查看货物"
      />
      {
        isAdmin ? <Widget
          onClick={() => history.push('/verify')}
          icon={<CheckCircleFill width={40} height={40} color="var(--adm-color-primary)" />}
          name="新人审核"
        /> : null
      }
      <Widget
        onClick={() => history.push('/personal')}
        icon={<InformationCircleFill width={40} height={40} color="var(--adm-color-primary)" />}
        name="个人信息"
      />
      <Widget
        onClick={() => history.push('/personal/qrcode')}
        icon={<StarFill width={40} height={40} color="var(--adm-color-primary)" />}
        name="邀请码"
      />
      <Widget icon={null} name="" />
    </div>
  );
}
