function loadRoute(route) {
  $("#content").empty();

  switch (route) {
    case "home":
      $.getScript( '/views/home/home.js', () => {
        Home.render();
      });
      break;
    default:
      break;
  }
}

