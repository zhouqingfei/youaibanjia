var config = require('../../utils/config.js')

var currentIndex = 0;
var picList;

var app = getApp()

Page({
  data: {
    navBarData: [{
      imgSrc:"../../image/1.jpg",
    },{
      imgSrc: "../../image/2.jpg",
    },{
      imgSrc: "../../image/3.jpg",
    },{
      imgSrc: "../../image/4.jpg",
    }],
    currentTab: 0,

    slider: [],
    picCount: 0,
    indicatorDots: false, //  是否显示面板指示点
    autoplay: false, // 是否自动切换
    circular: true, // 是否采用衔接滑动
    current: 0, // 当前所在页面的 index
    interval: 2000, // 自动切换时间间隔
    duration: 2000 // 滑动动画时长
  },
  onLoad: function () {
    var that = this;
    wx.request({
      url: config.host + 'wechat_ethan/getPic.do/getMainmenu',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        var d = JSON.parse(res.data)
        console.log(d)
        console.log(d.result[0].picUrl)
        for (var i = 0; i < d.result.length; ++i) {
          d.result[i] = config.host + "wechat_ethan/img/" + d.result[i].picUrl;
          console.log(d.result[i]);
        }
        //this.data.slider = d.result;
        picList = d.result;
        that.setData({
          slider: picList,
          picCount: d.result.length
        })
      }
    })
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
  }
})  