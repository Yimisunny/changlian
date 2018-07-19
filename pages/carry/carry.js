Page({
  data: {
    address:'',
    money:''
  },
  // 二维码扫描
  scan:function(){
    wx.scanCode({
      success: (res) => {
        console.log(res)
        this.setData({
          address:res.result
        })
      }
    })
  },
  //转账地址
  addresses:function(e){
    this.setData({
      address: e.detail.value
    })
  },
  //转账金额
  price:function(e){
    this.setData({
      money: e.detail.value
    })
  }
})