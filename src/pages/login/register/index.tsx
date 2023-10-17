import React, { useEffect, useState } from "react";
import classnames from "classnames";
import { history, useSearchParams } from "umi";
import { Button, Form, Input, Selector, Toast, ErrorBlock } from "antd-mobile";
import { EyeInvisibleOutline, EyeOutline } from "antd-mobile-icons"
import styles from "../index/index.less";
import { LOGIN_TYPE_TEXT } from "@/constants";
import { register } from "@/services/login";
import { VerifyCode } from "./VerifyCode";
import './index.scss';

export default function Page() {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [codeTaskId, setCodeTaskId] = useState('')
  const params = useSearchParams()[0];

  const judgeInvalid = () => {
    if (!params.get('price')) {
      Toast.show({ content: '二维码已失效，请重新向邀请人获取。' })
      return false
    }
    return true
  }

  const submit = async () => {
    // if (!judgeInvalid()) return
    form.validateFields().then(async (values) => {
      const { Account, Password, VerificationCode, IdentityID, Name } = values;
      setLoading(true);
      const res = await register({
        Address: Account,
        AddressType: 'phone',
        Password: Password,
        IdentityID,
        Price: Number(params.get('price')),
        Name,
        SuperiorID: Number(params.get('code')),
        BizID: codeTaskId,
        VerificationCode: VerificationCode
      });
      setLoading(false);
      if (res.ResponseMetadata.Code === 0) {
        Toast.show({ content: "注册成功。" })
        history.push('/login')
      } else {
        Toast.show({ content: res.ResponseMetadata.MessageCn })
      }
    })
  }

  if (Number(params.get('code'))) {
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
      <Form  layout="horizontal" form={form} initialValues={{ AccountType: ['phone'] }}>
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
            { required: true, message: '手机号不能为空' },
            { whitespace: true, message: '手机号不能为空' },
            { validator: (_, value) => {
              const trimValue = value?.trim() || ''
              //校验中国大陆手机号
              if (!/^1[3456789]\d{9}$/.test(trimValue)) {
                return Promise.reject('手机号格式不正确');
              }
              return Promise.resolve();
            }}
          ]}
        >
          <Input placeholder={`请输入${LOGIN_TYPE_TEXT}`} clearable />
        </Form.Item>
        <Form.Item
          label="密码"
          name="Password"
          validateFirst
          rules={[
            { required: true, message: '密码不能为空' },
            { whitespace: true, message: '密码不能为空' },
            { validator: (_, value) => {
              const trimValue = value?.trim() || ''
              //密码为6-20位
              if (trimValue.length < 6 || trimValue.length > 20) {
                return Promise.reject('密码长度为6-20位');
              }
              if (/[a-zA-Z]/.test(trimValue) && /\d/.test(trimValue)) {
                return Promise.resolve();
              } else {
                return Promise.reject('密码必须包含数字和字母');
              }
            }}
          ]}
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
        <VerifyCode form={form} onCodeTaskIdChange={(code) => setCodeTaskId(code)} />
        <Form.Item label="姓名" name="Name"
          validateFirst
          rules={[
            { required: true, message: '真实姓名不能为空' },
            { whitespace: true, message: '真实姓名不能为空' },
            { validator: (_, value) => {
              //校验真实姓名
              if (!/[\u4e00-\u9fa5]/.test(value)) {
                return Promise.reject('真实姓名必须为中文');
              }
              return Promise.resolve();
            }}
          ]}
        >
          <Input placeholder="请输入真实姓名" clearable />
        </Form.Item>
        <Form.Item
          label="身份证号" name="IdentityID"
          validateFirst
          rules={[
            { required: true, message: '身份证号不能为空' },
            { whitespace: true, message: '身份证号不能为空' },
            { validator: (_, value) => {
              //校验大陆身份证号
              if (!/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(value)) {
                return Promise.reject('身份证号格式不正确');
              }
              return Promise.resolve();
            }}
          ]}
          >
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
