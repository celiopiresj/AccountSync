var HomeController = {
  init: function() {
    // Chame o modelo e execute a lógica necessária
    var users = UserModel.getUsers();
    this.renderUsers(users);
  },
  renderUsers: function(users) {
    var contentDiv = $("#content");
    contentDiv.empty();

    var userList = $("<ul></ul>");

    users.forEach(function(user) {
      var listItem = $("<li></li>").text(user);
      userList.append(listItem);
    });

    contentDiv.append(userList);
  }
};