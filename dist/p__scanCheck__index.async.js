"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[165],{57376:function(U,v,n){n.r(v),n.d(v,{default:function(){return r}});var D=n(25359),u=n.n(D),h=n(49811),i=n.n(h),c=n(54306),E=n.n(c),P=n(61351),p=n(98777),m=n(93236),o=n(40149),e=n(62086);function r(){var t=(0,o.TH)(),s=(0,m.useState)({}),_=E()(s,2),a=_[0],g=_[1],M=function(){var I=i()(u()().mark(function T(C){var d;return u()().wrap(function(l){for(;;)switch(l.prev=l.next){case 0:return l.prev=0,l.next=3,(0,P.jn)({QRCodeID:C});case 3:d=l.sent,d.ResponseMetadata.Code===0?g(d.Result):(g({}),p.FN.show({content:d.ResponseMetadata.MessageCn})),l.next=10;break;case 7:l.prev=7,l.t0=l.catch(0),g({});case 10:case"end":return l.stop()}},T,null,[[0,7]])}));return function(C){return I.apply(this,arguments)}}(),f=function(){window.wx.scanQRCode({needResult:1,scanType:["qrCode"],success:function(C){console.log("scan res",C);var d=C.resultStr;if(d&&typeof d=="string"){var R=d.match(/tkn=(.*)/);if(R&&R[1]){var l=R[1];M(l)}}}})};return(0,m.useEffect)(function(){t.pathname==="/scanCheck"&&f()},[t.pathname]),(0,e.jsxs)("div",{className:"bg-white p-4 product-result",children:["\u67E5\u770B\u8D27\u7269\u7ED3\u679C",(0,e.jsxs)("div",{className:"info",children:[(0,e.jsx)("span",{children:"\u4E8C\u7EF4\u7801ID"}),(0,e.jsx)("span",{children:a.QRCodeID})]}),(0,e.jsxs)("div",{className:"info",children:[(0,e.jsx)("span",{children:"\u5546\u54C1\u540D\u79F0"}),(0,e.jsx)("span",{children:a.ProductNameCn})]}),(0,e.jsxs)("div",{className:"info",children:[(0,e.jsx)("span",{children:"\u5F52\u5C5E\u4EBA"}),(0,e.jsx)("span",{children:a.UserName})]}),(0,e.jsxs)("div",{className:"info",children:[(0,e.jsx)("span",{children:"\u624B\u673A\u53F7"}),(0,e.jsx)("span",{children:a.UserPhone})]}),(0,e.jsx)("div",{className:"bottom",children:(0,e.jsx)(p.zx,{color:"primary",className:"btn-continue",onClick:function(){return f()},children:"\u7EE7\u7EED\u626B\u7801"})})]})}},61351:function(U,v,n){n.d(v,{Jl:function(){return p},Kf:function(){return P},jn:function(){return m},zc:function(){return E}});var D=n(25359),u=n.n(D),h=n(49811),i=n.n(h),c=n(73892),E=function(){var o=i()(u()().mark(function e(r){var t,s,_,a,g;return u()().wrap(function(f){for(;;)switch(f.prev=f.next){case 0:return t=r.Account,s=r.AccountType,_=r.UserStatus,a=r.PageNum,g=r.PageSize,f.abrupt("return",(0,c.W)("/api/v1/ListVip?Action=ListVip","post",{Account:t,AccountType:s,UserStatus:_,PageNum:a,PageSize:g}));case 2:case"end":return f.stop()}},e)}));return function(r){return o.apply(this,arguments)}}(),P=function(){var o=i()(u()().mark(function e(r){var t,s;return u()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return t=r.TargetUserID,s=r.QRCodeIDs,a.abrupt("return",(0,c.W)("/api/v1/Delivery?Action=Delivery","post",{TargetUserID:t,QRCodeIDs:s}));case 2:case"end":return a.stop()}},e)}));return function(r){return o.apply(this,arguments)}}(),p=function(){var o=i()(u()().mark(function e(r){var t,s;return u()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return t=r.TargetUserID,s=r.QRCodeIDs,a.abrupt("return",(0,c.W)("/api/v1/Return?Action=Return","post",{TargetUserID:t,QRCodeIDs:s}));case 2:case"end":return a.stop()}},e)}));return function(r){return o.apply(this,arguments)}}(),m=function(){var o=i()(u()().mark(function e(r){var t;return u()().wrap(function(_){for(;;)switch(_.prev=_.next){case 0:return t=r.QRCodeID,_.abrupt("return",(0,c.W)("/api/v1/GetProductDetail?Action=GetProductDetail&QRCodeID=".concat(t),"get"));case 2:case"end":return _.stop()}},e)}));return function(r){return o.apply(this,arguments)}}()},73892:function(U,v,n){n.d(v,{W:function(){return E}});var D=n(25359),u=n.n(D),h=n(49811),i=n.n(h),c=n(24933),E=function(){var P=i()(u()().mark(function p(m,o,e){var r;return u()().wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return s.prev=0,s.next=3,(0,c.Z)({url:m,method:o,data:e});case 3:return r=s.sent,s.abrupt("return",(r==null?void 0:r.data)||{ResponseMetadata:{Code:-1,MessageCn:"\u7F51\u7EDC\u9519\u8BEF\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5"}});case 7:return s.prev=7,s.t0=s.catch(0),console.error(s.t0),s.abrupt("return",{ResponseMetadata:{Code:-1,MessageCn:"\u7F51\u7EDC\u9519\u8BEF\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5"}});case 11:case"end":return s.stop()}},p,null,[[0,7]])}));return function(m,o,e){return P.apply(this,arguments)}}()}}]);