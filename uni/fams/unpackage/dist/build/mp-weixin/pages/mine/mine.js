(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/mine/mine"],{"158f":function(e,t,n){"use strict";n.r(t);var o=n("d8de"),i=n("3a1a");for(var a in i)"default"!==a&&function(e){n.d(t,e,(function(){return i[e]}))}(a);var s,c=n("f0c5"),r=Object(c["a"])(i["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],s);t["default"]=r.exports},"3a1a":function(e,t,n){"use strict";n.r(t);var o=n("ab50"),i=n.n(o);for(var a in o)"default"!==a&&function(e){n.d(t,e,(function(){return o[e]}))}(a);t["default"]=i.a},"3f5f":function(e,t,n){"use strict";(function(e){n("9f33"),n("921b");o(n("66fd"));var t=o(n("158f"));function o(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},ab50:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n={data:function(){return{alreadyLogin:!1,isWX:!1,userInfo:null,userInfoServer:null,phone:"",code:"",text:"发送验证码",bindP:!1}},onShow:function(){var t=this;getApp().getCode()?this.alreadyLogin=!0:this.alreadyLogin=!1,e.onSocketMessage((function(e){t.getMessage(JSON.parse(e.data))})),this.isWX="devtools"===e.getSystemInfoSync().platform},methods:{getMessage:function(t){e.hideLoading();var n=t.msg,o=t.obj;"loginSuccess"==n?(getApp().setCode(o.loginCode),this.alreadyLogin=!0,e.showToast({icon:"success",title:"登陆成功"})):"loginError"==n?(this.alreadyLogin=!1,getApp().delCode(),e.showToast({icon:"none",title:"登陆失败"})):"vcodeError"==n?(this.alreadyLogin=!1,getApp().delCode(),e.showToast({icon:"none",title:"验证码错误"})):"bindPhone"==n?(getApp().globalData.openid=o.openid,this.isWX=!1,this.bindP=!0,e.showToast({icon:"none",title:"请绑定手机"})):"bindPhoneSuccess"==n?(getApp().sendSocket("login",{code:getApp().globalData.openid}),e.showToast({icon:"success",title:"绑定成功"})):"vcode"==n&&(this.code=o.vcode)},barTo:function(e){var t=e.currentTarget.dataset.name;"scan"==t?getApp().scan():getApp().barTo(t)},login:function(){var e=this.phone,t=this.code;this.bindP?getApp().sendSocket("bindPhone",{phone:e,vcode:t,openid:getApp().globalData.openid}):getApp().sendSocket("login",{code:e,vcode:t})},setPhone:function(e){this.phone=e.detail.value},setCode:function(e){this.code=e.detail.value},sendVcode:function(e){var t=this;if("发送验证码"==this.text){getApp().sendSocket("sendVcode",{phone:this.phone});var n=60;this.text="重新发送(".concat(n,")");var o=setInterval((function(){n-=1,t.text="重新发送(".concat(n,")"),n<=0&&(clearInterval(o),t.text="发送验证码")}),1e3)}},oauth:function(){e.login({provider:"weixin",success:function(t){var n=t.code;getApp().sendSocket("login",{code:n}),e.getUserInfo({provider:"weixin",success:function(e){},fail:function(){e.showToast({icon:"none",title:"登陆失败"})}})},fail:function(e){console.error("授权登录失败："+JSON.stringify(e))}})},getUserInfo:function(t){var n=t.detail;n.userInfo?(this.userInfo=n.userInfo,getApp().globalData.userInfo=n.userInfo):e.showToast({icon:"none",title:"登陆失败"})},logout:function(){getApp().sendSocket("logout"),this.alreadyLogin=!1}}};t.default=n}).call(this,n("543d")["default"])},d8de:function(e,t,n){"use strict";var o,i=function(){var e=this,t=e.$createElement;e._self._c},a=[];n.d(t,"b",(function(){return i})),n.d(t,"c",(function(){return a})),n.d(t,"a",(function(){return o}))}},[["3f5f","common/runtime","common/vendor"]]]);