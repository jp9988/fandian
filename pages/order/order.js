// pages/order/order.js
var that

const db = wx.cloud.database()
const _ = db.command
const order = db.collection('order')

const app = getApp()
const tmplId = 'EHnKQwB95VJUbehyLeq2dbnQpCM__Z7XbIU_rUfz5h4'

const formatDate = dateTime => {
  const date = new Date(dateTime);
  return `${date.getFullYear()}年${date.getMonth() +
    1}月${date.getDate()}日 ${date.getHours().toString().padStart(2,'0')}:${date.getMinutes().toString().padStart(2,'0')}`;
};

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  order_submit: function (e) {
    var message = {
      name: e.detail.value.name,
      content: `餐厅:${e.detail.value.title}`,
      time: e.detail.value.time,
      state: '预约成功',
      phone: e.detail.value.phone
    }
    if (e.detail.value.name == '') {
      wx.showToast({
        title: '请输入联系人',
        image: '../../icons/error.png'
      })
    } else if (e.detail.value.phone == '') {
      wx.showToast({
        title: '请输入联系电话',
        image: '../../icons/error.png'
      })
    } else if (e.detail.value.number == '') {
      wx.showToast({
        title: '请输入用餐人数',
        image: '../../icons/error.png'
      })
    } else if (e.detail.value.time == '') {
      wx.showToast({
        title: '请输入预定时间',
        image: '../../icons/error.png'
      })
    } else if (e.detail.value.name && e.detail.value.phone && e.detail.value.number && e.detail.value.time) {
      order.add({
        data: e.detail.value,
        success: res => {
          wx.showToast({
            title: '添加成功'
          })
          setTimeout(() => {
            wx.navigateBack()
          }, 5000)
        },
        fail: err => {
          console.log(err)
        }
      })

      // 调用微信 API 申请发送订阅消息
      wx.requestSubscribeMessage({
        // 传入订阅消息的模板id，模板 id 可在小程序管理后台申请
        tmplIds: [tmplId],
        success:res => {
          // 申请订阅成功
          if (res.errMsg === 'requestSubscribeMessage:ok') {
            // 这里将订阅的课程信息调用云函数存入db
            wx.cloud
              .callFunction({
                name: 'subscribe',
                data: {
                  message: message
                },
              })
              .then(res => {
                wx.showToast({
                  title: '订阅成功',
                  icon: 'success',
                  duration: 2000,
                });
                console.log('发送成功', res)
              })
              .catch(res => {
                wx.showToast({
                  title: '订阅失败',
                  icon: 'success',
                  duration: 2000,
                });
                console.log('发送失败', res)
              });
          }
        },
        fail:err => {
          console.log(err)
        }
      });
      
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.title)
    that = this
    that.setData({
      title: options.title
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