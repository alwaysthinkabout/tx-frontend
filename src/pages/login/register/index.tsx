import React, { useEffect, useState } from "react";
import classnames from "classnames";
import { history, useSearchParams } from "umi";
import { Button, Form, Input, Selector, Toast, ErrorBlock } from "antd-mobile";
import { EyeInvisibleOutline, EyeOutline } from "antd-mobile-icons"
import styles from "../index/index.less";
import { useCountDown } from "@/utils/useCountDown";
import { LOGIN_TYPE_TEXT } from "@/constants";
import { register } from "@/services/login";

export default function Page() {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [codeMessage, setCodeMessage] = useState("获取验证码");
  const [form] = Form.useForm();
  const params = useSearchParams()[0];

  const { start, count, isdisable } = useCountDown(
    60,
    () => {
      setCodeMessage(`${count}s后重新获取`);
    },
    () => {
      setCodeMessage("获取验证码");
    }
  );

  const judgeInvalid = () => {
    if (!params.get('price')) {
      Toast.show({ content: '二维码已失效，请重新向邀请人获取。' })
      return false
    }
    return true
  }

  const submit = async () => {
    if (!judgeInvalid()) return
    const value = form.getFieldsValue();
    setLoading(true);
    const res = await register({
      Address: value.Account,
      AddressType: 'phone',
      Password: value.Password,
      IdentityID: value.IdentityID,
      Price: Number(params.get('price')),
      Name: value.Name,
      SuperiorID: Number(params.get('code')),
    });
    setLoading(false);
    if (res.ResponseMetadata.Code === 0) {
      Toast.show({ content: "注册成功。" })
      history.push('/login')
    } else {
      Toast.show({ content: res.ResponseMetadata.MessageCn })
    }
  }

  const handleVerifyCode = () => {
    start();
    console.log('click!!!!!')
  }

  if (!Number(params.get('code'))) {
    return <div>
      <ErrorBlock
        fullPage
        title={"请使用微信扫邀请人二维码进行注册"}
        description=""
      />
      <Button className="mt-12" block shape="rounded" color="primary" size="large" onClick={() => history.push('/login')}>
        返回登录
      </Button>
    </div>
  }

  useEffect(() => {
    judgeInvalid()
  }, [])

  return (
    <div className="p-5">
      <h1 className={classnames(styles.header, "mb-12")}>账号注册</h1>
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
        {/* <Form.Item
          label="验证码"
          name="VerifyCode"
          extra={
            <Button className={styles.extraPart} disabled={isdisable} onClick={handleVerifyCode}>
              <a className="text-gray-600">{codeMessage}</a>
            </Button>
          }
        >
          <Input placeholder="请输入验证码" clearable />
        </Form.Item> */}
        <Form.Item label="姓名" name="Name">
          <Input placeholder="请输入真实姓名" clearable />
        </Form.Item>
        <Form.Item label="身份证号" name="IdentityID">
          <Input placeholder="请输入身份证号" clearable />
        </Form.Item>
        {/* <Form.Item label="进货价格" name="Price">
          <Selector defaultValue={[Number(params.get('price'))]} options={[190, 160, 135, 115, 95].map(item => ({ label: item, value: item }))} />
        </Form.Item> */}
        <Form.Item label="邀请人" name="invitename" initialValue={params.get('name')}>
          <Input placeholder="请扫邀请人二维码进行注册" clearable disabled />
        </Form.Item>
      </Form>
      <Button loading={loading} className="mt-12" block shape="rounded" color="primary" size="large" onClick={submit}>
        注册
      </Button>
    </div>
  );
}
