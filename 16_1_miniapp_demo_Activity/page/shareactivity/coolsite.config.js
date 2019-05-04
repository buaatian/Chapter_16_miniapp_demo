
var actions = [
  {
    "element_id": "wx_view_253b7108", 
    "data": {
      "args": {
        "url": "../signup/signup", 
        "a_ids": [], 
        "e_ids": [], 
        "open_type": "navigate", 
        "st": 1
      }, 
      "type": 0, 
      "exec": 5
    }, 
    "id": "M_4ef903a4fb717f37", 
    "isNew": true
  }, 
  {
    "element_id": "wx_text367053fd", 
    "data": {
      "args": {
        "url": "../showposition/showposition", 
        "a_ids": [], 
        "e_ids": [], 
        "open_type": "navigate", 
        "st": 1
      }, 
      "type": 0, 
      "exec": 5
    }, 
    "id": "M_a8d425cbae23b54a", 
    "isNew": true
  }
];

var animations = [];

var timelines = [
  {
    "iType": 0, 
    "isNew": true, 
    "animations": [], 
    "element_id": "body_55dd08a517f08120", 
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
    "id": "M_bd9f6640197cb86f"
  }
];

getApp().coolsite360.DATA[__wxRoute] = {
   animations:animations,
   actions:actions,
   timelines:timelines
};

