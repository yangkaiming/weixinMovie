//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: [],
    testText: [],
    count: 100

  },
  onLoad: function() {
    // this.setData({
    //   logs: (wx.getStorageSync('logs') || []).map(log => {
    //     return util.formatTime(new Date(log))
    //   })
    // })
    this.setData({
      testText: '我们来做计数器'
    })
  },
  // 计时器减减
  reduce: function() {
    this.setData({
      count: this.data.count - 1,
    })
  },
  // 计时加加
  add: function() {
    this.setData({
      count: this.data.count + 1,
    })
  }

})