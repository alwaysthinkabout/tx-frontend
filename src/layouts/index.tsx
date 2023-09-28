import { useEffect, useState } from "react";
import classNames from "classnames";
import { Outlet, history, useLocation } from "umi";
import { NavBar, Badge, TabBar  } from "antd-mobile";
import {
  AppOutline,
  UnorderedListOutline,
  UserOutline,
} from "antd-mobile-icons";
import { getTabBarKey } from '@/utils';
import styles from "./index.less";
import { checkLoginStatus } from "@/utils/checkLoginStatus";
import Context from '@/models/user';

export default function Layout() {
  const location = useLocation();
  const [activeKey, setActiveKey] = useState(getTabBarKey(location));
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    checkLoginStatus().then(res => {
      if (res === 'unlogin' && !location.pathname.includes('login')) {
        history.push('/login');
      } else if (res === 'review') {
        history.push('/login/review');
      } else if (res === 'login' && location.pathname === '/login') {
        history.push('/');
      }
      setUserInfo(window.userInfo || {});
      initWX(window.userInfo?.SigInfo);
      window.wx.ready(function(){
        console.log('wx ready');
      });
    });
  }, [location.pathname]);
  useEffect(() => {
    setActiveKey(getTabBarKey(location));
  }, [location.pathname]);

  const initWX = async (signInfo: any) => {
    if (window.wx && signInfo) {
      window.wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: signInfo.AppID, // 必填，公众号的唯一标识
        timestamp: signInfo.TimeStamp, // 必填，生成签名的时间戳
        nonceStr: signInfo.NonceStr, // 必填，生成签名的随机串
        signature: signInfo.Sig,// 必填，签名
        jsApiList: ['scanQRCode'],
      });
    }
  }

  const handleChange = (key: string) => {
    const nextLocation = tabs.find(item => item.key === key)?.location;
    if (nextLocation) {
      history.push(nextLocation);
    }
  }

  const tabs = [
    {
      key: "home",
      title: "首页",
      icon: <AppOutline />,
      badge: Badge.dot,
      location: '/',
    },
    {
      key: "scan",
      title: "扫货",
      icon: <UnorderedListOutline />,
      badge: "5",
      location: '/scan',
    },
    // {
    //   key: "verify",
    //   title: "审核",
    //   icon: <UnorderedListOutline />,
    //   badge: "5",
    //   location: '/verify',
    // },
    {
      key: "personal",
      title: "我的",
      icon: <UserOutline />,
      location: '/personal',
    },
  ]

  return (
    <div className={classNames(styles.navs, 'pb-14 h-screen bg-gray-100')}>
      <NavBar
        className="bg-white"
        onBack={() =>
          window.userInfo?.Status === 'passed' ?
            history.back() :
            history.push('/login')
        }
      >颐养同康</NavBar>
      <Context.Provider value={{ userInfo }}>
        <Outlet />
      </Context.Provider>
      {location.pathname.includes('login')
        ? null
        : (
            <TabBar safeArea className="fixed bottom-0 w-full bg-white" activeKey={activeKey} onChange={handleChange}>
              {tabs.map(item => (
                <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
              ))}
            </TabBar>
          )
      }
    </div>
  );
}
