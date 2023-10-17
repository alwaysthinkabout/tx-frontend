import React, { useEffect, useState } from "react";
import classnames from "classnames";
import { Link, history } from "umi";
import { Button, Form, Input, Selector, Toast } from "antd-mobile";
import { EyeInvisibleOutline, EyeOutline } from "antd-mobile-icons"
import styles from "./index.less";
import { LOGIN_TYPE_TEXT } from "@/constants";
import { login } from "@/services/login";
import { checkLoginStatus } from "@/utils/checkLoginStatus";
import { VerifyCode } from "../register/VerifyCode";
import { verifyPhone } from "@/services/verify";
import './index.less'
export default function Page() {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [shouldShowVerifyCode, setShouldShowVerifyCode] = useState(false)
  const [codeTaskId, setCodeTaskId] = useState('')

  // useEffect(() => {
  //   checkLoginStatus().then(res => {
  //     if (res) {
  //       history.push('/');
  //     }
  //   });
  // }, [])
  const loginStatusLoading = async () => {
    const loginStatusRes = await checkLoginStatus();
    const { IsPhoneChecked } = window.userInfo
    if (!IsPhoneChecked) {
      setShouldShowVerifyCode(true)
    } else {
      if (loginStatusRes === 'login') {
        history.push('/');
      } else if (loginStatusRes === 'review') {
        history.push('/login/review');
      } else {
        Toast.show({ content: '查询用户信息失败' });
      }
    }
  }

  const submit = async() => {
    form.validateFields().then(async (values) => {
      const { Account, Password, VerificationCode } = values;
      setLoading(true);
      const value = form.getFieldsValue();
      let res
      if (shouldShowVerifyCode) {
        res = await verifyPhone({ Phone: Account, BizID: codeTaskId, VerificationCode });
        if (res.ResponseMetadata.Code === 0) {
          loginStatusLoading()
        }
      } else {
        res = await login({
          Account: Account,
          AccountType: 'phone',
          Password: Password
        });
        if (res.ResponseMetadata.Code === 0) {
          loginStatusLoading()
        }
      }
      if (res.ResponseMetadata.Code !== 0) {
        Toast.show({ content: res.ResponseMetadata.MessageCn })
      }
      setLoading(false);
    })
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
          <Form.Item
            label={LOGIN_TYPE_TEXT}
            name="Account"
            validateFirst
            rules={[
              { required: true, message: '请输入手机号' },
              { whitespace: true, message: '请输入手机号' },
              { validator: (_, value) => {
                //中国大陆手机号校验
                if (/^1[3456789]\d{9}$/.test(value)) {
                  return Promise.resolve();
                }
                return Promise.reject('手机号格式不正确');
              }}
            ]}
          >
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
            validateFirst
            rules={[
              { required: true, message: '密码不能为空' },
              { whitespace: true, message: '密码不能为空' },
            ]}
          >
            <Input
              placeholder="请输入密码"
              clearable
              type={visible ? "text" : "password"}
            />
          </Form.Item>
          {
            shouldShowVerifyCode && <VerifyCode form={form} onCodeTaskIdChange={(code) => setCodeTaskId(code)} />
          }
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
