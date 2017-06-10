$(document).ready(function() {
  var works = [
    {
      title: "人生風景",
      description: "持續向前進！",
      cover: "https://unsplash.it/400/300?image=563"
    },
    {
      title: "千山萬水",
      description: "與你一起環遊世界",
      cover: "https://unsplash.it/400/300?image=507"
    },
    {
      title: "前進夢想",
      description: "圓夢永遠不嫌晚",
      cover: "https://unsplash.it/400/300?image=580"
    },
    {
      title: "驚鴻一瞥",
      description: "一虧究竟的秘密與靈感",
      cover: "https://unsplash.it/400/300?image=679"
    },
    {
      title: "大鳳梨",
      description: "盛夏買旺來",
      cover: "https://unsplash.it/400/300?image=824"
    },
    {
      title: "挑戰極限",
      description: "看見速度與堅持精神",
      cover: "https://unsplash.it/400/300?image=904"
    }
  ];

  var vm = new Vue({
    el: "#app",
    data: {
      now_index: 0,
      works: works,
      span: 930
    },
    computed: {
      computed_left() {
        var result={'left': (-this.now_index*this.span)+'px'};
        // console.log(result);
        return result;
      }
    },
    methods: {
      delta(d) {
        //0 1 2 3 4
        // -1 --> (-1+5)%5 = 4
        // 1 --> (1+5)%5 = 1
        // 5 --> (5+5)%5 = 0
        this.now_index = (this.now_index + d + this.works.length) % this.works.length;
      },
      bg_css(url) {
        return {
          "background-image":"url("+url+")"
        }
      }
    }
  });





});
