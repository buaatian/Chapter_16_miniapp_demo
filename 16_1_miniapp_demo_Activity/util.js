function formatTime(time) {
    if (typeof time !== 'number' || time < 0) {
        return time
    }

    var hour = parseInt(time / 3600)
    time = time % 3600
    var minute = parseInt(time / 60)
    time = time % 60
    var second = time

    return ([hour, minute, second]).map(function (n) {
        n = n.toString()
        return n[1] ? n : '0' + n
    }).join(':')
}

function formatLocation(longitude, latitude) {
    if (typeof longitude === 'string' && typeof latitude === 'string') {
        longitude = parseFloat(longitude)
        latitude = parseFloat(latitude)
    }

    longitude = longitude.toFixed(2)
    latitude = latitude.toFixed(2)

    return {
        longitude: longitude.toString().split('.'),
        latitude: latitude.toString().split('.')
    }
}
function getNowFormatDateTime() {
        var  date =  new  Date();
        var  seperator1 =  "-";
        var  seperator2 =  ":";
        var  month = date.getMonth() + 1;
        var  strDate = date.getDate();
        if  (month >= 1 && month <= 9) {
                month =  "0"  + month;
        }
        if  (strDate >= 0 && strDate <= 9) {
                strDate =  "0"  + strDate;
        }
        var  currentdatetime = date.getFullYear() + seperator1 + month + seperator1 + strDate
                    +  " "  + date.getHours() + seperator2 + date.getMinutes()
                    + seperator2 + date.getSeconds();
        return  currentdatetime;
}
function getNowFormatDate() {
        var  date =  new  Date();
        var  seperator1 =  "-";
        var  seperator2 =  ":";
        var  month = date.getMonth() + 1;
        var  strDate = date.getDate();
        if  (month >= 1 && month <= 9) {
                month =  "0"  + month;
        }
        if  (strDate >= 1 && strDate <= 9) {
                strDate =  "0"  + strDate;
        }
        var  currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
        return  currentdate;
}
function getNowFormatTime() {
        var  date =  new  Date();
        var  seperator1 =  "-";
        var  seperator2 =  ":";
    //     var  month = date.getMonth() + 1;
    //     var  strDate = date.getDate();
    //     if  (month >= 1 && month <= 9) {
    //             month =  "0"  + month;
    //     }
    //     if  (strDate >= 0 && strDate <= 9) {
    //             strDate =  "0"  + strDate;
    //     }
    var hour = date.getHours();
    var minute = date.getMinutes();
    if(hour >= 0 && hour <= 9){
        hour = "0"+hour;
    }
    if(minute >=0 && minute <= 9){
        minute = "0"+minute;
    }
        var  currentTime = hour + seperator2 + minute;
        return  currentTime;
}
module.exports = {
    //formatTime: formatTime,
    formatLocation: formatLocation,
    formatDate: getNowFormatDate,
    formatTime: getNowFormatTime
}
