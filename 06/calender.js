var vm = new Vue({
  el: "#app",
  data: {
    tags: "日一二三四五六",
    days: []
  },
  mounted: function() {
    //資料仔入的預處理動作
    for (var i=1; i<=31; i++) {
      var new_day = {
        number: i,
        events: [
          {name: "test"}
        ]
      };
      console.log(new_day);
      this.days.push(new_day);
    }
  }
});
