// components/modal_view/modal_view.js
var hxBehavior = require('../x-behavior');
Component({
  behaviors: [hxBehavior],
  /**
   * 组件的属性列表
   */
  properties: {
    showModal: {
      type: Boolean,
      value: false
    },
    title: {
      type: String,
      value: "温馨提示"
    },
    label: {
      type: String,
      value: "我知道了"
    },
    share:{
      type:String,
      value:''
    },
    close:{
      type: Boolean,
      value: false
    },
    load: {
      type: Boolean,
      value: false
    },
    like: {
      type: String,
      value: ''
    },
    setting:{
      type:Boolean,
      value:false
    },
    bindData:{
      type:Number,
      value: 0
    },
    likestatus:{
      type: Boolean,
      value: false
    },
    content: {
      type: String,
      value: ''
    },
    color:{
      type:String,
      value:'#409EFF'
    },
    shadow: { // 是否允许点击背景关闭，默认是允许
      type: Boolean,
      value: true
    },
    tips: {
      type: String,
      value: ''
    },
    name: { // 仅load==true时可见
      type: String,
      value: ''
    },
    logo: { // 仅load==true时可见
      type: String,
      value: ''
    }
  },
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  attached() {
    // 处理传入的数据
    let that = this;
    that.setData({
      textColor: that._getColor(that.data.color)
    })
  },
  /**
   * 组件的初始数据
   */
  data: {
    textColor:'',
    type:''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    submitForm(e){
      let that = this;
      that.setData({
        showModal:false
      })
      that.triggerEvent('bindClick');
    },
    closeView(){
      let that = this;
      that.setData({
        showModal: false
      })
      that.triggerEvent("closeModal");
    },
    closeModal() {
      let that = this;
      console.log(that.data.shadow);
      if (that.data.shadow) {
        that.closeView();
      }
    },
    likeView(e) {
      let that = this;
      that.triggerEvent("likeView",[+e.currentTarget.dataset.index]);
    },
    openSetting(e){
      let that = this;
      console.log(e);
      that.setData({
        hidden: true
      })
      var app = getApp();
      app.saveFormId(e.detail.formId);
      wx.openSetting({
        success(res) {
          console.log(res.authSetting)
        }
      })
    },
    bindGetUserInfo(e) {
      let that = this;
      // 可以在这里直接处理自己的登录逻辑
      that.triggerEvent("getUserInfo", e);
    }
  }
})
