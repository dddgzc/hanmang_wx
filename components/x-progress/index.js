// components/x-progress/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    stroke:{
      type: Number,
      value: 8
    },
    color:{
      type: String,
      value: "#ef8383"
    },
    percent:{
      type: Number,
      value: 0,
      observer: function (newVal, oldVal) {
        // 属性值变化时执行
        let that = this;
        that.setAnimation(newVal, oldVal)
      }
    },
    label:{
      type: String,
      value: ""
    },
    total:{
      type: Number,
      value: 100,
      observer: function (newVal, oldVal) {
        // 属性值变化时执行
        let that = this;
        if (that.data.totalStatus)
          that.setTotal(newVal, oldVal)
        else{
          that.data.totalStatus = true;
        }
      }
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    animationData: {},
    upLevel: false
  },
  attached() {

  },
  /**
   * 组件的方法列表
   */
  methods: {
    setAnimation(newVal,oldVal){
      let that = this;
      setTimeout(() => {
        if(!that.data.upLevel){
          if (newVal <= that.data.total) {
            let width = '0%';
            if (newVal == that.data.total) {
              width = "100%";
            } else {
              width = ((newVal % that.data.total) / that.data.total) * 100 + "%";
            }
            let animation = wx.createAnimation({
              duration: 500,
              timingFunction: 'ease',
            })
            animation.width(width).step()
            that.setData({
              animationData: animation.export()
            })
          } else{
            that.data.percent = (newVal % that.data.total);
            that.setTotal();
          }
        }
      },100)
    },
    setTotal(){
      let that = this;
      console.log("升级");
      that.data.upLevel = true;
      let animation1 = wx.createAnimation({
        duration: 400,
        timingFunction: 'ease',
      })
      animation1.width('100%').step()
      that.setData({
        animationData: animation1.export()
      })
      setTimeout(() => {
        let animation2 = wx.createAnimation({
          duration: 10,
          timingFunction: 'ease',
        })
        animation2.width(0).opacity(0).step()
        that.setData({
          animationData: animation2.export()
        })
      },400)
      setTimeout(() => {
        let animation3 = wx.createAnimation({
          duration: 400,
          timingFunction: 'ease',
        })
        let width = (that.data.percent / that.data.total) * 100 + "%";
        animation3.width(width).opacity(1).step()
        that.setData({
          animationData: animation3.export(),
          upLevel: false
        })
      }, 500)
    }
  }
})
