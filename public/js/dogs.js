
var $submitBtn = $("#submit");
var $dog = $("#dog_name")
var $dogbreed = $("#dog_breed")
var $dogheight = $("#dog_height")
var $dogactivity = $("#dog_activity")
var $dogage = $("#dog_age")
var userId
// 0cc8ed26-ca50-4d22-bf4d-e3b2feffc01c
$(document).ready(function () {

    //get user id to create dog
    var storagee = window.localStorage.getItem("email")
    var data = { email: storagee };


    var API = {
        saveDog: function (newDog) {
            return $.ajax({
                headers: {
                    "Content-Type": "application/json"
                },
                type: "POST",
                url: "api/dog",
                data: JSON.stringify(newDog)
            });
 

        }
        // getDogs: function () {
        //     return $.ajax({
        //         url: "api/dog",
        //         type: "GET"
        //     });
        // },
    }

var getADog = function(){
    $.post("/api/users", data, function (res) {

        console.log(JSON.stringify(res.id) + "UserID")
        userId = JSON.stringify(res.id)

    }).then(function (res) {

console.log(res)

    })
}
   

//get all dogs where UserId = 
var getYours = function() {

    console.log("get yours is runnings")

    $.post("/api/users", data, function (res) {

        console.log(JSON.stringify(res.id) + "UserID")
        userId = JSON.stringify(res.id)
        userId = JSON.parse(userId)


    }).then(function(){
        $.get(`/api/dog/${userId}`, function(response){
            for (i = 0; i < response.length; i++){
                //dog api call here to get the breed to set the image for the card 
                console.log(response[i])

                $('#cardsHere').append(`<div class="card m-2 w-100" style="width: 18rem;">
                <img class="card-img-top" src="..." alt="Card image cap">
                <div class="card-body">
                  <h5 class="card-title display-4">${response[i].dog_name}</h5>
                  <div class="row">
                    <div class="col-6">
                      <p class="card-text lead">Breed: ${response[i].dog_breed}</p>
                      <p class="card-text lead">Size: ${response[i].dog_height}</p>
                    </div>
                    <div class="col-6">
                      <p class="card-text lead">Age: ${response[i].dog_age}</p>
                      <p class="card-text lead">Favorite Activity: ${response[i].favorite_activity}</p>
                    </div>
                  </div>
                  <div class="row justify-content-end id="${response[i].id}">
                    <button type="button" class="btn btn-warning btn-sm" id="delete" >Delete</button>
                  </div>
                </div>`)


            }

        } )
    })

   
}



    var handleFormSubmit = function (event) {
        event.preventDefault();

        $.post("/api/users", data, function (res) {

            console.log(JSON.stringify(res.id) + "UserID")
            userId = JSON.stringify(res.id)


        }).then(function () {
            var dog = {
                dog_name: $dog.val().trim(),
                dog_breed: $dogbreed.val().trim(),
                dog_height: $dogheight.val().trim(),
                favorite_activity: $dogactivity.val().trim(),
                dog_age: $dogage.val().trim(),
                UserId: JSON.parse(userId)
            };

            if (!(dog.dog_name && dog.dog_breed && dog.dog_height && dog.favorite_activity && dog.dog_age)) {
                alert("Please fill out all fields");
                return;
            };


            $.post("/api/dog", dog, function (result) {
                location.reload()

            }
            )
        })


    };


  



    $submitBtn.on("click", handleFormSubmit);

    $(document).on("click", "#delete", function(){
      
       
        var parent = $(this).parent().attr("id")
       
        console.log(parent)
    })
 


    var init = function(){
        getYours()
    }
    init()




})
