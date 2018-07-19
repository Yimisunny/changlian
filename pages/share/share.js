const app = getApp()
Page({
  data: {
    bagNumber:'',
    bool:true,
    name:"",
    targetAddress:'',
    num:''
  },
  onLoad:function(option){
    console.log(option)
    let that = this;
    if (option.targetAddress){
      this.setData({
        bagNumber: option.bagNumber,
        targetAddress: option.targetAddress,
        name: option.name,
        num:option.num,
        bool:false
      })
    }else{
      wx.getUserInfo({
        success: function (res) {
          that.setData({
            name: res.userInfo.nickName
          })
        }
      })
      this.setData({
        bagNumber: option.bagNumber,
        targetAddress: app.globalData.username,
        name: this.data.name,
        num: app.globalData.num,
        bool: false
      })
    }
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '糖包',
      path: '/pages/share/share?bagNumber=' + this.data.bagNumber + "&targetAddress=" + app.globalData.username + "&name=" + this.data.name + "&num=" + app.globalData.num
    }
  },
  open:function(){
    // 已经授权，可以直接调用 getUserInfo 获取头像昵称
    let that = this;
    console.log(that.data.num, that.data.targetAddress, that.data.bagNumber)
    wx.request({
      url: 'http://47.96.77.123:8080/html/user/openBag',
      method:'POST',
      data:{
        openId: app.globalData.num,
        targetAddress: that.data.targetAddress, 
        bagNumber: that.data.bagNumber
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success:function(res){
        console.log(res,1)
        if (res.data.success){
          wx.showToast({
            title: res.data.message,
            icon: 'info',
            duration: 3000
          });
          // let timer = setTimeout(function(){
          //   wx.request({
          //     url: 'http://47.96.77.123:8080/html/user/getReceivedMoney',
          //     method: 'POST',
          //     data: {
          //       openId: app.globalData.num,
          //       targetAddress: that.data.targetAddress,
          //       bagNumber: that.data.bagNumber
          //     },
          //     header: {
          //       'content-type': 'application/x-www-form-urlencoded'
          //     },
          //     success: function (res) {
          //       console.log(res,2)
          //       if(res.data.success){
          //         wx.showToast({
          //           title: '您收到' + JSON.stringify(res.data.data),
          //           icon: 'success',
          //           duration: 3000
          //         });
          //       }else{
                  
          //       }
          //     }
          //   })
          //   clearInterval(timer)
          // },2000)
        }else{
          wx.showToast({
            title: res.data.message,
            icon: 'info',
            duration: 3000
          });
        }
      }
    })
  },
  //显示对话框
  openAlert: function () {
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },
  //隐藏对话框
  hideModal: function () {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    }),
      setTimeout(function () {
        animation.translateY(0).step()
        this.setData({
          animationData: animation.export(),
          showModalStatus: false
        })
      }.bind(this), 200)
  },
  //查询余额
  cha:function(){
    wx.reLaunch({
      url: '../property/property',
    })
  }
})