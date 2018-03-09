var app = getApp();
var picList;
var code;
var config = require('../../utils/config.js')
var userId;
Page({
  data: {
    navBarData: [{
      imgSrc: "../../image/1.jpg",
    }, {
      imgSrc: "../../image/2.jpg",
    },
    {
      imgSrc: "../../image/3.jpg",
    }, {
      imgSrc: "../../image/4.jpg",
    }],
    currentTab: 0,
    slider: [],
    indicatorDots: true, //  是否显示面板指示点
    autoplay: true, // 是否自动切换
    circular: true, // 是否采用衔接滑动
    current: 0, // 当前所在页面的 index
    interval: 2000, // 自动切换时间间隔
    duration: 2000 // 滑动动画时长
  },

  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },
  bookBtnClick: function () {
    //console.info("点击了鼠标！");
    // console.info("currentTab = " + this.data.currentTab  );
    wx.navigateTo({
      // url: '../book/book',
      url: '../book/book?taocanId=' + this.data.currentTab,
    })
  },

  onLoad: function () {
    wx.login({
      //获取code
      success: function (res) {
        code = res.code //返回code
        console.log(code);
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + config.appId + '&secret=' + config.appSecret + '&js_code=' + code + '&grant_type=authorization_code',
          data: {},
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            userId = res.data.openid; //返回openid
            wx.request({
              url: config.host + 'wechat_ethan/appointment.do/getUserOpenId' + '?openId=' + userId,
              headers: {
                'Content-Type': 'application/json'
              },
              success: function (res) {
              }
            })

          }
        })
      }
    })



    var that = this;
    wx.request({
      url: config.host + 'wechat_ethan/getpic.do/getmain',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        var d = JSON.parse(res.data)
        console.log(d)
        console.log(d.result[0].picUrl)
        for (var i = 0; i < d.result.length; ++i) {
          d.result[i] = d.result[i].picUrl;
          console.log(d.result[i]);
        }
        //this.data.slider = d.result;
        picList = d.result;
        console.log("llll" + picList);
        that.setData({
          slider: picList
        })
      }
    })
  }


})  