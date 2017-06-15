$(document).ready(function() {
  var test_notes = [
    {
      "title": "今天嘗試自己做今天嘗試自己，今天嘗試自己1111，11112，22222222",
      "text": "類似todolist"
    },
    {
      "title": "title2...title2...抬頭吐抬頭吐抬頭吐",
      "text": "continue..."
    },
    {
      "title": "title3...",
      "text": "為什麼寫了很多字，可是好像還是沒有自動換行，該如何做到？"
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
    }
  });




});
