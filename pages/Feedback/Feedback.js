Page({
  data: {
    bool:true,
    time:3
  },
  submit:function () {
    this.setData({
      bool:false
    })
    let timer = setInterval(()=>{
      this.data.time--
      this.setData({
        time: this.data.time
      })
      if(this.data.time<=0){
        clearInterval(timer)
        wx.navigateBack({
          delta:1
        })
      }
    },1000)
  }
})