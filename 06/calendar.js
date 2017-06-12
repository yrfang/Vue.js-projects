var vm = new Vue({
  el: "#app",
  data: {
    tags: "日一二三四五六",
    days:[],
    selected_day: 11,
    start_day: 4  //不同月份第一天在不同的margin-left偏移距離
  },
  mounted: function() {
    //資料仔入的預處理動作
    for (var i=1; i<=31; i++) {
      var new_day = {
        number: i,
        events: []
      };
      // console.log(new_day);
      this.days.push(new_day);
    }
  },
  methods: {
    get_pan(id) {
      if (id!=0) {
        return null;
      } else {
        return { "margin-left": "calc( "+this.start_day+" * 100% / 7)"};
      }
    },
    lunar(num) {
      if (num<=10) {
        return "初數";
      } else if(num==20) {
        return "二十";
      } else if(num==30) {
        return "三十";
      } else if(num<20) {
        return "十數";
      } else if(num<30) {
        return "廿數";
      }
      // return "初二";
    }
  }
});
