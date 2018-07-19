Page({
  data: {
    options:{}
  },
  onLoad: function (options) {
    console.log(options)
    this.setData({
      options:JSON.parse(options.content)
    })
  },
  jin:function(){
    wx.navigateTo({
      url: '../details/details?conent=' + JSON.stringify(options.options)
    })
  }
})