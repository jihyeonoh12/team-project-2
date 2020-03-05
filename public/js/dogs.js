var $submitBtn = $("#submit");
var $dog = $("#dog_name")
var $dogbreed = $("#dog_breed")
var $dogheight = $("#dog_height")
var $dogactivity = $("#dog_activity")
var $dogage = $("#dog_age")
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


        },
        getDogs: function () {
            return $.ajax({
                url: "api/dog",
                type: "GET"
            });
        },
    }


    var getCards = function () {
        API.getDogs().then(function (data) {

            for (i = 0; i < data.length; i++)
            console.log("hiiii")

        })
    }

    getCards()

    var handleFormSubmit = function (event) {
        event.preventDefault();


        var userId

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

                API.saveDog(dog).then(function () {
                    console.log(dog + "inside api call to insert dog")

                })

            }
            )
        })


    };



    $submitBtn.on("click", handleFormSubmit);




})
