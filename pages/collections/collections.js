const QRCode = require('../../utils/weapp-qrcode.js');
let qrcode;
let app = getApp();
Page({
  data: {
    bowl:'18622383061',
    address: '5a4s5d6as65d6as776sa87dad87a',
    filePath:null
  },
  onLoad: function (options) {
    if (app.globalData.username){
      this.setData({
        bowl: app.globalData.num.replace(app.globalData.num.substring(3, 7), '****'),
        address: app.globalData.username
      })
      qrcode = new QRCode('canvas', {
        text: this.data.address,
        width: 150,
        height: 150,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H,
      });
    }
  },
  // 复制地址
  openToast: function () {
    wx.setClipboardData({
      data: this.data.address,
      success: function (res) {
        wx.showToast({
          title: '已复制到粘贴板',
          icon: 'success',
          duration: 3000
        });
      }
    })
  }
})