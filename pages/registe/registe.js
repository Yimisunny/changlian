Page({
  data: {
    countryCodes: ["+86", "+80", "+84", "+87"],
    countryCodeIndex: 0,
    account: {
      num: "",
      password: ""
    },
    array: ['美国', '中国', '巴西', '日本'],
    index: 0,
    sel:'选择国家'
  },
  bindCountryCodeChange: function (e) {
    console.log('picker country code 发生选择改变，携带值为', e.detail.value);
    this.setData({
      countryCodeIndex: e.detail.value
    })
  },
  //下一步
  enter: function () {
    console.log(1)
    wx.navigateTo({
      url: '../loginPass/loginPass'
    })
  },
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value,
      sel: this.data.array[e.detail.value]
    })
  }
})
