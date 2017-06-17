$(document).ready(function() {
  var test_notes = [
    {
      "title": "今天嘗試自己做",
      "text": "類似todolist",
      editMode: false
    },
    {
      "title": "君不見黃河之水天上來，奔流到海不復回？，君不見高堂明鏡悲白髮",
      "text": "君不見黃河之水天上來，奔流到海不復回？，君不見高堂明鏡悲白髮，朝如青絲暮成雪？天生我材必有用，千金散盡還復來。朝如青絲暮成雪？天生我材必有用，千金散盡還復來。",
      editMode: false
    }
  ]


  var vm = new Vue({
    el: "#app",
    data: {
      notes: test_notes,
      show_note: false,
      searchString: "",
    },
    computed: {
      filterNotes: function() {
        var vobj=this;
        var coutries_array = vobj.notes,
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
    },
    methods: {
      add_new_note: function() {
        this.notes.push({
          "title": "New note",
          "text": "Your new note",
          editMode: false
        });
      },
      delete_note: function(id) {
        this.notes.splice(id,1);
      },
      edit: function(item) {
        item.editMode = !item.editMode;
      }
    }
  });




});
