const app = getApp()

module.exports = ((url, data, method = 'GET', header = {}) => {
  wx.showLoading({ title: '加载中', })
  return new Promise((resolve, reject) => {
    wx.request({
      url: app.config.apiBase + url,
      data,
      method,
      header,
      dataType: "json",
      success: resolve,
      fail: reject,
      complete: wx.hideLoading()
    })
  })
})
