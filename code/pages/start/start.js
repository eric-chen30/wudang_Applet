// pages/start/start.js
// 获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    images:
      {
        backgroundSrc:"../../static/101.jpg",
        startPicture: "https://s3.ax1x.com/2021/02/06/yJvwR0.jpg",
      },
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../work/work'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    //获取他人的openid
    var otherOpenId =options.otherOpenId;

    //获取自己的openid

    //两个id发给后端请求
    if (otherOpenId){
      
    }

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo

          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo(e) {
    this.bindViewTap();
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    console.log(app.globalData.code)
    console.log(app.globalData.userInfo.nickName)
    console.log(app.globalData.userInfo.avatarUrl)

// 登录成功返回code后，结合userInfo中的nickName 和 avatarUrl 创建用户
    wx.request({
      url: 'http://123.57.208.204/user',
      method: 'POST',
      data: {
        openID: app.globalData.code,
        nickname: app.globalData.userInfo.nickName,
        pic: app.globalData.userInfo.avatarUrl
      },
      header: {'content-type': 'application/x-www-form-urlencoded'},
      success:function(res){
        console.log('创建用户成功')
      }
    })

    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
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