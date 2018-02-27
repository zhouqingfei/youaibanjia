var currentIndex=0;
Page({
  data: {
    slider: [
      'http://localhost:8080/wechat_ethan/img/youai1.jpg',
      'http://localhost:8080/wechat_ethan/img/youai2.jpg',
      'http://localhost:8080/wechat_ethan/img/youai3.jpg',
      'http://localhost:8080/wechat_ethan/img/youai4.jpg',
      'http://localhost:8080/wechat_ethan/img/youai5.jpg'
  ],
    indicatorDots: false, //  是否显示面板指示点
    autoplay: false, // 是否自动切换
    circular: true, // 是否采用衔接滑动
    current: 0, // 当前所在页面的 index
    interval: 2000, // 自动切换时间间隔
    duration: 2000 // 滑动动画时长
  },

  testDetails(e) {
    console.log(e);
    console.info("current "+e.detail.current);
    this.data.current = e.detail.current;
    if (e.detail.source == 'autoplay') {
      this.setData({
        autoplay: false
      })
    }
  },

  nextPage() {
    // 跳转下一题  
    if (this.data.current >= 4) {
      console.info("1111");
      this.setData({
        current: 0
      })
    }
    else {
      this.setData({
        current: this.data.current + 1
      })
    }
  },

  befPage() {
    // 跳转下一题
    if (this.data.current <= 0) {
      console.info("1111");
      this.setData({
        current: 8
      })
    }
    else {
      this.setData({
        current: this.data.current - 1
      })
    }
  }
})