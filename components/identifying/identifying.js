// components/identifying/identifying.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    url:{
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    phoneNumber: "",
    reget: false,
    topTips: false,
    code_isFocus: true,//控制input 聚焦
    code: [],
    focus_status: [],
    length: 0,//已经输入的长度
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //验证码输入时获取验证码
    get_code(e) {
      var that = this;
      that.setData({
        code: e.detail.value
      });
      if (that.data.code.length == 0) {
        that.setData({
          focus_status: "1000"
        });
      }
      if (that.data.code.length == 1) {
        that.setData({
          length: e.detail.value.length,
          focus_status: "0100"
        });
      }
      if (that.data.code.length == 2) {
        that.setData({
          length: e.detail.value.length,
          focus_status: "0010"
        });
      }
      if (that.data.code.length == 3) {
        that.setData({
          length: e.detail.value.length,
          focus_status: "0001"
        });
      }
      if (that.data.code.length == 4) {
        that.setData({
          length: e.detail.value.length
        })
        app.globalData.bool=false
        wx.navigateTo({
          url: this.properties.url,
        })
      }
    },

    set_Focus() { //聚焦input
      var that = this
      that.setData({
        code_isFocus: true
      })
    }
  }
})
