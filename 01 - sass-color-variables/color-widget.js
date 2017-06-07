$(document).ready(function() {

  var vm = new Vue({
    el: "#app",
    data: {
      colorsetting: "//顏色變數\n$color_black: #303030\n$color_bg: #F7F0E9\n$color_berry: #D56134\n$color_top: #9C4215\n$color_md_1: #F3D1BA\n$color_md_2: #F7E1CD\n$color_bottom: #773000\n$color_cherry_1: #FF613A\n$color_cherry_2: #DF5333"
    },
    computed: {
      colorcards: function() {
        var result = [];
        this.colorsetting.split('\n').forEach(
          function(obj, index) {
          if (obj.indexOf('color')!=-1) {
            result.push({
              name: obj.split(':')[0],
              colorcss: {
                "background-color": obj.split(':')[1]
              },
              colorcode: obj.split(':')[1]
            });
          }
        });
        return result;
      }
    }
  });





});
