const app = getApp()

Page({
  data: {
    countryCodes: ["+86", "+80", "+84", "+87"],
    countryCodeIndex: 0,
    account:{
      num:"",
      password:""
    },
    openid:""
  },
  //事件处理函数
  onLoad: function () {
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.record']) {
          wx.authorize({
            scope: 'scope.record',
            success() {
              // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
              wx.startRecord()
            }
          })
        }
      }
    })
    wx.login({
      success: function (res) {
        wx.getUserInfo({
          withCredentials:true,
          success:function(res){
            // console.log(res)
          }
        })
      }
    })
  },
  //手机号
  bindCountryCodeChange: function (e) {
    this.setData({
      countryCodeIndex: e.detail.value
    })
  }, 
  //下一步
  enter: function (e) {
    let myreg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
    if (this.data.account.num){
      if (!myreg.test(this.data.account.num)){
        wx.showToast({
          title: '手机号有误！',
          icon: 'success',
          duration: 1500
        })
        return false;
      } else{
        app.globalData.num = this.data.account.num
        wx.request({
          url: 'http://47.96.77.123:8080/html/user/getAccount?openId=' + this.data.account.num,
          success: function (res) {
            app.globalData.username = res.data.data
            wx.switchTab({
              url: '../property/property'
            })
          }
        })
      }
    } else{
      wx.showToast({
        title: '输入的手机号为空',
        icon: 'success',
        duration: 1500
      })
      return false;
    }
  },
  userNameInput:function(e){
    this.setData({
      account:{
        num: e.detail.value
      }
    })
  }
})
