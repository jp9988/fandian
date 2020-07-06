// pages/comment-list/comment-list.js
var that

const db = wx.cloud.database()
const _ = db.command
const comment = db.collection('comment')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    item:'',
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  comment:function(e){
    comment.add({
      data:{
        title:that.data.title,
        avatar:that.data.avatar,
        name:that.data.name,
        comment:e.detail.value.comment,
        time:new Date().getTime(),
        signature:that.data.signature
      },
      success:res => {
        wx.showToast({
          title: '发表成功'
        })
        that.getComment()
      },
      fail:err => {
        console.log(err)
      }
    })
  },

  getComment:function(){
    comment.where({
      title:that.data.title
    }).get().then(res => {
      that.setData({
        item:res.data,
        count:res.data.length
      })
    }).catch(err => {
      console.log(err)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    that.setData({
      title:options.title
    })
    that.getComment()
    // 查看是否授权
    wx.getSetting({
      success (res){
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function(res) {
              that.setData({
                avatar:res.userInfo.avatarUrl,
                name:res.userInfo.nickName,
                signature:res.signature
              })
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