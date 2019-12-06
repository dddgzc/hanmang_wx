// components/hx-botton/hx-bottom.js
const utils = require('../../utils/util')
var hxBehavior = require('../x-behavior');
Component({
  externalClasses: ['circle'],
  behaviors: [hxBehavior],
  /**
   * 组件的属性列表
   */
  properties: {
    tag: {
      type: Boolean,
      value: false
    },
    radius: { // 按钮类型，‘primary’，‘circle’
      type: String,
      value: 'round'
    },
    theme: { // 'text', 'line'
      type: String,
      value: '',
      observer: function (newVal, oldVal) {
        // 属性值变化时执行
        let that = this;
        that._initColor();
      }
    },
    color: { // 'text', 'line'
      type: String,
      value: 'primary'
    },
    icon: {
      type: String,
      value: ''
    },
    label: {
      type: String,
      value: ''
    },
    disable: {
      type: Boolean,
      value: false
    },
    height: {
      type: String,
      value: '50px',
      optionalTypes: [Number]
    },
    width: {
      type: String,
      value: '90%',
      optionalTypes: [Number]
    },
    margin: {
      type: String,
      value: "4px auto"
    },
    info: {
      type: String,
      value: '',
      optionalTypes: [Number, Boolean],
    }
  },
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  attached() {
    // 处理传入的数据
    let that = this;
    if (utils.isNumber(that.data.height)) {
      that.setData({
        height: that.data.height + 'px'
      })
    }
    if (utils.isNumber(that.data.width)) {
      that.setData({
        width: that.data.width + 'px'
      })
    }
    that._initColor();
  },
  /**
   * 组件的初始数据
   */
  data: {
    tempObj: {},
    textColor: '',
    bg: '',
    border: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _submitEvent(e) {
      let that = this;
      if (that.diffForm()) {
        that.triggerEvent('submit', {
          formId: e.detail.formId,
          data: that.data.info
        });
      }
    },
    diffForm() {
      let that = this;
      let pages = getCurrentPages();
      let page = pages[pages.length - 1];
      if (page.data._require) {
        for (let item in page.data._require) {
          let tempItem = item.split('_')[1];
          that.data.tempObj[tempItem] = '';
          that.checkNull(tempItem, page.data);
          if (!that.data.tempObj[tempItem]) {
            wx.showToast({
              title: page.data._require[item].name + '必须要填哦',
              duration: 1000,
              mask: true,
              icon: 'none'
            })
            return false;
          }
        }
        return true;
      } else {
        return true;
      }
    },
    checkNull(key, data) {
      let that = this;
      for (let item in data) {
        if (Object.prototype.toString.call(data[item]) === '[object Object]') {
          that.checkNull(key, data[item]);
        } else {
          if (item === key) {
            that.data.tempObj[key] = data[key].trim();
            break;
          }
        }
      }
    },
    /**
     * 初始化颜色
     */
    _initColor() {
      let that = this;
      let color = that._getColor();
      switch (that.data.theme) {
        case 'line':
          that.data.border = color + ' 1px solid';
          that.data.textColor = color;
          that.data.bg = "rgba(0,0,0,0)";
          break;
        case 'text':
          that.data.border = '1px rgba(0,0,0,0) solid';;
          that.data.textColor = color;
          that.data.bg = 'rgba(0,0,0,0)';
          break;
        default:
          that.data.border = color + ' 1px solid';
          that.data.textColor = 'white';
          that.data.bg = color;
          break;
      }
      that.setData({
        border: that.data.border,
        bg: that.data.bg,
        textColor: that.data.textColor
      })
    }
  }
})
