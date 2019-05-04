var app = getApp()
Page({
  data: {
    latitude: 0,//纬度 
    longitude: 0,//经度 
    covers:[],
  },
  onLoad: function (options) {
    var that=this;
    var urll = '../../images/location.png'
    that.setData({
      longitude:Number(options.wd),
      latitude:Number(options.jd),
      covers: [{
        longitude: Number(options.wd),
        latitude: Number(options.jd),
        iconPath: urll,
        rotate: 0
      }],
    })
    console.log("onload")
    console.log(that.data)
  },
})