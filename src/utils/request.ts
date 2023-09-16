import axios from "axios";

export const request = async (path: string, type: 'get' | 'post', data?: Record<string, unknown>) => {
  try {
    const res = await axios({
      url: path,
      method: type,
      data
    });
    return res?.data || {
      ResponseMetadata: {
        Code: -1,
        MessageCn: '网络错误，请稍后重试',
      }
    }
  } catch (e) {
    console.error(e);
    return {
      ResponseMetadata: {
        Code: -1,
        MessageCn: '网络错误，请稍后重试',
      }
    }
  }
}