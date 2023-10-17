import React, { useState } from "react";
import classnames from "classnames";
import { history } from "umi";
import { Button, Form, Input, Selector, Toast } from "antd-mobile";
import { EyeInvisibleOutline, EyeOutline } from "antd-mobile-icons"
import styles from "../index/index.less";
import { LOGIN_TYPE_TEXT } from "@/constants";
import { forgetPassword } from "@/services/login";
import { VerifyCode } from "../register/VerifyCode";

export default function Page() {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [codeTaskId, setCodeTaskId] = useState('')
  const [form] = Form.useForm();

  const submit = async () => {
    const value = form.getFieldsValue();
    setLoading(true);
    const res = await forgetPassword({
      Address: value.Account,
      AddressType: 'phone',
      NewPassword: value.NewPassword,
      VerificationCode: value.VerificationCode,
      BizID: codeTaskId
    });
    setLoading(false);
    if (res.ResponseMetadata.Code === 0) {
      Toast.show({ content: "重置密码成功。" })
      history.push('/login')
    } else {
      Toast.show({ content: res.ResponseMetadata.MessageCn });
    }
  }

  return (
    <div className="p-5">
      <h1 className={classnames(styles.header, "mb-12")}>忘记密码</h1>
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
          <VerifyCode form={form} onCodeTaskIdChange={(codeTaskId) => setCodeTaskId(codeTaskId)} />
          <Form.Item
            label="新密码"
            name="NewPassword"
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
              placeholder="请输入新密码"
              clearable
              type={visible ? "text" : "password"}
            />
          </Form.Item>
        </Form>
        <Button loading={loading} className="mt-12" block shape="rounded" color="primary" size="large" onClick={submit}>
          重置密码
        </Button>
    </div>
  );
}
