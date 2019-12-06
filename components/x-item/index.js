// components/hx-item/hx-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    direction:{ // 子布局的朝向
      type:String,
      value:'center'
    },
    bindData:{
      type: String,
      value: '',
      optionalTypes: [Number,Boolean],
    },
    clickTarget:{
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    start: 0,
    isMove: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _touchStart(e){
      let that = this;
      that.data.isMove = false;
      that.data.start = e.timeStamp;
    },
    _bindtouchend(e) {
      let that = this;
      if (that.data.isMove) {
        return;
      }
      if(e.timeStamp-that.data.start>400){//长按
        that.triggerEvent('longClick', that.data.bindData);
      }else{ // 点击事件
        that.triggerEvent('click', that.data.bindData);
        if (that.data.clickTarget) {
          wx.navigateTo({
            url: that.data.clickTarget,
          })
        }
      }
      that.data.start = e.timeStamp;
    },
    _bindtouchmove(e) {
      let that = this;
      that.data.isMove = true;
    }
  }
})
