$(document).ready(function() {

  var STORAGE_KEY = 'vue-js-note'
  var noteStorage = {
    fetch: function () {
      var notes = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      return notes;
    },
    save: function (notes) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    }
  }


  var vm = new Vue({
    el: "#app",
    data: {
      notes: noteStorage.fetch(),
      show_note: false,
      searchString: "",
    },
    watch: {
      notes: {
        handler: function(notes) {
          noteStorage.save(notes);
        }
      }
    },
    computed: {
      filterNotes: function() {
        var vobj=this;
        var notes_array = vobj.notes;
            searchString = vobj.searchString;
        if (!searchString) {
          return notes_array;
        }

        searchString = searchString.trim().toLocaleLowerCase();

        notes_array = notes_array.filter((item) => {
          if (item.title.toLocaleLowerCase().indexOf(searchString) !== -1) {
            return item;
          }
          if (item.text.toLocaleLowerCase().indexOf(searchString) !== -1) {
            return item;
          }
        });
        // Return an array with the filtered data.
        return notes_array;
      }
    },
    methods: {
      add_new_note: function(e) {
        e.preventDefault();
        const vobj=this;
        const notes = vobj.notes;
        const note = {
          "title": "New note",
          "text": "Your new note",
          editMode: false
        }
        vobj.notes.push(note);
      },
      delete_note: function(id) {
        this.notes.splice(id,1);
      },
      edit: function(item) {
        item.editMode = !item.editMode;
        const vobj=this;
        console.log(vobj.notes);
        noteStorage.save(vobj.notes);
      }
    }
  });



});
