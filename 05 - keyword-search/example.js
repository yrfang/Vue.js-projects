var post_api_url="https://awiclass.monoame.com/api/command.php?type=get&name=post";


Vue.component('postbox', {
  template: "#post",
  props: ['post','catas'],
  data (){
    return {};
  },
  computed: {
    coverurl (){
      if (this.post.cover[0]=="/")
        return "http://zashare.org/"+this.post.cover;
      else
        return this.post.cover;

    },
    covercss(){
      return {'background-image': 'url('+this.coverurl+')'};
    },
    cata_name(){
      return this.catas.filter((cata)=>(cata.tag==this.post.tag))[0].name;
    }
  },
  methods: {
    openlink(){
      window.open("http://zashare.org/post/n/"+this.post.title);
    }
  }
});
var vm = new Vue({
  el: "#app",
  data: {
    posts: [],
    catas: [],
    filter: ""
  },
  mounted() {
    var vobj = this;
    $.get(post_api_url).then(function(res) {
      vobj.posts = JSON.parse(res);
    });
    $.get("https://awiclass.monoame.com/api/command.php?type=get&name=cata").then(function(res) {
      vobj.catas = JSON.parse(res);
    });
  },
  computed: {
    filtered_post() {
      return this.posts
        .filter((p)=>{
          var field=["title","description","name_short"];
          var contain_flag=false;
          field.forEach((f)=>{
            if (p[f].toLowerCase().indexOf(this.filter.toLowerCase())!=-1)
              contain_flag=true;
          });
          return contain_flag;

        }).map((p)=>{
          p.description=p.description.substr(0,90)+"...";
          return p
        }).map((p)=>{
          if (this.filter=="") return p;
          var cache=JSON.parse(JSON.stringify(p));
          var field=["title","description","name_short"];
          field.forEach((f)=>{
            var regex = new RegExp(this.filter,"i");
            var match = cache[f].match(regex);
            console.log(match);
            if (match)
              cache[f]=cache[f].replace(regex,"<span class='highlight'>"+match[0]+"</span>");
          });

          console.log(cache.tag);
          return cache;
        })
        .sort((a,b)=>(a.tag.charCodeAt(0)-b.tag.charCodeAt(0)));
    }
  }

});
