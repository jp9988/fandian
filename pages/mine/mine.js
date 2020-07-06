// pages/mine/mine.js
var that

Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    name:'登录',
    avator:'',
    login_flag:false
  },

  my_order:function(){
    wx.navigateTo({
      url: '../my-order/my-order',
    })
  },

  foot:function(){
    wx.navigateTo({
      url: '../foot/foot',
    })
  },

  collect:function(){
    wx.navigateTo({
      url: '../collect/collect',
    })
  },

  comment:function(){
    wx.navigateTo({
      url: '../comment/comment',
    })
  },

  bindGetUserInfo (e) {
    that.setData({
      name:e.detail.userInfo.nickName,
      avator:e.detail.userInfo.avatarUrl,
      login_flag:true
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    // 查看是否授权
    wx.getSetting({
      success (res){
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function(res) {
              
            }
          })
        }
      }
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