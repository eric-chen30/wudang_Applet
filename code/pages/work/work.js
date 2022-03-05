// pages/work/work.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    images:
      {
        backgroundSrc:"../../static/102.jpg",
        headSrc: "../../static/theBestFragrance.png",
        backgroundEmpty:"../../static/background.jpg",
        incenseBurnerAndStone: "../../static/incenseBurnerAndStone.jpg",
        stone2:"../../static/stone2.jpg",
        incenseBurnerAndIncense:"../../static/incenseBurnerAndIncense.png",
        incenseBurnerAndIncenseAndFlame:"../../static/incenseBurnerAndIncenseAndflame.png",
        verse: "../../static/verse.png",

        background: "https://s3.ax1x.com/2021/02/04/y32WFI.jpg",
        firstIncense: "https://s3.ax1x.com/2021/02/04/y1v4iV.png",
        // incenseBurnerStone: "https://s3.ax1x.com/2021/02/04/y1vXIx.png",
        incenseBurnerStone: "https://s3.ax1x.com/2021/02/06/yYZp8S.png",
        incense: "https://s3.ax1x.com/2021/02/06/yYZ9gg.png",
        incenseAshes: "https://s3.ax1x.com/2021/02/04/y32TOg.png",
        incenseSmoke: "https://s3.ax1x.com/2021/02/06/yYZiuj.png",
        smoke: "https://s3.ax1x.com/2021/02/04/y32o6S.png",
        incenseFire: "https://s3.ax1x.com/2021/02/06/yYZCvQ.png",
        poetry: "https://s3.ax1x.com/2021/02/04/y1vWaq.png",
        poetryLeft: "https://imgchr.com/i/y1vRZn",
        poetryRight: "https://imgchr.com/i/y1vvi6",
        helpBackground: "https://s3.ax1x.com/2021/02/04/y32fYt.png",
        secondBackground: "https://s3.ax1x.com/2021/02/04/y32bwj.jpg",
        fire: "https://s3.ax1x.com/2021/02/04/y32gwd.png",
      },
    //true或false的调控
    //下拉触底后，长按放大香炉
    scrollAndClick: true,
    //香炉放大后，开始摩擦屏幕
    bigIncenseToFriction:false,
    //长按使香炉放大的按钮
    longClick: true,
    //点击香炉上香的事件
    clickHere: false,
    //去分享
    toShare: false,
    //确定点击上香
    alreadyClick: false,

    //出现诗词
    showPoetry: false,
    startTime: '',
    endTime: '',
    
    //动画
    //是否出现3秒后缩小
    threeSecondNarrow: true,
    //放大或者缩小
    enlargeOrNarrow: '',
    //放大移动,缩小移动
    enlargeOrNarrowAndTran: '',
    //第一香图片褪去
    firstIncense: '',
    //向下滑动拉进香炉
    toSlideIncense: '',
    //摩擦屏幕点亮香
    toFrictionIncense: '',
    //长按放大提示出现
    longClickShow: '',
    //石柱+香炉
    incenseBurnerStone: '',
    //石柱+香炉+香
    stoneIncense: '',
    //石柱+香炉+香+火
    incenseFire: '',
    //石柱+香炉+香+烟
    incenseSmoke: '',
    //显示诗词
    toShowPoetry: '',


    //摩擦屏幕移动
    touchS: [0,0],
    touchE: [0,0],

    //香炉火焰的透明度
    incenseAndFlameOpacity: 0,
    //诗词的透明度动画
    poetryOpacityAnimation: 0,

  },
  // 滚动到底部
  lower(e) {
    let vm = this;
    let option = {
      duration: 1000, // 动画执行时间
      timingFunction: 'linear' // 动画执行效果
    };
    var ani = wx.createAnimation(option); // 消失天下第一香动画
    var ani2 = wx.createAnimation(option); // 消失向下滑动拉进香炉动画
    var ani3 = wx.createAnimation(option); // 出现长按香炉放大动画
    ani.opacity(0).step();
    ani2.opacity(0).step();
    ani3.opacity(1).step();
    vm.setData({
      scrollAndClick: false,
      firstIncense: ani.export(),
      toSlideIncense: ani2.export(),

    });
    //1秒后 出现长按香炉放大
    setTimeout(function(){
      vm.setData({
        longClickShow: ani3.export(),
      });
    },1000);

    console.log(e);
  },

  //长按使香炉放大
  handleLongPress(e) {     
       
      let vm = this;
      let option = {
        duration: 1000, // 动画执行时间
        timingFunction: 'ease-in' // 动画执行效果
      };
      var enlargeAndTran1 = wx.createAnimation(option);
      var enlargeAndTran2 = wx.createAnimation(option);
      var enlargeAndTran3 = wx.createAnimation(option);
      // 放大移动
      enlargeAndTran1.translateY("28vh").scale(1.6,1.6).step();
      enlargeAndTran2.translateY("28vh").scale(1.6,1.6).step();
      enlargeAndTran3.translateY("28vh").scale(1.6,1.6).step();
      vm.setData({
        incenseBurnerStone: enlargeAndTran1.export(),
        stoneIncense: enlargeAndTran2.export(),
        incenseFire: enlargeAndTran3.export(),
        bigIncenseToFriction: true,
        longClick: false,
        clickHere: true,
      });

      //1s后长按香炉放大字体消失
      let option2 = {
        duration: 1000, // 动画执行时间
        timingFunction: 'linear' // 动画执行效果
      };
      var ani = wx.createAnimation(option2); // 消失长按香炉放大动画
      ani.opacity(0).step();
      setTimeout(function(){
        vm.setData({
          longClickShow: ani.export(),
        });
      },1000); 

      //1秒后点击此处上香字体出现
      let option3 = {
        duration: 1500, // 动画执行时间
        timingFunction: 'linear' // 动画执行效果
      };
      var ani2 = wx.createAnimation(option3); // 出现点击此处上香动画
      ani2.opacity(1).step();
      setTimeout(function(){
        vm.setData({
          toShangXiang: ani2.export(),
          clickIncense: true,
        });
      },2000);  
  },  
  //点击这里上香
  clickHereToIncense(){
    let vm = this;
    let option = {
      duration: 1000, // 动画执行时间
      timingFunction: 'linear' // 动画执行效果
    };
    var ani = wx.createAnimation(option); // 显示上香动画
    ani.translateY("28vh").scale(1.6,1.6).opacity(1).step();
    vm.setData({
      stoneIncense: ani.export(),
      alreadyClick: true,
    });
    console.log("here");

    //1s后点击此处上香字体消失
    let option2 = {
      duration: 1000, // 动画执行时间
      timingFunction: 'linear' // 动画执行效果
    };
    var ani2 = wx.createAnimation(option2);
    ani2.opacity(0).step();
    setTimeout(function(){
      vm.setData({
        toShangXiang: ani2.export(),
      });
    },1000); 

    //1秒后摩擦屏幕点亮香字体出现
    let option3 = {
      duration: 1500, // 动画执行时间
      timingFunction: 'linear' // 动画执行效果
    };
    var ani3 = wx.createAnimation(option3);
    ani3.opacity(1).step();
    setTimeout(function(){
      vm.setData({
        toFrictionIncense: ani3.export(),
      });
    },2000); 

  },
  touchStart(e){
    // console.log(e.touches[0].pageX)
    let sx = e.touches[0].pageX
    let sy = e.touches[0].pageY
    this.touchS = [sx,sy]
  },
  touchMove(e){
    let sx = e.touches[0].pageX;
    let sy = e.touches[0].pageY;
    this.touchE = [sx, sy]
  },
  //摩擦屏幕点亮香
  touchEnd(e){
    if(this.data.incenseAndFlameOpacity<1){
      let start = this.touchS
      let end = this.touchE
      console.log(start);
      let opacityRight=0;
      let opacityLeft=0;
      
      if(start[0] < end[0] - 50){
        opacityRight = this.data.incenseAndFlameOpacity+0.1;
        this.setData({
          incenseAndFlameOpacity: opacityRight
        });
  
      }else if(start[0] > end[0] + 50){
        opacityLeft=this.data.incenseAndFlameOpacity+0.1
        this.setData({
          incenseAndFlameOpacity:opacityLeft
        });
      }
    }else { 
      if(this.data.threeSecondNarrow){

        //缩小
        let vm = this;
        setTimeout(function(){
          let option = {
            duration: 1000, // 动画执行时间
            timingFunction: 'linear' // 动画执行效果
          };
          var enlargeAndTran1 = wx.createAnimation(option);
          var enlargeAndTran2 = wx.createAnimation(option);
          var enlargeAndTran3 = wx.createAnimation(option);
          var enlargeAndTran4 = wx.createAnimation(option);
          // 缩小移动
          enlargeAndTran1.translateY("0vh").scale(1,1).step();
          enlargeAndTran2.translateY("0vh").scale(1,1).step();
          enlargeAndTran3.translateY("0vh").scale(1,1).step();
          enlargeAndTran4.opacity(0).step();
          vm.setData({
            incenseBurnerStone: enlargeAndTran1.export(),
            stoneIncense: enlargeAndTran2.export(),
            incenseFire: enlargeAndTran3.export(),
            toFrictionIncense: enlargeAndTran4.export(),
            threeSecondNarrow: false,
            showPoetry: true,
            toShare: true,
          });
        },1000);

        //显示烟
        setTimeout(function(){
          let option = {
            duration: 2000, // 动画执行时间
            timingFunction: 'ease-in-out' // 动画执行效果
          };
          var enlargeAndTran4 = wx.createAnimation(option);
          var enlargeAndTran5 = wx.createAnimation(option);
          // 放大移动
          enlargeAndTran4.opacity(0).step();
          enlargeAndTran5.opacity(1).step();
          vm.setData({
            incenseFire: enlargeAndTran4.export(),
            incenseSmoke: enlargeAndTran5.export(),
          });
        },2500);

        //显示诗词
        setTimeout(function(){
          let option = {
            duration: 1000, // 动画执行时间
            timingFunction: 'ease-in-out' // 动画执行效果
          };
          var comeToOpacity = wx.createAnimation(option); // 创建动画
          //诗词显示
          comeToOpacity.opacity(1).step();
          vm.setData({
            poetryOpacityAnimation: comeToOpacity.export(),// 开始执行动画
          });
        },5500);


        //诗词消失，出现分享
        setTimeout(function(){
          let option = {
            duration: 1000, // 动画执行时间
            timingFunction: 'ease-in-out' // 动画执行效果
          };
          var ani1 = wx.createAnimation(option); // 创建动画
          var ani2 = wx.createAnimation(option); // 创建动画
          //诗词消失，出现分享
          ani1.opacity(0).step();
          ani2.opacity(1).step();
          vm.setData({
            poetryOpacityAnimation: ani1.export(),
            toShowPoetry: ani2.export(),
          });
        },7500);

      }
    }

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

    let vm = this;
    let option = {
      duration: 1000, // 动画执行时间
      timingFunction: 'linear' // 动画执行效果
    };
    var firstIncense = wx.createAnimation(option); // 天下第一香的动画
    var toSlideIncense = wx.createAnimation(option); // 向下滑动拉进香炉动画
    
    firstIncense.opacity(1).step();
    toSlideIncense.opacity(1).step();
    vm.setData({
      firstIncense: firstIncense.export(),
      toSlideIncense: toSlideIncense.export(),
    });
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
    var openId = app.globalData.code;
    return{
      title:'武当山小程序',
      path:'/pages/start/start?openId=' + openId,
      desc:'这是一款关于插香祈福的小程序',
      imageUrl: '/pages/twoTest/images/1.png'
    }
  },

   // 发送到朋友圈
   onShareTimeline(){
     const app = getApp();
     console.log(app.globalData.code)
     var openId = app.globalData.code;
     var query = {
      data: openId
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