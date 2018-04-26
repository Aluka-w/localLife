const fetch = require('../../utils/fetch.js');
// pages/list/list.js
Page({
  data: {
    inputShowed: false,
    inputVal: "",
    initOption: "",
    categoriesList: [],
    currentPage: 0,
    pageSize: 10,
    totalCount: 0,
    hasMore: true
  },
  /**
   * 输入框获得焦点事件
   */
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  /**
   * 点击取消按钮
   */
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false,
      currentPage: 0,
    });
    this.setData({ categoriesList: [], currentPage: 0 })
    this.loadingMore()
  },
  /**
   * 点击清空
   */
  clearInput: function () {
    this.setData({
      inputVal: "",
      currentPage: 0,
    });
    this.setData({ categoriesList: [], currentPage: 0 })
    this.loadingMore()
  },
  /**
   * 监听输入的值
   */
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value.trim()
    });
  },
  // 点击确定再搜索
  searchHandle: function() {
    this.setData({ categoriesList: [], currentPage: 0})
    this.loadingMore()
  },

  loadingMore: function() {
    wx.showLoading({ title: '加载中', mask: true })
    let { pageSize, currentPage, totalCount, categoriesList, initOption, inputVal, hasMore} = this.data
    if(pageSize * currentPage <= totalCount){
      const params = { _page: ++currentPage, _limit: pageSize}
      if (inputVal) params.q = inputVal
    //获取详细信息
    return fetch(`/categories/${ initOption.categories}/shops`, params).then(res => {
      hasMore = true
      if (res.data.length <= 0) hasMore = false
      categoriesList = categoriesList.concat(res.data)
      console.log('---', categoriesList)
      this.setData({ currentPage, categoriesList, hasMore, totalCount: res.header['X-Total-Count']})
      wx.hideLoading()
    }).catch(res => {
      console.log('错误的数据', res.data)
      wx.hideLoading()
    })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('进来的url的数据', options)
    this.setData({ initOption: options})
    // 获取导航标题
    fetch(`/categories/${options.categories}`).then(res => {
      wx.setNavigationBarTitle({
        title: `${res.data.name}`
      })
    }).catch(res => {
      console.log('错误的数据', res.data)
    })
    this.loadingMore()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({ categoriesList: [], currentPage: 0 })
    this.loadingMore()
    .then(()=>{
      wx.stopPullDownRefresh()
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.loadingMore()
  },
})