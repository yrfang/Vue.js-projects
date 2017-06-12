var vm = new Vue({
  el: "#app",
  data: {
    tags: "日一二三四五六",
    days: [],
    start_day: 1,
    selected: 25,
    newtodo: {
      title: "",
      time: "",
      type: "important",

    }
  },
  mounted() {
    var lunar=6;
    for(var i=1;i<=31;i++){
      var new_day={
        number: i,
        lunar: lunar,
        events: []
      };
      if (Math.random()<0.4){
        var count=Math.random()*3;
        for(var o=0;o<count;o++){
          var minute=parseInt(Math.random()*3)*15;
          new_day.events.push(
            {title: ["整理房間丟垃圾","出門參加活動","打包行李"][parseInt(Math.random()*3)],
             place: "我的家裡",
             unique_id: Math.random()*100,
             time: parseInt(Math.random()*24)+":"+(minute==0?"0":"")+minute,
             type: ["work","important","school"][parseInt(Math.random()*3)],
           }
          );
        }
      }
      this.days.push(new_day);
      lunar++;
      // start_day++;
    }
  },
  methods:{
    chinese_num(num){
      var list="十一二三四五六七八九";
      return list[num];
    },
    lunar(num){
      if (num>30) num=num%30;
      if (num<11){
        return "初"+this.chinese_num(num%10) ;
      }else if (num<20){
        return "十"+this.chinese_num(num%10);
      }else if (num==20){
        return "二十";
      }else if (num<30){
        return "廿"+this.chinese_num(num%10);
      }else if (num<40){
        return "三"+this.chinese_num(num%10);
      }
    },
    get_pan(d){
      if (d.number==1){
        return { "margin-left": "calc( "+this.start_day+" * 100% / 7)"};
      }
    },
    add_item(){
      this.current_day.events.push(JSON.parse(JSON.stringify(this.newtodo )));
    }
  },computed: {
    current_day(){
      return this.days[this.selected];
    },
    current_items(){
      var day=this.current_day;
      if(!day)
        return null;
      else
        return day.events
            .sort((a,b)=>(parseInt(a.time.replace(":",""))-parseInt(b.time.replace(":","")) ));
    }
  }
});
