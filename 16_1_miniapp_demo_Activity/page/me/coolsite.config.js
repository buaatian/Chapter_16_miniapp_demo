
var actions = [
  {
    "element_id": "wx_view4851235f", 
    "data": {
      "args": {
        "url": "../index/index", 
        "a_ids": [], 
        "e_ids": [], 
        "open_type": "switchTab", 
        "st": 1
      }, 
      "type": 0, 
      "exec": 5
    }, 
    "id": "M_9ddaba8c015b4bb0", 
    "isNew": true
  }, 
  {
    "element_id": "wx_view9a26c020", 
    "data": {
      "args": {
        "url": "../myinfo/myinfo", 
        "a_ids": [], 
        "e_ids": [], 
        "open_type": "navigate", 
        "st": 1
      }, 
      "type": 0, 
      "exec": 5
    }, 
    "id": "M_cc1a73bfd62090d2", 
    "isNew": true
  }, 
  {
    "element_id": "wx_viewbfe4c3f5", 
    "data": {
      "args": {
        "url": "../myactivity/myactivity", 
        "a_ids": [], 
        "e_ids": [], 
        "open_type": "navigate", 
        "st": 1
      }, 
      "type": 0, 
      "exec": 5
    }, 
    "id": "M_5443031abb3fe92b", 
    "isNew": true
  }
];

var animations = [];

var timelines = [
  {
    "iType": 0, 
    "isNew": true, 
    "animations": [], 
    "element_id": "body_46399a59eb2944e8", 
    "data": {
      "type": 0, 
      "t": {
        "rv": 0, 
        "rp": 0, 
        "wa": 0, 
        "de": 0, 
        "st": 1, 
        "du": 1, 
        "es": 0
      }, 
      "d": {}
    }, 
    "id": "M_c0f92e4aec7cb5af"
  }
];

getApp().coolsite360.DATA[__wxRoute] = {
   animations:animations,
   actions:actions,
   timelines:timelines
};

