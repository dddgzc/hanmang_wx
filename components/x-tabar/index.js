// components/hx-tabar/hx-tabar.js
Component({
  externalClasses: ['tab-pos'],
  /**
   * 组件的属性列表
   */
  properties: {
    tabList: {
      type: Array,
      value:[]
    },
    circle: {
      type: Number,
      value: -1
    },
    tabLine: { // tabbar的line动画
      type: Boolean,
      value: false
    },
    direct:{
      type: String,
      value: 'col'
    }
  },
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的初始数据
   */
  data: {
    activeIndex: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    clickItem(event) {
      let that = this;
      let index = +event.currentTarget.dataset.index;
      if(that.data.tabList[index].target) {
        wx.navigateTo({
          url: that.data.tabList[index].target,
        })
      }
      that.triggerEvent('clickItem', index);
      console.log(event);
      //const { detail = {} } = event;
      // const { value = '' } = detail;

    }
  }
})
