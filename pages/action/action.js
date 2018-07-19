var app = getApp();
Page({
  data: {
    canvasHidden: true, //设置画板的显示与隐藏，画板不隐藏会影响页面正常显示
    avatarUrl: '', //用户头像
    nickName: '',  //用户昵称
    wxappName: app.globalData.wxappName, //小程序名称
    shareImgPath: '',
    screenWidth: '',  //设备屏幕宽度
    description: app.globalData.description, //奖品描述
    FilePath: '' //头像路径
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
  onLoad:function(options){
    var that = this
    var userInfo, nickName, avatarUrl
    //获取用户信息，头像，昵称之类的数据
    wx.getUserInfo({
      success: function (res) {
        console.log(res);
        userInfo = res.userInfo
        nickName = userInfo.nickName
        avatarUrl = userInfo.avatarUrl
        that.setData({
          avatarUrl: res.userInfo.avatarUrl,
          nickName: res.userInfo.nickName,
        })
        wx.downloadFile({
          url: res.userInfo.avatarUrl
        })
      }
    })
    //获取用户设备信息，屏幕宽度
    wx.getSystemInfo({
      success: res => {
        that.setData({
          screenWidth: res.screenWidth
        })
        console.log(that.data.screenWidth)
      }
    })
  },
  saveImageToPhotosAlbum:function () {
    wx.showLoading({
      title: '保存中...',
    })
    var that = this;
    //设置画板显示，才能开始绘图
    that.setData({
      canvasHidden: false
    })
    var unit = that.data.screenWidth / 375
    var path1 = "../images/bg3.png"
    var avatarUrl = that.data.avatarUrl
    console.log(avatarUrl + "头像")
    var path2 = "../images/award.png"
    var path3 = "../images/qrcode.png"
    var path4 = "../images/headborder.png"
    var path5 = "../images/border.png"
    var unlight = "../images/unlight.png"
    var nickName = that.data.nickName
    console.log(nickName + "昵称")
    var context = wx.createCanvasContext('share')
    var description = that.data.description
    var wxappName = "来「 " + that.data.wxappName + " 」试试运气"
    context.drawImage(path1, 0, 0, unit * 375, unit * 462.5)
    //   context.drawImage(path4, unit * 164, unit * 40, unit * 50, unit * 50)
    context.drawImage(path2, unit * 48, unit * 120, unit * 280, unit * 178)
    context.drawImage(path5, unit * 48, unit * 120, unit * 280, unit * 178)
    context.drawImage(unlight, unit * 82, unit * 145, unit * 22, unit * 32)
    context.drawImage(unlight, unit * 178, unit * 145, unit * 22, unit * 32)
    context.drawImage(unlight, unit * 274, unit * 145, unit * 22, unit * 32)
    context.drawImage(unlight, unit * 82, unit * 240, unit * 22, unit * 32)
    context.drawImage(unlight, unit * 178, unit * 240, unit * 22, unit * 32)
    context.drawImage(unlight, unit * 274, unit * 240, unit * 22, unit * 32)
    context.drawImage(path3, unit * 20, unit * 385, unit * 55, unit * 55)
    //   context.drawImage(path4, 48, 200, 280, 128)
    context.setFontSize(14)
    context.setFillStyle("#999")
    context.fillText("长按识别小程序", unit * 90, unit * 408)
    context.fillText(wxappName, unit * 90, unit * 428)
    //把画板内容绘制成图片，并回调 画板图片路径
    context.draw(false, function () {
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        width: unit * 375,
        height: unit * 462.5,
        destWidth: unit * 375,
        destHeight: unit * 462.5,
        canvasId: 'share',
        success: function (res) {
          that.setData({
            shareImgPath: res.tempFilePath
          })
          if (!res.tempFilePath) {
            wx.showModal({
              title: '提示',
              content: '图片绘制中，请稍后重试',
              showCancel: false
            })
          }
          console.log(that.data.shareImgPath)
          //画板路径保存成功后，调用方法吧图片保存到用户相册
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            //保存成功失败之后，都要隐藏画板，否则影响界面显示。
            success: (res) => {
              console.log(res)
              wx.hideLoading()
              that.setData({
                canvasHidden: true
              })
            },
            fail: (err) => {
              console.log(err)
              wx.hideLoading()
              that.setData({
                canvasHidden: true
              })
            }
          })
        }
      })
    });
  }
})