// components/hx-scroll/hx-scroll.js
const utils = require('../../utils/util')
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    height:{ // 如果是数字默认是px，否则按照传入计算
      type: String,
      optionalTypes: [Number],
      value: '100%'
    }
  },
  attached(){
    // 处理传入的数据
    let that = this;
    if (utils.isNumber(that.data.height)){
      that.setData({
        height: that.data.height+'px'
      })
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    loadMore: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    scrollBottom(){
      let that = this;
      that.setData({
        loadMore: true
      })
      that.triggerEvent('loadMore');
      setTimeout(() => {
        that.setData({
          loadMore: false
        })
      }, 2000);
    },
    refresh() {
      let that =this;
      that.triggerEvent('refresh');
    }
  }
})
