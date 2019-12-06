// pages/userpage/userpage.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

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

  },

  //登录
  on_login: function () {
    //设置获取权限
    const that = this
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          wx.authorize({
            scope: 'scope.userInfo',
            success:function(){
              console.log("可以使用")
            }
          })
        }
        if (!res.authSetting['scope.userLocation']){
          wx.authorize({
            scope: 'scope.userLocation',
            success:function(){
              console.log("可以获取用户信息")
            },
            fail:function(){
              console.log("用户拒绝获取")
            }
          })
        }else{
          //已经授权可以登录 获取openid,和session_key
          wx.login({
            success:function(res){
              if(res.code){
                console.log("发送请求")
                wx.request({
                  url: app.buildUrl('/login'),
                  data:{
                    code:res.code
                  }
                })
              }else{
                app.alert({"content":"登录失败!请重试"})
              }
            }
          })
          //获取user信息
          wx.getUserInfo({
            success:function(res){
              var userInfo = res.userInfo
              var nikeName = userInfo.nickName
              that.setData({
                nikeName:"#"
              })
            },
            fail:function(res){
              app.alert({"content":"用户未授权"})
            }
          })
        }
      }
    })
  },

  getUserInfo: function () {
    wx.getUserInfo({
      success: function (res) {

      },
      fail: function (res) {

      }
    })
  },

  login_func:function(){
    this.on_login()
  },

})