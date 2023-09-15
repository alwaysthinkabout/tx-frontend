import { IApi } from 'umi';

export default (api: IApi) => {
  api.addHTMLHeadScripts(() => ({
    src: 'https://res.wx.qq.com/open/js/jweixin-1.6.0.js',
  }));
};