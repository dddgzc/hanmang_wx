/**
 * 须知：添加图片有几种添加方式
 * 1.添加的同时上传，这样最后提交表单的时候便捷，但是会浪费一些多余的流量和服务器资源
 * 2.添加只保存本地url，最后提交表单的时候上传，这样最后提交的时候，会有用户的等待时间
 * 本组件采用的第二种方式
 * 第一种，以后再兼容
 */
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    num:{ // 上传图片的数量，默认是四张
      type: Number,
      value: 4
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    imageList: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    addImg(e){
      let that = this;
      that.setData({
        imageList:that.data.imageList.concat(e.detail)
      })
      that.triggerEvent('getImageList', that.data.imageList);
    },
    deleteImg(e){
      let that = this;
      that.setData({
        imageList: that.data.imageList.filter(item=> {
          return item!=e.detail;
        })
      })
      that.triggerEvent('getImageList', that.data.imageList);
    }
  }
})
