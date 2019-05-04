var app = getApp();
var userid = app.globalData.userInfo.id;
Page({
  data: {
    trips: [],
    name: "nu",
  },
  onLoad: function () {
    console.log('漂流活动页面测试')
    console.log(app.globalData.userInfo.id)
    var that = this
    app.getUserInfo(function (userInfo) {
      that.setData({
        userInfo: userInfo
      })
    })

    wx.request({
      url: 'https://driftingbooks.xyz/activities/'+userid,
      method: 'Get',
      success: function (res) {
        console.log("个人活动获取成功");
        that.setData({
          'trips': res.data
        })
        console.log(that.data.trips);
      },
      fail: function () {
        console.log('获取失败');
      }
    })
  },

  onShow: function () {
    var that = this;
    app.getUserInfo(function (userInfo) {
      that.setData({
        userInfo: userInfo
      })
    })
    userid = app.globalData.userInfo.id;
    wx.request({
      url: 'https://driftingbooks.xyz/activities/'+userid,
      method: 'Get',
      success: function (res) {
        console.log("获取成功");
        that.setData({
          'trips': res.data
        })
        console.log(that.data.trips);
      },
      fail: function () {
        console.log('获取失败');
      }
    })
  },
})



