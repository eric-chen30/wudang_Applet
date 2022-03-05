// pages/threeTest/threeTest.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 个人信息
    UserRank:'',
    UserValue:'',
    UserName:'',
    UserAvatar:'',

    // 返回的列表数据
    Results:[
      {
        pic: '',
        id: '',
        nickname: '',
        value: ''
      }
    ]
  },

   // 获取排行榜数据
   getRankData:function(){
     var that = this
    wx.request({
      url: 'http://123.57.208.204/rank', 
      method: 'GET',
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        console.log(res.data.data)
        that.setData({
          Results: res.data.data
        })        
      },
      fail: function (err) {
        console.log('错误码：' + err.errCode);
        console.log('错误信息：' + err.errMsg);
    }
    })
  },
  
  // 获取用户助力值和排名
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
        console.log(res.data.rank)
        if(res.data.value >0){
          // 返回值表示该用户当前助力值
          that.setData({
            UserRank: res.data.rank,
            UserValue: res.data.value
          })
        }else if(res.data.value == -1){
          console.log("当前用户不存在")
        }else{
          console.log("发生错误")
        }
      },
      fail: function (err) {
        console.log('错误码：' + err.errCode);
        console.log('错误信息：' + err.errMsg);
      }
    })
  },

  // getUserInfo:function(){
  //   var that = this;
  //   // 获取用户的openID
  //   const app = getApp();
  //   var avatar = app.globalData.userInfo.avatarUrl;
  //   var nickname = app.globalData.userInfo.nickName;
  //   console.log(nickname,avatar)
  //   that.setData({
  //     UserAvatar: avatar,
  //     UserName: nickname
  //   })
  // },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getRankData(),
    // this.getUserInfo(),
    this.getUserValue()
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