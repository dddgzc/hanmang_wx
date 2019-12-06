var hxBehavior = require('../x-behavior');
//  group: [
//   {
//     label: '', // 显示的checkbox值
//     value: '', // 选中的实际的值
//     checked: '' // 是否选中
//   }
// ]
Component({
  behaviors: [hxBehavior],
  /**
   * 组件的属性列表
   */
  properties: {
    modal:{
      type: String,
      value: '',
    },
    checked: {
      type: Boolean,
      value: false
    },
    maxlength: {
      type: Number,
      value: -1
    },
    minlength: {
      type: Number,
      value: -1
    }
  },
  attached() {
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
    console.log(that.data.value);
  },
  detached() {
    let that = this;
    that.data.arr = (that.data.modal || '').split('.');
    if (that.data.require) {
      delete that.data.page.data._require['_' + that.data.modal];
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    checkChangeGroup(e) {
      let that = this;
      let max = false;
      let min = false
      let arr = that.data.value.map(item => {
        if(e.detail.value.includes(item.value)) {
          if (that.data.maxlength > 0 && e.detail.value.length > that.data.maxlength){
            max = true;
          }else{
            item.checked = true;
          }
        }else{
          if (that.data.minlength > 0 && e.detail.value.length < that.data.minlength) {
            min = true;
          } else {
            item.checked = false;
          }
        }
        return item;
      })
      if (max||min) {
        wx.showModal({
          title: '提示',
          content: '最' + (max ? '多' : '少') + '选择' + (max ? that.data.maxlength : that.data.minlength) + "个选项哦",
          showCancel: false,
          confirmText: "我知道了"
        })
        that.setData({
          value: arr,
        })
      }
      that.adjectiveBindData(arr);
    }
  }
})
