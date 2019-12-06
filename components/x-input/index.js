// components/hx-input/hx-input.js
var hxBehavior = require('../x-behavior');
Component({
  behaviors: [hxBehavior],
  /**
   * 组件的属性列表
   */
  properties: {
    modal:{
      type: String,
      value: ''
    },
    maxlength:{
      type: Number,
      value:-1
    },
    type:{
      type: String,
      value: 'input'
    },
    inputType: {
      type: String,
      value: 'text'
    },
    placeholder: {
      type: String,
      value: '输入内容...'
    },
    label: {
      type: String,
      value: ''
    },
    inputType: {
      type: String,
      value: 'text'
    },
    require:{
      type:String,
      value: ''
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    arr: []
  },
  attached(){
    let that = this;
    that.data.arr = (that.data.modal || '').split('.');
    if (that.data.require) {
      let obj = {};
      obj['_' + that.data.modal] = {
        prop: '_' + that.data.modal,
        name: that.data.label || that.data.require
      };
      that.data.page.data._require = Object.assign(that.data.page.data._require || {}, obj);
    }
  },
  detached() {
    let that = this;
    that.data.arr = (that.data.modal || '').split('.');
    if (that.data.require) {
      delete that.data.page.data._require['_' + that.data.modal];
    }
  },
  
  /**
   * 组件的方法列表
   */
  methods: {
    _bindInput(e) {
      let that = this;
      that.adjectiveBindData(e.detail.value);
    },
    _bindDateChange(e){
      let that = this;
      console.log(e);
      that.setData({
        value: e.detail.value
      })
      that.adjectiveBindData(e.detail.value);
    }
  }
})
