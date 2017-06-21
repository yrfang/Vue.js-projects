$(document).ready(function() {
  var pindata = [
    {
      title: "The Secret Life of Walter Mitty (2013)",
      img: "https://unsplash.it/600/400?image=128",
      slogan: "To see the world, things dangerous to come to, to see behind walls, to draw closer, to find each other and to feel. That is the purpose of life."
    },
    {
      title: "Lion King (1994)",
      img: "https://unsplash.it/458/354?image=206",
      slogan: "Oh yes, the past can hurt. But you can either run from it, or learn from it."
    },
    {
      title: "Forrest Gump (1994)",
      img: "https://unsplash.it/400/300?image=109",
      slogan: "Life was like a box of chocolates. You never know what you’re gonna get."
    },
    {
      title: "Larry Page (Google Cofounder)",
      img: "https://unsplash.it/458/354?image=998",
      slogan: "Always deliver more than expected."
    }
  ]

  $('#pin').pinterest_grid({
    no_columns: 4,
    padding_x: 10,
    padding_y: 10,
    margin_bottom: 50,
    single_column_breakpoint: 700
  });


});
