// pages/main/main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tips: '点击显示歌单信息',
    peopleIfo: [],
    songLists: [],
    ip: 'http://192.168.1.23:4000/'

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {


  },
  playMusic: function() {

    wx.request({
      url: this.data.ip + 'people',
      success: (res) => {
        this.setData({
          songLists: [...res.data]
        })
      }
    })
  },

})