
var $submitBtn = $("#submit");

var $useremail = $("#user_email");
var $userpassword = $("#user_password");
var API = {
    saveUser: function(newUser) {
      return $.ajax({
        headers: {
          "Content-Type": "application/json"
        },
        type: "POST",
        url: "api/user"
         
       
      });
      console.log(newUser)
    }
    ,
    getUser: function(logUser) { 
      return $.ajax({
        url: "api/user",
        type: "GET",
        data: JSON.stringify(logUser)
      });
    },
    deleteExample: function(id) {
      return $.ajax({
        url: "api/examples/" + id,
        type: "DELETE"
      });
    }
  };

$submitBtn.on("click", function(e){
    e.preventDefault()
   
    var user = {
        user_email: $useremail.val().trim(),
        user_password: $userpassword.val().trim(),
    
      };
      if (!(user.user_password && user.user_email )) {
        alert("Please fill out all fields");
        return;
      };
      console.log(user.user_email)

      var dataUser = {email: user.user_email}

    //   $.get('/api/user', data , function(res){
    //       console.log(res)
    //   })

    // API.getUser(JSON.stringify(dataUser)).then(function(ress){
    //     console.log(ress)
    // })
    

    $.post("/api/users",dataUser, function(res){
      if(res === null ){
     console.log("Not exsisting cause null" + res)
     $('#signUp').attr('style', "color: red")
     $("#small").html('NOT A USER')
         
      }else{
        console.log("im signed in because i returned an objext" + res)
        window.location.href = "/user";
       }
     
       })

});
