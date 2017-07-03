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
          if (data[row_data].toLowerCase().indexOf(vobj.search_key.toLowerCase())!=-1) {
            flag = true;
          }
          // if (data['first_name'].indexOf("Jennifer")!=-1) {
          //   return true;
          // }
        });
        return flag;
      }).map((data) => {
        //空白字串就不需要highlight
        if (vobj.search_key=="") return data;

        //擷取描述的JSON複本，用來highlingt資料用的
        var template_data = JSON.parse(JSON.stringify(data));
        var row = ['id', 'first_name', 'last_name', 'email', 'country'];

        row.forEach((row_data) => {
          var regexp = new RegExp(vobj.search_key, 'i');
          var match_data = template_data[row_data].match(regexp);
          console.log(match_data);
        });
        return template_data;
      })
    },
    // filtered_data() {
    //   if (this.search_key=="") return this.table_data;
    //   var clone = JSON.parse(JSON.stringify(this.table_data));
    //   var reg = new RegExp("("+ this.table_data +")");
    //   var clone_tempate = clone.filter((obj) => Object.values(obj))
    //                            .some((obj) => (obj+"").indexOf(this.search_key)!=-1)
    //   clone_tempate.forEach((data) => {
    //     Object.keys(data).forEach((key) => {
    //       data[key] = (data[key]+"").replace(reg, "<span class='red'>$1</span>");
    //     });
    //   });
    //   return clone_tempate;
    // }
  }
});
