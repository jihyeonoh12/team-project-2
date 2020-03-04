var $submitBtn = $("#submit");
var $dog = $("#dog_name")
var $dogbreed = $("#dog_breed")
var $dogheight = $("#dog_height")
var $dogactivity = $("#dog_activity")
var $dogage = $("#dog_age")
// 0cc8ed26-ca50-4d22-bf4d-e3b2feffc01c
$(document).ready(function(){


var API = {
    saveDog: function(newDog) {
      return $.ajax({
        headers: {
          "Content-Type": "application/json"
        },
        type: "POST",
        url: "api/dog",
        data: JSON.stringify(newDog)
      });
     
    }}
   
    
    var handleFormSubmit = function(event) {
        event.preventDefault();
      
        var dog = {
          dog_name: $dog.val().trim(),
          dog_breed: $dogbreed.val().trim(),
          dog_height: $dogheight.val().trim(),
          favorite_activity: $dogactivity.val().trim(),
          dog_age: $dogage.val().trim()
        
        };
      
        if (!(dog.dog_name && dog.dog_breed && dog.dog_height && dog.favorite_activity && dog.dog_age)) {
          alert("Please fill out all fields");
          return;
        };
      
        // var data= {email: dog.dog_email};
      
        $.post("/api/dog", dog ,function(res){
         
          API.saveDog(dog).then(function() {
          console.log(dog)
            
        
          })
      
        }
      
        // $exampleText.val("");
        // $exampleDescription.val("");
        )
    
    
    };

   var data=  {email: window.localStorage.getItem("email")}



  $.post("/api/users",data, function(res){
      
    //   console.log("HHEHEHEEHEHEHE" + res)
    //   if(res === null ){
    //  console.log('nooo')
         
    //   }else{
    //     console.log("im signed in because i returned an objext" + res)
    //     window.location.href = "/user";
    //    }
     
       })




    $submitBtn.on("click", handleFormSubmit);
    
})
