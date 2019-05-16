//index.js
//获取应用实例
var app = getApp();
const request=require("../../utils/requests");
var star = require("../../utils/star");

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    count:0,
    imgUrls:[
      "../../images/pic5.jpg",
      "../../images/pic6.jpg"
      ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    toRe:0,
    value:"Hello",
    temp:[]
  },
  changeValue: function (e) {
    this.setData({ value: e.detail.value });
  },
  jumpToSearch:function(){
    var that=this;
    console.log(that.data.value)
    wx.navigateTo({
      url: '../../pages/search/search?id='+that.data.value
    })
  },
  toHandel:function () {
      var that=this;
      wx.showToast({
          title: '加载中',
          icon: 'loading',
          duration: 1000
      })
      request.getBookList(that.data.toRe,"",function(res){
          var types = res.data.books;
          for (var i = 0; i < types.length; ++i) {
              var book = types[i];
              var rating = book.rating;

              rating.block = star.get_star(rating.average);
          }
          res.data.books = types;
          console.log(res.data.books);
          if(res.data.count==0){
              return;
          }
          that.setData({bookList:res.data.books,count:that.data.count+res.data.count});
      });
  },
  toRefresh: function (e) {
      var that=this;
      this.setData({
          toRe : star.toRefresh()
      });
      that.toHandel();
      console.log("随机换一个栏目ID");
      console.log(that.data.toRe);
  },

  onLoad:function (options) {
    
  },
  upper: function(e) {
    console.log("已到顶部");

  },
  onShow: function () {
    var that = this;
    wx.request({
      url: 'https://driftingbooks.xyz/freq',
      method: 'GET',
      success: function (res) {
        console.log(res.data);
        var a = res.data;
        a.sort(function (a, b) {
          return b.favoredCount - a.favoredCount;
        })
        var j = 0;
        var b = [];
        that.setData({ temp: [] });
        for (var i = 0; i < 9; ++i) {
          wx.request({
            url: 'https://api.douban.com/v2/book/' + a[i].doubanId,
            success: function (res) {
              var b = that.data.temp;
              b.push(res.data);
              that.setData({ temp: b });
              console.log(that.data.temp.length);
            }
          })
        }

      }
    })
  },
  

  lower: function(e) {
    console.log("已到底部");
    var that=this;
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    });
    request.getBookList(that.data.toRe,{start:that.data.count},function(res){
        var types = res.data.books;
        for (var i = 0; i < types.length; ++i) {
            var book = types[i];
            var rating = book.rating;
            rating.block = star.get_star(rating.average);
        }
        res.data.books = types;
        console.log(res.data.books);
      if(res.data.count==0){return;}
      that.setData({bookList:that.data.bookList.concat(res.data.books),count:that.data.count+res.data.count});
      wx.hideToast();
    })
  }
})
