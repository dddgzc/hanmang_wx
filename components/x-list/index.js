// components/hx-list/idnex.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    content:{
      type: String,
      value: '',
      observer: function (newVal, oldVal) {
        // 属性值变化时执行
        let that = this;
        that._initData(newVal);
      }
    },
    order:{ // 是否为有序列表
      type:Boolean,
      value:true
    },
    title: { // 是否为有序列表
      type: String,
      value: ''
    }
  },
  attached(){
    let that = this;
    console.log(that.data.order);
    // that._initData("12312");
  },
  /**
   * 组件的初始数据
   */
  data: {
    _listData:[]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * formatdata
     */
    _initData(val){
      let that = this;
      console.log(val)
      if(val){
        let arr = val.split('\n');
        that.setData({
          _listData: arr.map(item=>{
            return {
              content: item
            }
          })
        })
      }
    }
  }
})
