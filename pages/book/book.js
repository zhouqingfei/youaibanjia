// online.js
var config = require('../../utils/config.js')
var dateTimePicker = require('../../utils/dateTimePicker.js');

var appInstance = getApp();
var taocanlist = ["小零碎套餐", "手拉手套餐", "小家庭套餐", "大家庭套餐"];
Page({

  /**
   * 页面的初始数据
   */
  data: {

    taocan: '',
    dateTime: null,
    appointmentTime:'',
    
    fromMapName: "",
    fromMapAddress: "",
    fromDes: "",

    fromHasFloor: '有',
    fromFloorHiddenFlag: true,

    index: 0,
    offset: 0,        
    
    toMapName: "",
    toMapAddress: "",
    toDes: "",

    toHasFloor: '有',
    toFloorHiddenFlag: true,

    dateTimeArray: null,
    
    startYear: 2018,
    endYear: 2050
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取完整的年月日 时分秒，以及默认显示的数组
    var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    // 精确到分的处理，将数组的秒去掉
    var lastArray = obj.dateTimeArray.pop();
    var lastTime = obj.dateTime.pop();

    this.setData({
      dateTimeArray: obj.dateTimeArray,
      dateTime: obj.dateTime
    });

    this.setData({
      appointmentTime: this.data.dateTimeArray[0][this.data.dateTime[0]] + '-' + this.data.dateTimeArray[1][this.data.dateTime[1]] + '-' + this.data.dateTimeArray[2][this.data.dateTime[2]] + ' ' + this.data.dateTimeArray[3][this.data.dateTime[3]] + ':' + this.data.dateTimeArray[4][this.data.dateTime[4]]
    });

    console.log(this.data.appointmentTime);

    //console.log('options.taocanId is: ' + options.taocanId)
    var that = this;
    if (options.taocanId != undefined) {
      that.setData({
        index: options.taocanId,
        taocan: taocanlist[options.taocanId]
      })
    } else {
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  changeDateTime(e) {
    this.setData({ 
      dateTime: e.detail.value,
      appointmentTime: this.data.dateTimeArray[0][this.data.dateTime[0]] + '-' + this.data.dateTimeArray[1][this.data.dateTime[1]] + '-' + this.data.dateTimeArray[2][this.data.dateTime[2]] + ' ' + this.data.dateTimeArray[3][this.data.dateTime[3]] + ':' + this.data.dateTimeArray[4][this.data.dateTime[4]]
    });
    console.log(this.data.appointmentTime);
  },
  changeDateTimeColumn(e) {
    var arr = this.data.dateTime, dateArr = this.data.dateTimeArray;

    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

    this.setData({
      dateTimeArray: dateArr,
      dateTime: arr,
      appointmentTime: this.data.dateTimeArray[0][this.data.dateTime[0]] + '-' + this.data.dateTimeArray[1][this.data.dateTime[1]] + '-' + this.data.dateTimeArray[2][this.data.dateTime[2]] + ' ' + this.data.dateTimeArray[3][this.data.dateTime[3]] + ':' + this.data.dateTimeArray[4][this.data.dateTime[4]]
    });

    console.log(this.data.appointmentTime);
  },
  fromHasFloorSwitchChange: function (e) {
    //console.log(e.detail.value)
    if (e.detail.value){
      this.setData({
        fromHasFloor: "有",
        fromFloorHiddenFlag:true
      })
    }else{
      this.setData({
        fromHasFloor: "无",
        fromFloorHiddenFlag: false
      })
    }
    
  },
  toHasFloorSwitchChange: function (e) {
    //console.log(e.detail.value)
    if (e.detail.value) {
      this.setData({
        toHasFloor: "有",
        toFloorHiddenFlag: true
      })
    } else {
      this.setData({
        toHasFloor: "无",
        toFloorHiddenFlag: false
      })
    }
  },
  chooseFromLocation: function (e) {
    console.log(e)
    var that = this
    wx.chooseLocation({
      success: function (res) {
        // success
        console.log(res);
        console.log(res.address);
        that.setData({
          // hasLocation: true,
          // location: {
          //   longitude: res.longitude,
          //   latitude: res.latitude
          // }
          fromMapName:res.name,
          fromMapAddress: res.address
        })
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  chooseToLocation: function (e) {
    console.log(e)
    var that = this
    wx.chooseLocation({
      success: function (res) {
        // success
        console.log(res);
        console.log(res.address);
        that.setData({
          // hasLocation: true,
          // location: {
          //   longitude: res.longitude,
          //   latitude: res.latitude
          // }
          toMapName: res.name,
          toMapAddress: res.address
        })
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  book: function (e) {

    var taocan = e.detail.value.taocan;

    var appointTime = this.data.appointmentTime;
    
    var fromMapName = this.data.fromMapName;
    var fromMapAddress = e.detail.value.fromMapAddress;
    var fromDes = e.detail.value.fromDes;
    var fromFloor = e.detail.value.fromFloor;
    
    var toMapName = this.data.toMapName;
    var toMapAddress = e.detail.value.toMapAddress;
    var toDes = e.detail.value.toDes;
    var toFloor = e.detail.value.toFloor;

    var userName = e.detail.value.userName;
    var telephone = e.detail.value.telephone;
   
    var note = e.detail.value.note;

    console.log(taocan + ";" + appointTime + ";" + fromMapName + ";" + fromMapAddress +  ";"  + fromDes + ";" + fromFloor);
    console.log(toMapName + ";" + toMapAddress + ";" + toDes + ";" + toFloor + ";" + userName + ";" + telephone + ";" + note);

    if (userName == "") {
      wx.showToast({
        icon: 'loading',
        title: '姓名未填写！',
        duration: 1000
      })
      return;
    }
    if (telephone == "") {
      wx.showToast({
        icon: 'loading',
        title: '联系方式未填写！',
        duration: 1000
      })
      return;
    }
    if (fromDes == "") {
      wx.showToast({
        icon: 'loading',
        title: '起点未填写！',
        duration: 1000
      })
      return;
    }
    if (toDes == "") {
      wx.showToast({
        icon: 'loading',
        title: '终点未填写！',
        duration: 1000
      })
      return;
    }
    if (fromFloor == "") {
      wx.showToast({
        icon: 'loading',
        title: '搬出楼层未填写！',
        duration: 1000
      })
      return;
    }
    if (toFloor == "") {
      wx.showToast({
        icon: 'loading',
        title: '搬入楼层未填写！',
        duration: 1000
      })
      return;
    }


    wx.request({
      // url: requestUrl,
      url: config.host + 'wechat_ethan/appointment.do/addAppointment',
      data: {
        taocan:taocan,
        appointTime: appointTime,

        fromMapName: fromMapName,
        fromMapAddress: fromMapAddress,
        fromDes, fromDes,
        fromFloor: fromFloor,
        
        toMapName: toMapName,
        toMapAddress: toMapAddress,
        toDes, toDes,
        toFloor: toFloor,

        userName: userName,
        telephone: telephone,
        note: note
      },
      success: function (result) {
        wx.showToast({
          title: '预约成功!',
          icon: 'success',
          duration: 2000
        })
        //wx.navigateBack();
      },

      fail: function ({ errMsg }) {
        console.log('request fail', errMsg)
      }
    })
  }
})