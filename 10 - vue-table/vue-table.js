var idData = "https://gist.githubusercontent.com/arthurSena/bd98c43ca6b5e1c642b4/raw/789ba104e2692bc63d4442ef730c7f3e9755b76d/data.json";

var vm = new Vue({
  el: "#app",
  data: {
    idData: [],
    rows: ['id', 'first_name', 'email', 'country'],
    search_key: "",
    page_index: 0,
    page_count: 50,
    sortKey: 'id',
    reverse: false
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
      var rows = ['id', 'first_name', 'email', 'country'];
      // console.log('hi');

      if (vobj.sortKey) {

        vobj.idData = vobj.idData.sort((a, b)=>{
          a = a[vobj.sortKey]
          b = b[vobj.sortKey]
          if (vobj.reverse) {
            return (a === b ? 0 : a > b ? -1 : 1);
          }
          return (a === b ? 0 : a > b ? 1 : -1)
        });
      }
      return vobj.idData;
    },
    filter_data() {
      var vobj = this;
      return vobj.sort_data.filter((data) => {
        var rows = ['id', 'first_name', 'last_name', 'email', 'country'];
        var flag = false;
        rows.forEach((rows_key) => {
          if (data[rows_key].toString().toLowerCase().indexOf(vobj.search_key.toString().trim().toLowerCase())!=-1) {
            flag=true;
          };
        });
        return flag;
      }).map((data) => {
        // 空白搜尋不需要highlihg，回到原先陣列
        if (vobj.search_key == "") return data;

        // 擷取JSON副本，用來highlight資料用，不更改原先資料
        var rows = ['id', 'first_name', 'last_name', 'email', 'country'];
        var template_data = JSON.parse(JSON.stringify(data));
        // console.log(template_data);

        rows.forEach((rows_key) => {
          var regex = new RegExp(vobj.search_key.trim(), "gi");
          var match_data = template_data[rows_key].toString().match(regex);
          // console.log(match_data); //搜尋的字串
          // console.log(rows_key); //對應column的key
          // console.log(template_data[rows_key]); //對應column的value
          var span_match_data = "<span class='highlight'>" + match_data + "</span>";

          if (match_data) {
            template_data[rows_key] = template_data[rows_key].toString().replace(regex, span_match_data);
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
    changeKeyNmae(key) {
      if (key=='id') return key = '#';
      if (key=='first_name') return key = 'Name';
      if (key=='email') return key = 'Email';
      if (key=='country') return key= 'Country';
    },
    sortBy(key) {
      var vobj=this;
      vobj.sortKey = key;
      vobj.reverse = !vobj.reverse;

      return vobj.sort_data[key];
    }
  }
});
