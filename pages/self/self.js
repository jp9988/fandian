// pages/self/self.js
var that

const db = wx.cloud.database()
const _ = db.command
const self = db.collection('self')


Page({

  /**
   * 页面的初始数据
   */
  data: {
    item:''
  },

  nav_to:function(e){
    const _id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../detail-template/detail-template?index=self&id=' + _id,
    })
 },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    self.get().then(res =>{
      that.setData({
        item:res.data
      })
    })
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

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

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