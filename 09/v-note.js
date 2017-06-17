$(document).ready(function() {
  var test_notes = [
    {
      "title": "今天嘗試自己做",
      "text": "類似todolist"
    },
    {
      "title": "君不見黃河之水天上來,君不見黃河之水天上來",
      "text": "朝如青絲暮成雪？天生我材必有用"
    },
    {
      "title": "title3...",
      "text": "君不見黃河之水天上來，奔流到海不復回？，君不見高堂明鏡悲白髮，朝如青絲暮成雪？天生我材必有用，千金散盡還復來。"
    },
    {
      "title": "title4...",
      "text": "目前沒有自動換行的功能"
    },
  ]


  var vm = new Vue({
    el: "#app",
    data: {
      notes: test_notes,
      show_note: false
    },
    methods: {
      add_new_note: function() {
        this.notes.push({
          "title": "New note",
          "text": "Your new note"
        });
      },
      delete_note: function(id) {
        this.notes.splice(id,1);
      },
      toggle_edit_note: function() {
        const vobj=this;
        vobj.show_note = !vobj.show_note;
      },
      hide_edit_note: function(index) {
        const vobj=this;
        vobj.show_note = false;
      }
    }
  });




});
