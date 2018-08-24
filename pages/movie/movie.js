// pages/movie/movie.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    infoMovie: [],
    ip: 'http://192.168.1.29:4000/',
    imgList:[],
    imgsList: [],
    actorList:[],
    img:[],
    comment:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      data: {
        _id: options.id
      },
      url: this.data.ip + 'movieinfo' ,
      success: (res) => {
        console.log(res.data)
        let data=res.data
        let img = data.obj_actor;
        let imgs = data.obj_director
        img=img.replace(/\\/g,"/");
        imgs = imgs.replace(/\\/g, "/");  
        let actors = img.split(',')
        let actorName = data.actor.split('，')
        let image = data.img
        image = image.replace(/\\/g, "/");  
        let images = image.split(',');
        let comment = data.comment
        this.setData({
          infoMovie: res.data,
          imgList:[imgs],
          imgsList: actors,
          actorList: actorName,
          img: images,
          comment:comment
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  }


})