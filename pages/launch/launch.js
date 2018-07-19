Page({
  data: {
    bool:true,
    price:{
      totalMoney:"0.000000",
      number:'',
      extraInfo:''
    }
  },
  change:function () {
    this.setData({
      bool:!this.data.bool
    })
  },
  // 双向数据绑定
  chang:function (e) {
    if (e.detail.value){
      set(this, e.detail.value, this.data.price.extraInfo, this.data.price.number)
    }else{
      set(this, "", this.data.price.extraInfo, this.data.price.number)
    }
  },
  extra:function(e){
    if (e.detail.value) {
      set(this, this.data.price.totalMoney, e.detail.value, this.data.price.number)
    } else {
      set(this, this.data.price.totalMoney, "", this.data.price.number)
    }
  },
  num: function (e) {
    if (e.detail.value) {
      set(this, this.data.price.totalMoney, this.data.price.extraInfo, e.detail.value)
    } else {
      set(this, this.data.price.totalMoney, this.data.price.extraInfo, "")
    }
  }
})
function set(that, totalMoney, extraInfo, number){
  that.setData({
    price: {
      totalMoney: totalMoney,
      extraInfo: extraInfo,
      number: number
    }
  })
}