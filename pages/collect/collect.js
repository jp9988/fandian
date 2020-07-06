// pages/collect/collect.js
var that

const db = wx.cloud.database()
const _ = db.command
const collect = db.collection('collect')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: ''
  },

  getCollect:function(){
    collect.get().then(res => {
      console.log(res.data)
      that.setData({
        item:res.data
      })
    }).catch(err =>{
      console.log(err)
    })
  },

  slideButtonTap(e) {
    console.log(e.currentTarget.dataset.id)
    collect.doc(e.currentTarget.dataset.id).remove().then(res => {
      wx.showToast({
        title: '删除成功',
      })
      that.getCollect()
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    that.setData({
      slideButtons: [{
        type:'warn',
        text: '删除',
        extClass:'test'
      }],
    });
    that.getCollect()
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