Page({
  data: {
   time:3,
   money:'20'
  },
  onLoad: function (options) {
    let timer = setInterval(() => {
      if (this.data.time <= 1) {
        wx.reLaunch({
          url: '../property/property'
        })
        clearInterval(timer)
      }
      this.data.time--
      this.setData({
        time: this.data.time
      })
    }, 1000)
  }
})