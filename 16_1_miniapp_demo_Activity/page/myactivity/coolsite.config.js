
var actions = [
  {
    "element_id": "wx_text367053fd", 
    "data": {
      "args": {
        "url": "../showposition/showposition", 
        "st": 1, 
        "e_ids": [], 
        "open_type": "navigate", 
        "a_ids": []
      }, 
      "type": 0, 
      "exec": 5
    }, 
    "id": "M_a8d425cbae23b54a", 
    "isNew": true
  }, 
  {
    "element_id": "wx_viewda26faee", 
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
    "id": "M_23fb8a545c24d88d", 
    "isNew": true
  }, 
  {
    "element_id": "_other_text3ed408c0", 
    "data": {
      "args": {
        "url": "../editactivity/editactivity", 
        "a_ids": [], 
        "e_ids": [], 
        "open_type": "navigate", 
        "st": 1
      }, 
      "type": 0, 
      "exec": 5
    }, 
    "id": "M_122a6d082e695582", 
    "isNew": true
  }, 
  {
    "element_id": "_other_text8fbc21ac", 
    "data": {
      "args": {
        "url": "../showsignuplist/showsignuplist", 
        "a_ids": [], 
        "e_ids": [], 
        "open_type": "navigate", 
        "st": 1
      }, 
      "type": 0, 
      "exec": 5
    }, 
    "id": "M_b609acee414af31d", 
    "isNew": true
  }
];

var animations = [];

var timelines = [
  {
    "iType": 0, 
    "isNew": true, 
    "animations": [], 
    "element_id": "body_79515c72dc3024d4", 
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
    "id": "M_8563872c2fdb9de5"
  }
];

getApp().coolsite360.DATA[__wxRoute] = {
   animations:animations,
   actions:actions,
   timelines:timelines
};

