// pages/twice/twice.js
// 获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 助力值
    value: ''
  },

  // 点击排行榜，跳转到排行榜页面
  goToRankPage:function(){
    wx.navigateTo({
      url: '../rankingList/rankingList',
    })
  },

  // 获取用户的助力值
  getUserValue:function(){
    var that = this;
    // 获取用户的openID
    const app = getApp();
    // var code = app.globalData.code;
    var code = '123';
    console.log("用户openID为："+code)
    wx.request({
      url: 'http://123.57.208.204/user',
      method: 'GET',
      header: {'content-type': 'application/json'},
      data:{
        openID: code
      },
      success: function(res){
        console.log(res)
        if(res.data.value >0){
          // 返回值表示该用户当前助力值
          that.setData({
            value: res.data.value
          })
        }else if(res.data.value == -1){
          console.log("当前用户不存在")
        }else{
          console.log("发生错误")
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取用户助力值
    this.getUserValue()
    console.log("123456")
    console.log(app.globalData.userInfo)
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
    const app = getApp();
    console.log(app.globalData.code)
    var otherOpenId = app.globalData.code;
    return{
      title:'武当山小程序',
      path:'/pages/start/start?otherOpenId=' + otherOpenId,
      desc:'这是一款关于插香祈福的小程序',
      imageUrl: '/pages/twoTest/images/1.png'
    }
  },

   // 发送到朋友圈
   onShareTimeline(){
     const app = getApp();
     console.log(app.globalData.code)
     var otherOpenId = app.globalData.code;
     var query = {
      data: otherOpenId
    };
    query = JSON.stringify(query.data);  //解析一下query
    return{
      title:'武当山小程序', // 标题
      query: query ,    // 当前页面携带的参数
      imageUrl:'/pages/twoTest/images/1.png',  // 显示图片，默认为小程序logo
      desc:'这是一款关于插香祈福的小程序'
    }
  }
})