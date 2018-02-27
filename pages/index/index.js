var app = getApp()
Page({
  data: {
    navBarData: [{
      imgSrc:"../../image/1.jpg",
    },{
      imgSrc: "../../image/2.jpg",
    },
    {
      imgSrc: "../../image/3.jpg",
    },{
      imgSrc: "../../image/4.jpg",
    }],
    currentTab: 0
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