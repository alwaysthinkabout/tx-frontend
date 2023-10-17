import { useCountDown } from "@/utils/useCountDown";
import { Button, Form, Input, Toast } from "antd-mobile";
import { FormInstance } from "antd-mobile/es/components/form";
import React, { useState } from "react";
import './index.scss';
import { sendVerifyCode } from "@/services/login";

export const VerifyCode = (props: { form: FormInstance, onCodeTaskIdChange: (codeTaskId: string) => void }) => {
  const { form, onCodeTaskIdChange } = props;
  const [codeMessage, setCodeMessage] = useState("获取验证码");
  const { start, count, isdisable } = useCountDown(
    60,
    () => {
      setCodeMessage(`${count}s后重新获取`);
    },
    () => {
      setCodeMessage("获取验证码");
    }
  );

  const handleVerifyCode = async () => {
    const phone = form.getFieldValue('Account') || ''
    if (!phone) {
      Toast.show({ content: '请输入手机号' })
      return
    }
    const res = await sendVerifyCode({ Address: phone, AddressType: 'phone'});
    if (res.ResponseMetadata.Code === 0) {
      start();
      onCodeTaskIdChange(res?.Result?.BizID)
    } else {
      Toast.show({ content: res.ResponseMetadata.MessageCn })
    }
  }

  return <Form.Item
    label="验证码"
    name="VerificationCode"
    validateFirst
    rules={[
      { required: true, message: '请输入验证码' },
      { whitespace: true, message: '请输入验证码' },
    ]}
    extra={
      <Button className="extraPart" disabled={isdisable} onClick={handleVerifyCode}>
        <a className="text-gray-600">{codeMessage}</a>
      </Button>
    }
  >
    <Input placeholder="请输入验证码" clearable />
  </Form.Item>
}