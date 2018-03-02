// online.js
var appInstance = getApp();
var taocanlist = ["小零碎套餐", "手拉手套餐", "小家庭套餐", "大家庭套餐"];
Page({

  /**
   * 页面的初始数据
   */
  data: {

    taocan: '',
    date: '-',
    time:'-',
    index: 0,
    offset: 0,
    fromHasFloor:'有',
    fromFloorHiddenFlag:true,
    toHasFloor: '有',
    toFloorHiddenFlag: true
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    this.setData({
      time: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('options.taocanId is: ' + options.taocanId)
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
  book: function (e) {
    var taocan = e.detail.value.taocan;

    var date = e.detail.value.date;
    var time = e.detail.value.time;
    var fromDes = e.detail.value.fromDes;
    var fromFloor = e.detail.value.fromFloor;
    var toDes = e.detail.value.toDes;
    var toFloor = e.detail.value.toFloor;

    var userName = e.detail.value.userName;
    var telephone = e.detail.value.telephone;
   
    var note = e.detail.value.note;

    console.log(taocan + userName + telephone + date + time + fromDes + toDes + note);

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
    if (date == "") {
      wx.showToast({
        icon: 'loading',
        title: '日期未选择！',
        duration: 1000
      })
      return;
    }
    if (time == "") {
      wx.showToast({
        icon: 'loading',
        title: '时间未选择！',
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
      url: 'http://localhost:8080/wechat_ethan/appointment.do/addAppointment',
      data: {
        taocan:taocan,
        username: userName,
        telephone:telephone,
        date: date,
        time,time,
        fromDes:fromDes,
        toDes:toDes,
        note:note,
        fromFloor: fromFloor,
        toFloor: toFloor
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