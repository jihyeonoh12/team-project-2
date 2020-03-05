
// Get references to page elements
var $user = $("#user_name");
var $useremail = $("#user_email");
var $submitBtn = $("#submit");
var $userpassword = $("#user_password");
var loggedIn = false

     window.localStorage.setItem("loggedIn", loggedIn)

function loginCheck(){
if( loggedIn) {
  window.location.href = "/user";
}
else{
  window.location.href = "/"; 
}
}
// loginCheck()


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
  }
  // ,
  // getExamples: function() {
  //   return $.ajax({
  //     url: "api/examples",
  //     type: "GET"
  //   });
  // },
  // deleteExample: function(id) {
  //   return $.ajax({
  //     url: "api/examples/" + id,
  //     type: "DELETE"
  //   });
  // }
};

// refreshExamples gets new examples from the db and repopulates the list
// var refreshExamples = function() {
//   API.getExamples().then(function(data) {
//     var $examples = data.map(function(example) {
//       var $a = $("<a>")
//         .text(example.text)
//         .attr("href", "/example/" + example.id);

//       var $li = $("<li>")
//         .attr({
//           class: "list-group-item",
//           "data-id": example.id
//         })
//         .append($a);

//       var $button = $("<button>")
//         .addClass("btn btn-danger float-right delete")
//         .text("ｘ");

//       $li.append($button);

//       return $li;
//     });

//     // $exampleList.empty();
//     // $exampleList.append($examples);
//   });
// };

// create NEW user- Sign Up
var handleFormSubmit = function(event) {
  event.preventDefault();

  var user = {
    username: $user.val().trim(),
    user_email: $useremail.val().trim(),
    user_password: $userpassword.val().trim(),
    user_street: $userpassword.val().trim(),
    user_city: $userpassword.val().trim()
  
  }; 

  if (!(user.username && user.user_email && user.user_password && user.user_street && user.user_city)) {
    alert("Please fill out all fields");
    return;
  };

  var data= {email: user.user_email};

  $.post("/api/users",data, function(res){
   if(res === null ){
    API.saveUser(user).then(function() {
     var loggedIn = true
         window.localStorage.setItem("loggedIn", loggedIn )
         window.localStorage.setItem("email", user.user_email)
         window.location.href = "/user";

        });
      
   }else{
     alert('Email is already in use')
    }
  
    })




};



// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
// $exampleList.on("click", ".delete", handleDeleteBtnClick);

