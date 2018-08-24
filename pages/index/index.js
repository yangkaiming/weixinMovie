//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    movieList: [],
    ip: 'http://192.168.1.29:4000/',
    movieImg: [],
    movieInfo: [],
    moveHot: ['热映', '待映'],
    currentTab: 0,
    movieWill: [],
    movieWillTop: [],
    data: ""
  },

  onLoad: function (e) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })

    }
    wx.request({
      url: this.data.ip + 'movie',
      success: (res) => {
        let data = res.data
        for (let item of data) {
          let showTime = item.show
          let showPeople = item.ticket
          let newShowTime = showTime.slice(0, 10)
          let nowTime = new Date()
          let clierTime = Date.parse(newShowTime) - nowTime.getTime();
          item.showtime = clierTime <= 0
          if (clierTime <= 0) {
            item.show_time = true
            item.change = true
          } else {
            item.ticket = showPeople
          }
          // 获取当前时间和电影上映时间的年月日
          let activeTime = new Date(newShowTime)
          let year = activeTime.getFullYear() - nowTime.getFullYear();
          let month = activeTime.getMonth() - nowTime.getMonth();
          let date = activeTime.getDate() - nowTime.getDate();
          if (year === 0 && month === 0 && date <= 7) {
            switch (date) {
              case 1:
                item.activeText = "明天上映"
                break;
              case 2:
                item.activeText = "后天上映"
                break;
              default:
                item.activeText = date + 1 + "天后上映"
            }
          } else {
            item.activeText = item.show;
          }
        }
        this.setData({
          movieList: [...res.data],
          data: new Date().toLocaleString()
        })
      }
    })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#ff0000',
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    })

  },
  getUserInfo: function (e) {
    // console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  movieDown: function (e) {
    wx.navigateTo({
      url: '../movie/movie?id=' + e.currentTarget.dataset.ids
    })
  },
  down: function () {
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        wx.openLocation({
          latitude: latitude,
          longitude: longitude,
          scale: 28
        })
      }
    })
  },
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.id
    })
    if (this.data.currentTab != 0) {
      wx.request({
        url: this.data.ip + 'movie',
        success: (res) => {
          let data = res.data
          let arr = []
          for (let item of data) {
            let showTime = item.show
            let showPeople = item.ticket
            let newShowTime = showTime.slice(0, 10)
            let nowTime = new Date()
            let clierTime = Date.parse(newShowTime) - nowTime.getTime();
            if (item.userscore !== "暂无评") {
              item.willshow = true
            } else {
              item.peopleNum = item.ticket
            }
            if (clierTime >= 0) {
              arr.push(item)
            }
          }
          this.setData({
            movieWill: [...arr]
          })
        }
      })
    }
  }
})
