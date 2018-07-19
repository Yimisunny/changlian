// pages/pay/pay.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    btn:{
      type:String,
      value:''
    },
    address:{
      type: String,
      value: ''
    },
    money:{
      type: String,
      value: ''
    },
    key:{
      type: String,
      value: ''
    },
    url:{
      type:String,
      value:''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isFocus: false,//控制input 聚焦
    balance: 100,//余额
    actual_fee: 20,//待支付
    wallets_password_flag: false//密码输入遮罩
  },

  /**
   * 组件的方法列表
   */
  methods: {
    set_wallets_password(e) {//获取钱包密码
      this.setData({
        wallets_password: e.detail.value
      });
      if (this.data.wallets_password.length == 6) {//密码长度6位时，自动验证钱包支付结果
        wallet_pay(this)
      }
    },
    set_Focus() {//聚焦input
      console.log('isFocus', this.data.isFocus)
      this.setData({
        isFocus: true
      })
    },
    set_notFocus() {//失去焦点
      this.setData({
        isFocus: false
      })
    },
    close_wallets_password() {//关闭钱包输入密码遮罩
      this.setData({
        isFocus: false,//失去焦点
        wallets_password_flag: false,
      })
    },
    pay() {//去支付
      wx.request({
        url: 'http://47.96.77.123:8080/html/user/hasPaymentKey?openId=' + app.globalData.num,
        success:(res)=>{
          console.log(res)
          if(res.data){
            pay(this)
          }else{
            wx.showModal({
              content: '请先去设置密码',
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  wx.navigateTo({
                    url: '../../pages/transactionPass/transactionPass',
                  })
                }
              }
            });
          }
        }
      })
    }
  }
})
/*支付*/
function pay(_this) {
  let apikey = _this.data.apikey;
  let id = _this.data.id;
    // 钱包支付 输入密码
    console.log('钱包支付')
    _this.setData({
      wallets_password_flag: true,
      isFocus: true
    })
}
// 钱包支付
function wallet_pay(_this) {
  wx.request({
    url: 'http://47.96.77.123:8080/html/user/sendToken',
    method:'POST',
    data:{
      openId: app.globalData.num,
      paymentKey: _this.data.wallets_password,
      targetAccount: _this.properties.address, 
      amount: _this.properties.money
    },
    header:{
      'content-type':'application/x-www-form-urlencoded'
    },
    success:function(res){
      console.log(res)
      if (res.data.success) {
        wx.showToast({
          title: res.data.message,
          icon: 'success',
          duration: 3000
        });
        wx.reLaunch({
          url: _this.properties.url,
        })
      } else {
        wx.showToast({
          title: res.data.message,
          icon: 'success',
          duration: 3000
        });
      }
    }
  })
}