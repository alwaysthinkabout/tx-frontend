import { ErrorBlock } from "antd-mobile";

export default function Page() {
  return (
    <div>
      <ErrorBlock
        fullPage
        title={window.userInfo.Status === 'failed' ? '注册已被拒绝' : '注册审核中，请稍候'}
        description={window.userInfo.Status === 'failed' ? '请联系管理员处理' : '待会来试试'}
      />
    </div>
  );
}