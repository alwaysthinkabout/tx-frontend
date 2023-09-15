import { history } from 'umi';
import { List } from "antd-mobile";
import { logout } from '@/services/login';

export default function Page() {
  const handleLogout = () => {
    logout();
    history.push('/login');
  }

  return (
    <div>
      <List header="个人信息">
        <List.Item key="realname">
          <div className="flex justify-between">
            <div>姓名</div>
            <div>{window.userInfo?.UserName}</div>
          </div>
        </List.Item>
        <List.Item key="phone">
          <div className="flex justify-between">
            <div>手机号</div>
            <div>{window.userInfo?.Phone}</div>
          </div>
        </List.Item>
      </List>
      <List header="操作">
        <List.Item key="qrcode" onClick={() => history.push('/personal/qrcode')}>
          <div>邀请二维码</div>
        </List.Item>
        <List.Item key="logout" onClick={handleLogout}>
          <div>退出登录</div>
        </List.Item>
      </List>
    </div>
  );
}
