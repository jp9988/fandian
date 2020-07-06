// pages/detail-template/detail-template.js

const db = wx.cloud.database()
const _ = db.command
const self_detail = db.collection('self-detail')
const west_detail = db.collection('west-detail')
const chinese_detail = db.collection('chinese-detail')
const new_detail = db.collection('new-detail')
const index_detail = db.collection('index-detail')
const index = db.collection('index')
const collect = db.collection('collect')
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collect_flag: true,
    well_flag: true
  },

  // 跳转到用户评价页面
  comment: function () {
    wx.navigateTo({
      url: '../comment-list/comment-list?title=' + that.data.detail.title,
    })
  },

  // 跳转到订单页面
  order: function () {
    wx.navigateTo({
      url: '../order/order?title=' + that.data.detail.title,
    })
  },

  collect: function () {
    that.setData({
      collect_flag: !that.data.collect_flag
    })
    if (!that.data.collect_flag) {
      index.where({
        name: that.data.detail.title
      }).get().then(res => {
        const item = {
          id: res.data[0].id,
          name: res.data[0].name,
          distance: res.data[0].distance,
          desc: res.data[0].desc,
          avator: res.data[0].avator,
          number: res.data[0].number,
          price: res.data[0].price,
          start: res.data[0].start,
          well: res.data[0].well
        }
        that.saveCollect(item)
        wx.showToast({
          title: '收藏成功',
        })
      }).catch(err => {
        console.log(err)
      })
    } else {
      collect.where({
        name: that.data.detail.title
      }).get().then(res => {
        that.removeCollect(res.data[0]._id)
        wx.showToast({
          title: '取消成功',
        })
      }).catch(err => {
        console.log(err)
      })
    }
  },

  getCollect: function () {
    collect.where({
      name: that.data.detail.title
    }).get().then(res => {
      if (res.data.length === 1) {
        that.setData({
          collect_flag: false
        })
      } else {
        that.setData({
          collect_flag: true
        })
      }
    }).catch(err => {
      console.log(err)
    })
  },

  saveCollect: function (item) {
    collect.add({
      data: item
    }).then(res => {}).catch(err => {
      console.log(err)
    })
  },

  removeCollect: function (idx) {
    collect.doc(idx).remove()
  },

  // 点赞
  well: function () {
    that.setData({
      well_flag: !that.data.well_flag
    })
    if (that.data.page == 'index') {
      if (!that.data.well_flag) {
        index.where({
          name: that.data.detail.title
        }).get().then(res => {
          index.doc(res.data[0]._id).update({
            data: {
              number: res.data[0].number + 1
            }
          }).then(res => {
            console.log(res)
          }).catch(err => {
            console.log(err)
          })
        }).catch(err => {
          console.log(err)
        })

        index_detail.where({
          title: that.data.detail.title
        }).get().then(res => {
          index_detail.doc(res.data[0]._id).update({
            data: {
              number: res.data[0].number + 1
            }
          }).then(res => {
            console.log(res)
            that.get_index_detail(that.data.id)
          }).catch(err => {
            console.log(err)
          })
        }).catch(err => {
          console.log(err)
        })

      } else {
        index.where({
          name: that.data.detail.title
        }).get().then(res => {
          index.doc(res.data[0]._id).update({
            data: {
              number: res.data[0].number - 1
            }
          }).then(res => {
            console.log(res)
          }).catch(err => {
            console.log(err)
          })
        }).catch(err => {
          console.log(err)
        })

        index_detail.where({
          title: that.data.detail.title
        }).get().then(res => {
          index_detail.doc(res.data[0]._id).update({
            data: {
              number: res.data[0].number - 1
            }
          }).then(res => {
            console.log(res)
            that.get_index_detail(that.data.id)
          }).catch(err => {
            console.log(err)
          })
        }).catch(err => {
          console.log(err)
        })
      }
    }
  },

  get_index_detail:function(id){
    index_detail.get().then(res => {
      that.setData({
        id: id,
        detail: res.data[id]
      })
      that.getCollect()
    }).catch(err => {
      console.log(err)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    var id = parseInt(options.id)
    that.setData({
      page: options.index
    })
    if (options.index == 'index') {

      that.get_index_detail(id)

    } else if (options.index == 'news') {
      new_detail.get().then(res => {
        that.setData({
          id: id,
          detail: res.data[id]
        })
        that.getCollect()
      })
    } else if (options.index == 'chinese') {
      chinese_detail.get().then(res => {
        that.setData({
          id: id,
          detail: res.data[id]
        })
        that.getCollect()
      })
    } else if (options.index == 'west') {
      west_detail.get().then(res => {
        that.setData({
          id: id,
          detail: res.data[id]
        })
        that.getCollect()
      })
    } else if (options.index == 'self') {
      self_detail.get().then(res => {
        that.setData({
          id: id,
          detail: res.data[id]
        })
        that.getCollect()
      })
    }

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