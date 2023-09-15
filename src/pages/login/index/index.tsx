import React, { useEffect, useState } from "react";
import classnames from "classnames";
import { Link, history } from "umi";
import { Button, Form, Input, Selector, Toast } from "antd-mobile";
import { EyeInvisibleOutline, EyeOutline } from "antd-mobile-icons"
import styles from "./index.less";
import { LOGIN_TYPE_TEXT } from "@/constants";
import { login } from "@/services/login";
import { checkLoginStatus } from "@/utils/checkLoginStatus";

export default function Page() {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  // useEffect(() => {
  //   checkLoginStatus().then(res => {
  //     if (res) {
  //       history.push('/');
  //     }
  //   });
  // }, [])

  const submit = async() => {
    const value = form.getFieldsValue();
    setLoading(true);
    const res = await login({
      Account: value.Account,
      AccountType: 'phone',
      Password: value.Password
    });
    if (res.ResponseMetadata.Code === 0) {
      const loginStatusRes = await checkLoginStatus();
      setLoading(false);
      if (loginStatusRes === 'login') {
        history.push('/');
      } else if (loginStatusRes === 'review') {
        history.push('/login/review');
      } else {
        Toast.show({ content: '查询用户信息失败' });
      }
    } else {
      setLoading(false);
      Toast.show({ content: res.ResponseMetadata.MessageCn })
    }
  }
  return (
    <div className="p-5">
      <h1 className={classnames(styles.header, "mb-12")}>账号登录</h1>
        <Form layout="horizontal" form={form} initialValues={{ AccountType: ['phone'] }}>
          {/* <Form.Item label="登录类型" name="AccountType">
            <Selector options={[
              { label: "手机号", value: "phone" },
              { label: "邮箱", value: "mail" }
            ]} />
          </Form.Item> */}
          <Form.Item label={LOGIN_TYPE_TEXT} name="Account">
            <Input placeholder={`请输入${LOGIN_TYPE_TEXT}`} clearable />
          </Form.Item>
          <Form.Item
            label="密码"
            name="Password"
            extra={
              <div className={styles.eye}>
                {!visible ? (
                  <EyeInvisibleOutline onClick={() => setVisible(true)} />
                ) : (
                  <EyeOutline onClick={() => setVisible(false)} />
                )}
              </div>
            }
          >
            <Input
              placeholder="请输入密码"
              clearable
              type={visible ? "text" : "password"}
            />
          </Form.Item>
        </Form>
        <Button loading={loading} className="mt-12" block shape="rounded" color="primary" size="large" onClick={submit}>
          登录
        </Button>
        <div className="flex justify-between mt-5">
          <Link className="text-gray-400" to="/login/forget">忘记密码</Link>
          <Link className="text-gray-400" to="/login/register">立即注册</Link>
        </div>
    </div>
  );
}
