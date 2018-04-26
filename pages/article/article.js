// pages/article/article.js
Page({
  data: {
    title: '',
  },

  onLoad: function (options) {
    this.setData({title: options.title})
    wx.setNavigationBarTitle({
      title: options.title
    })
  }
})