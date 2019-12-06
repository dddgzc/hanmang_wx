//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    current:0,
    current1: 0,
    nav_list:[
      '全部','互联网','快消','财神','技能'
    ],
    current2:0,
    goodslist:[
      {
        picUrl: "../images/pic2.jpg",
        title1: '互联网1V11',
        price: '$600',
        num:"100"
      },
      {
        picUrl: "../images/pic2.jpg",
        title1: '互联网1V12',
        price: '$600',
        num: "100"
      },
      {
        picUrl: "../images/pic2.jpg",
        title1: '互联网1V13',
        price: '$600',
        num: "100"
      }
    ],
    goodslist1: [
      {
        picUrl: "../images/pic2.jpg",
        title1: '互联网1V11',
        price: '600',
        num: "100",
        tag: "光放推荐",
        synum:100
      },
      {
        picUrl: "../images/pic2.jpg",
        title1: '互联网1V12',
        price: '1600',
        num: "200",
        tag: "光放推荐",
        synum: 100
      },
      {
        picUrl: "../images/pic2.jpg",
        title1: '互联网1V13',
        price: '2600',
        num: "300",
        tag: "光放推荐",
        synum: 100
      }
    ],
  },
  // 新手指南跳转
  helpTo: function () {
    wx.navigateTo({
      url: '../helppage/helppage'
    })
  },
  onLoad: function () {
    //获取用户的权限
    wx.getSetting({
      success:function(res){
        if(res.authSetting['scope.userInfo']){
          wx.authorize({
            scope: 'scope.userInfo',
            success:function(){
              //用户同意获取userInfo
              console.log("获取userInfo")
            }
          })
        }
      }
    })
  },
  tab: function (e) {
    var index = e.currentTarget.dataset.index;
    this.setData({
      current: index
    })
  },
  switchTap: function (e) {
    var index = e.currentTarget.dataset.index;
    this.setData({
      current1: index
    })
  },
  switchTap1: function (e) {
    var index = e.currentTarget.dataset.index;
    this.setData({
      current2: index
    })
  },
})
