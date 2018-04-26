const fetch = require('../../utils/fetch.js')

// pages/message/message.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'http://cache1.daizhe.cn/experience/20150610/0/20150610173720610_676_432_674_432.jpg',
      'http://cache1.daizhe.cn/experience/20150610/6/20150610173856891_676_432_674_432.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 500,
    slides: [],
    categories: []
  },
  /**
   * 点击跳转到链接
   */
  linkToImg: function (e) {

  },
  /**
   * 长按放大图片
   */
  openImg: function (e) {
    console.log('放大图片', e);
    wx.previewImage({
      current: '', // 当前显示图片的http链接
      urls: this.data.imgUrls // 需要预览的图片http链接列表
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 请求轮播图 , 已经封装成了函数
    // wx.request({
    //   url: 'http://127.0.0.1:16688/slides', 
    //   method: 'GET',
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   complete:(res) => {
    //     res.data.forEach((item, index) => {
    //       item.image = this.data.imgUrls[index]
    //     })
    //     console.log('修改之后的res',res.data)
    //     this.setData({
    //       slides: res.data
    //     })
    //   }
    // })
    fetch('/slides').then((res) => {
      console.log('修改之后的res', res.data)
      res.data.forEach((item, index) => {
        item.image = this.data.imgUrls[index]
      })
      this.setData({
        slides: res.data
      })
    }).catch(res => console.log(res)),
      // 请求分类列表页面
    fetch('/categories').then((res) => {
      console.log('分类列表的', res.data)
      this.setData({
        categories: res.data
      })
    }).catch(res => console.log(res))
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('我被隐藏了')
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('我被干掉了')
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.onLoad();
    setTimeout(() => {
      wx.showToast({
        title: '下拉刷新成功',
        icon: 'success',
        duration: 2000
      })
      wx.stopPullDownRefresh()
    }, 1000)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})