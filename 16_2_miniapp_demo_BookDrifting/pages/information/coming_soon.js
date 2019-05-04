var app = getApp()
const urlUser = 'https://driftingbooks.xyz/users/';
const urlFriendList = 'https://driftingbooks.xyz/friendship/';
const loginKey = 'loginKey';
Page({
  data: {
    userInfo: {
      userId: "",
      password: "",
      userName: "",
      age: 1,
      city: "",
      sex: "m",
      flowerCount: 0
    },
    pwd: '',
    repwd: '',
    tempId: '',
    tempPwd: '',
    mine_list: [
      {
        "pic_url": "/images/btn-04.png",
        "title": "修改信息",
        "url": '../alterInfo/alterInfo'
      },
      {
        "pic_url": "/images/btn-01.png",
        "title": "我的活动",
        "url": "../index1/index"
      },
      {
        "pic_url": "/images/btn-02.png",
        "title": "我的日程",
        "url": "../scheduleIndex/index"
      },
      {
        "pic_url": "/images/btn-03.png",
        "title": "我的消息",
        "url": "../message/message"
      }
    ],
    friendList: [],
    item: {
      pageType: 'login',
    },
    sendFlowers: false,
    friendId: '',
    addFriend: false,
    delFriends: false,
    friendListLoad:true,
  },
  onLoad: function (options) {
    var that=this;
    var user = wx.getStorageSync(loginKey);
    if (!user) {
      this.setData({ 'item.pageType': 'login' });
      wx.setStorage({
        key: 'myScheduleItemKey',
        data: []
      })
    } else {
      app.globalData.userInfo.id = user.userId;
      wx.request({
        url: urlUser + user.userId,
        method: 'GET',
        success: function (res) {
          if (res.data[0]) {
            that.setData({ userInfo: res.data[0] })
            var localUser = that.data.userInfo;
            wx.setStorage({
              key: loginKey,
              data: localUser
            })
          }else{
            that.quit();
            return ;
          }
        },
        fail: function (res) {
        },
      })
      this.getFriendList();
      this.setData({ 'item.pageType': 'userInfo' });
    }
  },

  // onPullDownRefresh: function () {
  //   var user = wx.getStorageSync(loginKey);
  //   app.globalData.userInfo.id = user.userId;
  //   this.setData({ userInfo: user });
  //   this.getFriendList();
  // },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var user = wx.getStorageSync(loginKey);
    if (!user) {
      this.setData({ 'item.pageType': 'login' });
    } else {
      app.globalData.userInfo.id = user.userId;
      this.setData({ userInfo: user, friendListLoad:true});
      this.getFriendList();
      this.setData({ 'item.pageType': 'userInfo' });
    }
  },

  // onShow: function () {
  //   console.log("ONSHOW");
  //   var user = wx.getStorageSync(loginKey);
  //   if (user.userId == null) {
  //     this.setData({ 'item.pageType': 'login' });
  //   } else {
  //     app.globalData.userInfo.id = user.userId;
  //     console.log(app.globalData.userInfo.id + ' 1 ' + user.userId)
  //     this.setData({ userInfo: user });
  //     this.getFriendList();
  //     this.setData({ 'item.pageType': 'userInfo' });
  //   }
  // },
  getFriendList: function () {
    var that = this;
    var localUser = wx.getStorageSync(loginKey);
    wx.request({
      url: urlFriendList + localUser.userId + '/info',
      method: 'GET',
      success: function (res) {
        that.setData({ friendList: res.data, friendListLoad:false });
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  getUserInfo: function (e) {
    var that = this;
    that.setData({
      tempId: e.detail.value
    });
    var id = that.data.tempId;
    var localUser = that.data.userInfo;
    if (id != localUser.userId && id != '') {
      wx.request({
        url: urlUser + id,
        method: 'GET',
        success: function (res) {
          if (res.data[0]) {
            that.setData({ userInfo: res.data[0] })
          } 
        },
        fail: function (res) {
        },
      })
    }
  },
  saveuserpwd: function (event) {
    this.setData({
      tempPwd: event.detail.value
    });
  },
  modalconfirm: function () {
    var that = this;
    var id = that.data.tempId;
    var pwd = that.data.tempPwd;
    var localUser = that.data.userInfo;
    if (id != localUser.userId && id != '') {
      wx.request({
        url: urlUser + id,
        method: 'GET',
        success: function (res) {
          if (res.data[0]) {
            that.setData({ userInfo: res.data[0] })
          }else{
            wx.showModal({
              title: '帐号未注册',
              showCancel: false,
            })
            return;
          }
        },
        fail: function (res) {
          wx.showModal({
            title: '请检查网络连接',
            showCancel: false,
          })
          return;
        },
      })
    }
    if (id == '' || pwd == '') {
      wx.showModal({
        title: '帐号、密码不能为空',
        showCancel: false,
      })
      return;
    }
    var localUser = that.data.userInfo;
    if (id == localUser.userId && pwd == localUser.password) {
      that.setData({ friendListLoad: true })
      app.globalData.userInfo.id = id;
      wx.request({
        url: urlFriendList + id + '/info',
        method: 'GET',
        success: function (res) {
          that.setData({ friendList: res.data, friendListLoad: false });
        },
      });
      wx.request({
        url: urlUser + id,
        method: 'GET',
        success: function (res) {
          if (res.data[0]) {
            that.setData({ userInfo: res.data[0] })
            that.setData({
              'item.pageType': 'userInfo'
            });
            var localUser = that.data.userInfo;
            wx.setStorage({
              key: loginKey,
              data: localUser
            })
          } else {
            wx.showModal({
              title: '用户不存在',
              showCancel: false,
            })
            return;
          }
        },
        fail: function (res) {
          wx.showModal({
            title: '请检查网络连接',
            showCancel: false,
          })
          return;
        },
      })
    } else {
      wx.showModal({
        title: '帐号、密码错误',
        showCancel: false,
      })
    }
  },
  modalcancel: function () {
    wx.switchTab({
      url: "../index/index",
    })
  },
  quit: function () {
    app.globalData.userInfo.id = null;
    wx.removeStorageSync(loginKey);
    wx.setStorage({
      key: 'myScheduleItemKey',
      data: []
    });
    this.setData({
      'item.pageType': 'login',
      userInfo: {
        userId: "",
        password: "",
        userName: "",
        age: 1,
        city: "",
        sex: "m",
        flowerCount: 0
      },
      tempId: '',
      tempPwd: '',
      friendList: [],
      friendListLoad: true,
    })
  },
  registerFun: function () {
    this.setData({
      'item.pageType': 'register',
      userInfo: {
        userId: "",
        password: "",
        userName: "",
        age: 1,
        city: "",
        sex: "m",
        flowerCount: 0
      },
    })
  },
  viewSendFlower: function (e) {
    var ds = e.currentTarget.dataset;
    this.setData({
      'sendFlowers': true,
      friendId: ds.id
    })
  },
  cancelSendFlower: function () {
    this.setData({
      'sendFlowers': false,
      friendId: ''
    })
  },
  confirmSendFlower: function () {
    wx.request({
      url: urlUser + this.data.friendId + '/1',
      method: 'POST',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
    this.getFriendList();
    this.setData({
      'sendFlowers': false,
      friendId: ''
    })
  },
  registerConfirm: function () {
    var that = this;
    if (that.data.pwd != that.data.repwd) {
      wx.showModal({
        title: '密码不一致',
        content: '',
        showCancel: false,
      });
      return;
    }
    var id = that.data.tempId;
    for (var i = 0, l = id.length; i < l; i++) {
      console.log(id[i]);
      if ((id[i] >= 'a' && id[i] <= 'z') || (id[i] >= 'A' && id[i] <= 'Z') || (id[i] >= '0' && id[i] <= '9')) {
        continue;
      } else {
        wx.showModal({
          title: '帐号只能由字母或数字组成',
          content: '',
          showCancel: false,
        });
        return;
      }
    }
    that.setData({ 'userInfo.password': that.data.pwd });
    var user = that.data.userInfo;
    if (user.userId.length < 6) {
      wx.showModal({
        title: '帐号不能少于6字符',
        content: '',
        showCancel: false,
      });
      return;
    }
    if (user.password == '' || user.userName == '') {
      wx.showModal({
        title: '信息不完整',
        content: '',
        showCancel: false,
      });
      return;
    }

    wx.request({
      url: urlUser,
      data: user,
      method: 'POST',
      success: function (res) {
        if (res.data == 0) {
          wx.showModal({
            title: '注册成功',
            content: '',
            showCancel: false,
          });
          that.setData({ friendListLoad: true })
          that.getFriendList();
          that.setData({
            'item.pageType': 'userInfo'
          });
          wx.setStorage({
            key: loginKey,
            data: user
          })
        }else{
          wx.showModal({
            title: '注册失败',
            content: '',
            showCancel: false,
          });
        }
      },
      fail: function (res) {
        wx.showModal({
          title: '注册失败',
          content: '',
          showCancel: false,
        });
      },
      complete: function (res) { },
    })
  },
  registerCancel: function () {
    this.setData({
      'item.pageType': 'login'
    })
  },
  saveId: function (e) {
    var that = this;
    that.setData({
      tempId: e.detail.value
    });
    var id = that.data.tempId;
    if (id == '') return;
    for(var i=0,l=id.length;i<l;i++){
      console.log(id[i]);
      if ((id[i] >= 'a' && id[i] <= 'z') || (id[i] >= 'A' && id[i] <= 'Z') || (id[i] >= '0' && id[i] <= '9')){
        continue;
      }else{
        wx.showModal({
          title: '帐号只能由字母或数字组成',
          content: '',
          showCancel: false,
        });
        return;
      }
    }
    wx.request({
      url: urlUser + id + '/check',
      method: 'GET',
      success: function (res) {
        if (res.data == 0) {
          wx.showModal({
            title: '该帐号已被注册',
            content: '',
            showCancel: false,
          });
        } else {
          console.log(id)
          that.setData({ 'userInfo.userId': id });
          console.log(that.data.userInfo.userId)
        }
      },
      fail: function (res) {
      },
    })
  },
  saveName: function (e) {
    this.setData({ 'userInfo.userName': e.detail.value })
  },
  saveAge: function (e) {
    this.setData({ 'userInfo.age': e.detail.value })
  },
  saveCity: function (e) {
    this.setData({ 'userInfo.city': e.detail.value })
  },
  // saveSex: function (e) {
  //   this.setData({ 'userInfo.sex': e.detail.value });
  // },
  savePwd: function (e) {
    var val = e.detail.value;
    if (val.length < 6) {
      wx.showModal({
        title: '密码不能少于6字符',
        content: '',
        showCancel: false,
      });
      return;
    }
    this.setData({ 'pwd': val })
  },
  saveRePwd: function (e) {
    this.setData({ 'repwd': e.detail.value });
  },
  addFriends: function () {
    this.setData({ addFriend: true, friendId: '' })
  },
  getFriendId: function (e) {
    this.setData({ 'friendId': e.detail.value });
  },
  cancelAddFriend: function () {
    this.setData({ addFriend: false, friendId: '' })
  },
  confirmAddFriend: function () {
    var that = this;
    var id = that.data.friendId;
    if (id == '') {
      wx.showModal({
        title: '请输入好友帐号',
        content: '',
        showCancel: false,
      });
      return;
    }
    var user = wx.getStorageSync(loginKey);
    if (id == user.userId) {
      wx.showModal({
        title: '不能添加自己',
        content: '',
        showCancel: false,
      });
      return;
    }
    wx.request({
      url: urlUser + id + '/check',
      method: 'GET',
      success: function (res) {
        if (res.data != 0) {
          that.setData({ tempId: '' });
          wx.showModal({
            title: '该帐号不存在',
            content: '',
            showCancel: false,
          });
        } else {
          wx.request({
            url: urlFriendList,
            data: {
              hid: user.userId,
              pid: id,
            },
            method: 'POST',
            success: function (res) {
              that.getFriendList();
              that.setData({ addFriend: false, friendId: '' })
            },
            fail: function (res) { },
            complete: function (res) { },
          })
        }
      },
      fail: function (res) {
        wx.showModal({
          title: '添加失败',
          content: '',
          showCancel: false,
        });
      },
    })
  },
  viewDelFriends:function (e) {
    var ds = e.currentTarget.dataset;
    this.setData({
      'delFriends': true,
      friendId: ds.id,
      tempId: ds.index
    })
  },
  canceldelFriend:function () {
    this.setData({
      'delFriends': false,
      friendId: '',
      tempId: ''
    })
  },
  confirmdelFriend:function () {
    var that = this;
    var user = wx.getStorageSync(loginKey);
    var fid = that.data.friendId;
    wx.request({
      url: urlFriendList,
      data: {
        hid: user.userId,
        pid: fid,
      },
      method: 'DELETE',
      success: function (res) {
        that.getFriendList();
        that.setData({ delFriends: false, friendId: '' })
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  }
})