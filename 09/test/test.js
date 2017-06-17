var vm = new Vue({
  el: "#app",
  data: {
    notes:[
    {
      "title": "今天嘗試自己做",
      "text": "類似todolist",
      editMode: false
    },
    {
      "title": "君不見黃河之水天上來,君不見黃河之水天上來",
      "text": "朝如青絲暮成雪？天生我材必有用",
      editMode: false
    },
    {
      "title": "title3...",
      "text": "君不見黃河之水天上來，奔流到海不復回？",
      editMode: false
    }]
  },
  methods: {
    edit: function(item) {
      item.editMode = !item.editMode;
    },
    remove: function(index) {
      vm.notes.splice(index,1);
    }
  }
});
