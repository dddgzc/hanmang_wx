// components/hx-swiper/index.js
Component({
  /**
   * 传入的images数据结构
   *  item: {
   *    image: '',
   *    target: '跳转路径'，//传入则对应跳转，否则不用传
   *    
   *  }
   */
  properties: {
    images: {
      type: Array,
      value: []
    },
    autoplay:{ // 是否自动播放
      type: Boolean,
      value: false
    },
    autoplay: { // 是否自动播放
      type: Boolean,
      value: false
    },
    interval: { // 间隔，毫秒，autoplay
      type: Number,
      value: 5000
    },
    withBg:{ //是否带有背景联动，建议如果开启自动轮播不开启该功能
      type: Boolean,
      value: false
    }
  },
  attached() {
    let that = this;
    if(that.data.withBg){
      that.setData({
        swiperBg: that.data.images[0].image
      })
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    swiperCurrent: 0,
    swiperBg: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 滑动监听事件
     */
    _swiperChange(e){
      let that = this;
      console.log(that.data.withBg);
      let index = +e.detail.current;
      if(that.data.withBg){
        that.setData({
          swiperBg: that.data.images[index].image
        })
      }
      that.triggerEvent('swiperChange',index);
    },
    /**
     * 点击事件
     */
    _bindItem(e){
      let that =this;
      let index = +e.currentTarget.dataset.index;
      if(that.data.images[index].target){
        wx.navigateTo({
          url: that.data.images[index].target,
        })
      }
      that.triggerEvent('clickItem', index);
    }
  }
})
