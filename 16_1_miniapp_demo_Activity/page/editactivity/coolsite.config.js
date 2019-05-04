var actions = [
  {
    "element_id": "wx_button_02cb4df9", 
    "data": {
      "args": {
        "url": "../shareactivity/shareactivity", 
        "a_ids": [], 
        "e_ids": [], 
        "open_type": "redirect", 
        "st": 1
      }, 
      "type": 0, 
      "exec": 5
    }, 
    "id": "M_db270f8399444bdb", 
    "isNew": true
  }, 
  {
    "element_id": "wx_button_3e06f210", 
    "data": {
      "args": {
        "url": "../myactivity/myactivity", 
        "a_ids": [], 
        "e_ids": [], 
        "open_type": "redirect", 
        "st": 1
      }, 
      "type": 0, 
      "exec": 5
    }, 
    "id": "M_4a7a6bc2614b8662", 
    "isNew": true
  }
];

var animations = [];

var timelines = [
  {
    "iType": 0, 
    "isNew": true, 
    "animations": [], 
    "element_id": "body_78da6dc992671fd0", 
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
    "id": "M_4a7b75cfbe8db9fd"
  }
];

getApp().coolsite360.DATA[__wxRoute] = {
   animations:animations,
   actions:actions,
   timelines:timelines
};

