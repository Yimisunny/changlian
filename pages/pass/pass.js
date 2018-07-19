const app = getApp()
Page({
  data: {
    isFocus: false,
    cont: '请输入6位交易密码',
    value: ''
  },
  set_wallets_password(e) {//获取钱包密码
    this.setData({
      wallets_password: e.detail.value
    });
    if (this.data.wallets_password.length == 6) {//密码长度6位时，自动验证钱包支付结果
      wallet_pay(this)
      this.setData({
        value: '',
        cont: '请再次输入密码',
        wallets_password: ''
      })
    }
  },
  set_Focus() {//聚焦input
    this.setData({
      isFocus: true
    })
  },
  set_notFocus() {//失去焦点
    this.setData({
      isFocus: false
    })
  }
})

// 钱包支付
let arr = [];
function wallet_pay(_this) {
  arr.push(_this.data.wallets_password)
  if (arr.length > 1) {
    if (arr[0] == arr[1]) {
      wx.request({
        url: 'http://47.96.77.123:8080/html/user/setPaymentKey?openId=' + app.globalData.num + '&paymentKey=' + arr[1],
        success: function (res) {
          wx.showModal({
            content: '支付密码设置成功',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                wx.navigateBack({
                  delta: 2
                })
              }
            }
          });
        }
      })
      arr = []
    } else {
      wx.showModal({
        content: '支付密码设置失败',
        showCancel: false,
        success: function (res) {
          console.log(res)
        }
      });
      arr = []
    }
  }
}