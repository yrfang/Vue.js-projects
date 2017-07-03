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
    columns: ['id', 'First name', 'Last name', 'Email', 'Country'],
    search_key: "Jennifer"
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
          console.log(data[row_data]);
        });
        return flag;
      })
    }
  }
});
