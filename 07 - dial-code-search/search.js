const dial_url_api = "https://gist.githubusercontent.com/Goles/3196253/raw/9ca4e7e62ea5ad935bb3580dc0a07d9df033b451/CountryCodes.json";
var post_api_url = "http://awiclass.monoame.com/api/command.php?type=get&name=post";

var vm = new Vue({
  el: "#app",
  data: {
    searchString: "",
    coutries: []
  },
  mounted: function() {
    var vobj=this;
    $.get(dial_url_api).then((res) => {
      vobj.coutries=JSON.parse(res);
      console.log(vobj.coutries);
    });

    // fetch(dial_url_api)
    //   .then((blob) => vobj.coutries=JSON.parse(blob));
    //   // .then((data) => vobj.coutries.push(data));
    // console.log(vobj.coutries);
  },
  computed: {
    filterCountries: function() {
      var vobj=this;
      var coutries_array = vobj.coutries,
          searchString = vobj.searchString;
      var searchCode = new RegExp(vobj.searchString, 'gi');
      if (!searchString) {
        return coutries_array;
      }

      searchString = searchString.trim().toLocaleLowerCase();

      coutries_array = coutries_array.filter((item) => {
        if (item.name.toLocaleLowerCase().indexOf(searchString) !== -1) {
          return item;
        }
        if (item.code.toLocaleLowerCase().indexOf(searchString) !== -1) {
          return item;
        }
      });
      // Return an array with the filtered data.
      return coutries_array;
    }
  }
});
