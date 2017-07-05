var idData = "https://gist.githubusercontent.com/arthurSena/bd98c43ca6b5e1c642b4/raw/789ba104e2692bc63d4442ef730c7f3e9755b76d/data.json";

// Vue.component("lazytable", {
//   template: "#table_template",
//   props: ["table_data", "rows","id", "columns"],
//   data() {
//     return {
//       search_key: ""
//     }
//   },
//   computed: {
//     keys() {
//       let rows = this.table_data;
//       let row_keys = Object.keys(rows)
//                            .reduce((prep, cur) => prep.concat(cur),[])
//                            .filter((obj,index,arr) => arr.indexOf(obj)==index)
//       return row_keys;
//     }
//   }
// });

var vm = new Vue({
  el: "#app",
  data: {
    idData: [],
    search_key: "",
    page_index: 0,
    page_count: 50
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
    filter_data() {
      var vobj = this;
      return this.idData.filter((data) => {
        var row = ['id', 'first_name', 'last_name', 'email', 'country'];
        var flag = false;
        row.forEach((row_data) => {
          if (data[row_data].toString().toLowerCase().indexOf(vobj.search_key.toString().trim().toLowerCase())!=-1) {
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

        row.forEach((row_data) => {
          var regex = new RegExp(vobj.search_key.trim(), "gi");
          var match_data = template_data[row_data].toString().match(regex);
          // console.log(match_data);
          // console.log(template_data[row_data]);
          var span_match_data = "<span class='highlight'>" + match_data + "</span>";

          if (match_data) {
            template_data[row_data] = template_data[row_data].toString().replace(regex, span_match_data);
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

      // if (vobj.search_key.value != "") {
      //   vobj.page_index = 0;
      // }
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
    }
  }
});
