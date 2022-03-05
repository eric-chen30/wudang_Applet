// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    //移动
    touchS: [0,0],
    touchE: [0,0],
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  touchStart(e){
    // console.log(e.touches[0].pageX)
    console.log(1)
    let sx = e.touches[0].pageX
    let sy = e.touches[0].pageY
    this.touchS = [sx,sy]
  },
  touchMove(e){
    let sx = e.touches[0].pageX;
    let sy = e.touches[0].pageY;
    this.touchE = [sx, sy]
  },
  touchEnd(e){
    let start = this.touchS
    let end = this.touchE
    console.log(start)
    console.log(end)
    if(start[0] < end[0] - 50){
      console.log('右滑')
    }else if(start[0] > end[0] + 50){
      console.log('左滑')
    }else{
      console.log('静止')
    }
  },
  onLoad() {
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
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo

    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
