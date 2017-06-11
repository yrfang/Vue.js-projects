$(document).ready(function() {
  var post_api_url = "http://awiclass.monoame.com/api/command.php?type=get&name=post";
  var cat_api_url = "https://awiclass.monoame.com/api/command.php?type=get&name=cata";

  Vue.component("postbox",{
    template: "#post",
    props: ["post"],
    computed: {
      coverurl () {
        if (this.post.cover[0]=="/") {
          return "http://zashare.org/" + this.post.cover;
        } else {
          return this.post.cover
        }
      },
      covercss () {
        return {'background-image': 'url('+this.coverurl+')'};
      }
    }
  });

  var vm = new Vue({
    el: "#app",
    data: {
      posts: [],
      cats: [],
      filter: ""
    },
    mounted: function() {
      var vobj=this;
      $.get(post_api_url).then(function(res){
        vobj.posts=JSON.parse(res);
        // console.log(vobj.posts);
        // console.log(vobj.posts[0]['title']);
      });
      $.get(cat_api_url).then(function(res){
        vobj.cats=JSON.parse(res);
      });
    },
    computed: {
      filtered_post: function() {
        var vobj=this;
        return this.posts.filter((post)=>{
          var tag=['title', 'description', 'name_short'];
          var flag=false;
          tag.forEach(function(now_tag){
            // console.log(post[now_tag]);
            if (post[now_tag].toLowerCase().indexOf(vobj.filter.toLowerCase())!=-1){
              flag=true;
            }
            // if (post.title.indexOf("夢想")!=-1){
            //   return true;
            // }
          });
          return flag;
        }).map((post)=>{
          //擷取描述的JSON複本，用來highlingt資料用的
          var template_post = JSON.parse(JSON.stringify(post));
          template_post.description = template_post.description.toString(0,60)+"...";
          return template_post;
        }).map((post)=>{
          //空白字元就不需要highlight
          if (vobj.filter=="") return post;

          var tag=['title', 'description', 'name_short'];
          var template_post = JSON.parse(JSON.stringify(post));

          tag.forEach(function(now_tag){
            var regex = new RegExp(vobj.filter, "i");
            var match_word = template_post[now_tag].match(regex);
            // console.log(match_word);

            if (match_word) {
              template_post[now_tag] = template_post[now_tag].replace(new RegExp(vobj.filter, "i"), "<span class=highlight>" + match_word + "</span>");
            }
          });
          return template_post;
        });

      }
    }
  });




});
