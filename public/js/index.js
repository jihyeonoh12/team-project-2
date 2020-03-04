// Get references to page elements
var $user = $("#user_name");
var $useremail = $("#user_email");
var $submitBtn = $("#submit");
var $userpassword = $("#user_password");
var loggedIn = false

// The API object contains methods for each kind of request we'll make
var API = {
  saveUser: function(newUser) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/user",
      data: JSON.stringify(newUser)
    });
  },
  getExamples: function() {
    return $.ajax({
      url: "api/examples",
      type: "GET"
    });
  },
  deleteExample: function(id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function() {
  API.getExamples().then(function(data) {
    var $examples = data.map(function(example) {
      var $a = $("<a>")
        .text(example.text)
        .attr("href", "/example/" + example.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    // $exampleList.empty();
    // $exampleList.append($examples);
  });
};

// create NEW user- Sign Up
var handleFormSubmit = function(event) {
  event.preventDefault();

  var user = {
    username: $user.val().trim(),
    user_email: $useremail.val().trim(),
    user_password: $userpassword.val().trim()
  };


  if (!(user.username && user.user_email && user.user_password)) {
    alert("You must enter an example text and description!");
    return;
  }

  

  API.saveUser(user).then(function() {
//if user already exsists- prompt them to update
console.log('saved')
window.location.href = "/user";
window.localStorage.setItem("email", user.user_email)
   
    // refreshUsers();
  });

  // $exampleText.val("");
  // $exampleDescription.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
// $exampleList.on("click", ".delete", handleDeleteBtnClick);
