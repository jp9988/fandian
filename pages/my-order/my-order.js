// pages/my-order/my-order.js

var that

const db = wx.cloud.database()
const _ = db.command
const order = db.collection('order')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    item:''
  },

  getOrder:function(){
    order.get().then(res => {
      that.setData({
        item:res.data
      })
    }).catch(err =>{
      console.log(err)
    })
  },

  delete:function(e){
    order.doc(e.currentTarget.dataset.id).remove().then(res => {
      that.getOrder()
    }).catch(err =>{
      console.log(err)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    that.getOrder()
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