// pages/comment/comment.js
var that

const db = wx.cloud.database()
const _ = db.command
const comment = db.collection('comment')

const formatDate = dateTime => {
  const date = new Date(dateTime);
  return `${date.getFullYear()}年${(date.getMonth() +
    1).toString().padStart(2,'0')}月${date.getDate().toString().padStart(2,'0')}日 ${date.getHours().toString().padStart(2,'0')}:${date.getMinutes().toString().padStart(2,'0')}`;
};
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item:''
  },

  slideButtonTap(e) {
    comment.doc(e.currentTarget.dataset.id).remove().then(res =>{
      wx.showToast({
        title: '删除成功',
      })
      that.getComment()
    }).catch(err => {
      wx.showToast({
        title: '删除失败',
        image:'../../icons/error.png'
      })
    })
  },

  getComment:function(){
    comment.where({
      signature:that.data.signature
    }).get().then(res =>{
      for (let i in res.data){
        res.data[i].time = formatDate(res.data[i].time)
      }
      console.log(res.data)
      that.setData({
        item:res.data
      })
    }).catch(err =>{
      console.log(err)
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

    wx.getUserInfo({
      success: function(res) {
        that.setData({
          signature:res.signature
        })
        that.getComment()
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