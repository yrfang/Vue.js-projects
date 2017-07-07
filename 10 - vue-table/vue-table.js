var idData = "https://gist.githubusercontent.com/arthurSena/bd98c43ca6b5e1c642b4/raw/789ba104e2692bc63d4442ef730c7f3e9755b76d/data.json";

var vm = new Vue({
  el: "#app",
  data: {
    idData: [],
    search_key: "",
    page_index: 0,
    page_count: 50,
    sortOrders: [],
    sortKey: ''
  },
  mounted: function() {
    var vobj=this;
    $.ajax({
      url: idData,
      success: function(res) {
        // console.log(vobj.idData = JSON.parse(res));
        vobj.idData = JSON.parse(res);
      }
    });
  },
  computed: {
    sort_data() {
      var vobj = this;
      var row = ['id', 'first_name', 'last_name', 'email', 'country'];

      vobj.idData = vobj.idData.sort((a,b)=>{
        if (a.email > b.email) {
          return 1;
        }
        if (a.email < b.email) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });
      return vobj.idData;
      console.log(vobj.idData);

    },
    filter_data() {
      var vobj = this;
      return vobj.sort_data.filter((data) => {
        var row = ['id', 'first_name', 'last_name', 'email', 'country'];
        var flag = false;
        row.forEach((row_key) => {
          if (data[row_key].toString().toLowerCase().indexOf(vobj.search_key.toString().trim().toLowerCase())!=-1) {
            flag=true;
          };
        });
        return flag;
      }).map((data) => {
        // 空白搜尋不需要highlihg，回到原先陣列
        if (vobj.search_key == "") return data;

        // 擷取JSON副本，用來highlight資料用，不更改原先資料
        var row = ['id', 'first_name', 'last_name', 'email', 'country'];
        var template_data = JSON.parse(JSON.stringify(data));
        // console.log(template_data);

        row.forEach((row_key) => {
          var regex = new RegExp(vobj.search_key.trim(), "gi");
          var match_data = template_data[row_key].toString().match(regex);
          // console.log(match_data); //搜尋的字串
          // console.log(row_key); //對應column的key
          // console.log(template_data[row_key]); //對應column的value
          var span_match_data = "<span class='highlight'>" + match_data + "</span>";

          if (match_data) {
            template_data[row_key] = template_data[row_key].toString().replace(regex, span_match_data);
          }
        });
        return template_data;
      })
    },
    sliced_table_data() {
      var vobj=this;
      // var slice_filter_data = vobj.filter_data;
      let start = vobj.page_index * vobj.page_count;
      let end = (vobj.page_index+1) * vobj.page_count;

      return vobj.filter_data.slice(start,end);
    },
    page_total() {
      return (this.idData.length/this.page_count);
    }
  },
  methods: {
    keymonitor(e) {
      var vobj=this;
      // console.log(event.key);
      if(event.key) {
        vobj.page_index = 0;
      }
    },
    clearSearch() {
      var vobj=this;
      vobj.search_key="";
    },
    sortedByKey() {

    }
  }
});
