// pages/property/property.js
import * as echarts from '../../components/ec-canvas/echarts';

let chart = null;

function initChart(canvas, width, height) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);
  let option = {
    title: {
      text: '共收益 24BTC',
      x: 'left',
      textStyle: {
        color: '#666',
        fontSize: 14
      }
    },
    legend: {
      orient: 'vertical',
      left: '30',
      data: ['转发 10BTC', '评论 6BTC', '点赞 8BTC'],
      top: '40'
    },
    series: [
      {
        type: 'pie',
        radius: '65%',
        center: ['70%', '60%'],
        data: [
          { value: 62, name: '转发 10BTC' },
          { value: 13, name: '评论 6BTC' },
          { value: 25, name: '点赞 8BTC' }
        ],
        label: {
          position: 'inside'
        },
        color: ['#fc90b0', '#66a3fe', '#fdc588']
      }
    ]
  };
  chart.setOption(option);
  return chart;
}
let app = getApp();
Page({
  data: {
    ec: {
      onInit: initChart
    },
    balance:''
  },
  onLoad: function () {
    wx.request({
      url: 'http://47.96.77.123:8080/html/user/getBalance?address=' + app.globalData.username,
      success: (res) => {
        console.log(res)
        this.setData({
          balance: res.data.data
        })
      }
    })
  },
  onReady: function () {
    var context = wx.createCanvasContext('firstCanvas');
  },
  onShow: function () {
    this.onLoad()
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.request({
      url: 'http://47.96.77.123:8080/html/user/getBalance?address=' + app.globalData.username,
      success: (res) => {
        console.log(res)
        that.setData({
          balance: res.data.data
        })
      }
    })
  },
  // 转账
  carry:function () {
    wx.navigateTo({
      url: '../carry/carry',
    })
  },
  //收款
  collection:function () {
    wx.navigateTo({
      url: '../collections/collections',
    })
  }
})