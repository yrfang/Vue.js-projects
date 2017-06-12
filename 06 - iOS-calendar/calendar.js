var vm = new Vue({
  el: "#app",
  data: {
    tags: "日一二三四五六",
    days:[],
    selected_day: 12,
    start_day: 1,  //不同月份第一天在不同的margin-left偏移距離
    lunar_pan: 5,
    new_item: {
      title: "標題",
      time: "23:00",
      type: "important"
    }
  },
  mounted: function() {
    //資料仔入的預處理動作
    for (var i=1; i<=31; i++) {
      var new_day = {
        number: i,
        events: []
      };
      if (Math.random()<0.4) {
        var count=Math.random()*3;
        var minute=parseInt(Math.random()*3)*15;
        for(var o=0;o<count;o++){
          new_day.events.push(
            {
              title: ["整理房間丟垃圾","出門參加活動","打包行李"][parseInt(Math.random()*3)],
               time: parseInt(Math.random()*24)+":" + (minute==0?"0":"") + minute,
               type: ["work","important","school"][parseInt(Math.random()*3)],
             }
          );
        }
      }
      // console.log(new_day);
      this.days.push(new_day);
    }
  },
  computed: {
    now_events: function() {
      var day = this.days[this.selected_day];
      if (day) {
        return this.sort_time(day.events);
      } else {
        return [];
      }
    }
  },
  //methods觸發動作
  methods: {
    get_pan(id) {
      if (id!=0) {
        return null;
      } else {
        return { "margin-left": "calc( "+this.start_day+" * 100% / 7)"};
      }
    },
    chinese_num(num){
      var list="十一二三四五六七八九";
      return list[num];
    },
    lunar(num) {
      if (num>30) {
        num=num%30;
      }
      if (num<=10) {
        return "初" + this.chinese_num(num%10);
      } else if(num==20) {
        return "二十";
      } else if(num==30) {
        return "三十";
      } else if(num<20) {
        return "十" + this.chinese_num(num%10);
      } else if(num<30) {
        return "廿" + this.chinese_num(num%10);
      }
      // return "初二";
    },
    add_item() {
      this.days[this.selected_day].events.push(
        //複製體：先轉換為物件後，在用JSON做parse
        JSON.parse(JSON.stringify(this.new_item))
      )
    },
    sort_time(events) {
      return events.sort(
        (a,b) => {
          return parseInt(a.time.replace(":", "")) - parseInt(b.time.replace(":",""));
        }
      );
    }
  }
});
