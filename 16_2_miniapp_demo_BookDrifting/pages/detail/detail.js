const request=require("../../utils/requests");
var star = require("../../utils/star");
var app = getApp();
var userid = app.globalData.userInfo.id;
Page({
  data:{
      id:"",
      friends:[],
  },
  onLoad:function(options){
      var that=this;
      that.setData({ id:options.id});
      wx.showToast({
          title: '加载中',
          icon: 'loading',
          duration: 10000
      })
      request.getBookById(that.data.id,function(res){
          var types =res.data;
          var rating = types.rating;
          rating.block = star.get_star(rating.average);
          res.data = types;
          console.log(res.data);
          that.setData({bookInfo:res.data});
      });
  },
  bindSubmit: function () {
    var that=this;
    wx.showModal({
      title: '确认收藏这本书吗？',
      content: '',
      success: function (res) {
        if(res.confirm==true){
          if(userid==null){
            wx.showModal({
              title: '收藏失败',
              content: '您还没有登陆，请先登录',
            })
          }
          else{
            wx.showModal({
              title: '收藏成功',
              content: '您可以在读书笔记页面查看您收藏的图书，并添加读书笔记',
            })
            wx.request({
              url: 'https://driftingbooks.xyz/favorites',
              data: {
                userId: userid,
                doubanId: that.data.id,
              },
              method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
              "Content-Type": "application/json",
            })

            wx.request({
              url: 'https://driftingbooks.xyz/notes',
              data: {
                userId: userid,
                doubanId: that.data.id,
              },
              method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
              "Content-Type": "application/json",
            })
            
          }
        }
      },
    })
  },
  bindDrift: function () {
    var that = this;
    var tmpname = that.data.bookInfo.title;
    var tmpdoubanid=that.data.id;
    console.log(tmpname)
    wx.showModal({
      title: '确认漂流这本书吗？',
      content: '',
      success: function (res) {
        if (res.confirm == true) {
          if (userid == null) {
            wx.showModal({
              title: '漂流失败',
              content: '您还没有登陆，请先登录',
            })
          }
          else {
            app.globalData.userInfo.preparebookname = tmpname;
            app.globalData.userInfo.preparedoubanid = tmpdoubanid;
            wx.switchTab({
              url: "../launch/launch",
            })
          }
        }
      },
    })
  },

  bindInvent: function () {
    var that = this;
    var tmpname = that.data.bookInfo.title;
    var tmpdoubanid = that.data.id;
    wx.showModal({
      title: '确认邀请好友共读此书吗？',
      content: '',
      success: function (res) {
        if (res.confirm == true) {
          if (userid == null) {
            wx.showModal({
              title: '邀请失败',
              content: '您还没有登陆，请先登录',
            })
          }
          else {
            wx.request({
              url: 'https://driftingbooks.xyz/friendship/' + userid,
              method: 'GET',
              success: function (res) {
                that.setData({
                  'friends': res.data
                })
                console.log("friends测试")
                for (var i = 0; i < that.data.friends.length; i++) {
                  console.log("第" + i + "行")
                  console.log(that.data.friends[i].hid);
                  wx.request({
                    url: 'https://driftingbooks.xyz/messages',
                    //这里的data是上传的数据
                    data: {
                      hid: that.data.friends[i].hid,
                      pid: that.data.friends[i].pid,
                      doubanId: that.data.id,
                      bName: that.data.bookInfo.title,
                    },
                    method: 'POST', 
                    "Content-Type": "application/json",
                  })

                }
              },
              fail: function () {
                console.log('获取失败');
              }
            })
            
            for(var i=0;i<that.data.friends.length;i++)
            {
                
            }


            wx.showModal({
              title: '已经向您的好友发送了邀请',
              content: '',
            })
          }
        }
      },
    })
  },


  onReady:function(){
    // 页面渲染完成
   wx.hideToast();
  },
  onShow:function(){
    console.log("显示");
    var that=this;
    console.log(that.data.id);
    userid = app.globalData.userInfo.id;
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  onShareAppMessage: function () {
    var that=this;
    var title = '分享' + that.data.bookInfo.title;
    var bookid=that.data.id;
    return {
      title: title,
      path: '/pages/detail/detail?id='+bookid,
    }
  }

})