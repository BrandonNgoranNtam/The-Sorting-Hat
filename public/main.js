"use strict";
import {postData} from "./utilsAPI.js";
import {getData} from "./utilsAPI.js";

//document.getElementById("house_view").style.display = 'none';
//document.getElementById("question_view").style.display = 'none';
// document.getElementById("loginSignupForms").style.display = 'none';


////////////////////////////////////////////////////////////////////////////////////////////

let questionsCounter = 0;
$(".login-form").hide();
$(".login").css("background", "none");

$(".login").click(function () {
    $(".signup-form").hide();
    $(".login-form").show();
    $(".signup").css("background", "none");
    $(".login").css("background", "#fff");
});

$(".signup").click(function () {
    $(".signup-form").show();
    $(".login-form").hide();
    $(".login").css("background", "none");
    $(".signup").css("background", "#fff");
});

$(".btn").click(function () {
    $(".input").val("");
});


///////////////////////////////////////////////////////////////////////////////////////


const authenticatedActions = (url, token) => {
    $("#loginSignupForms").hide();
    $("#logOut").show();
    $("#introQuiz").show();
    $('body').css("background-image", "url(\"./images/Hogwarts.jpg\")");

};

const notAuthenticatedActions = (errorMessage = "") => {
    $("#login_board").html(errorMessage);

    if (errorMessage === "") $("#login_board").hide();
    else $("#login_board").show();

    //hide the other components
    $("#loginSignupForms").show();
    $("#introQuiz").hide();
    $("#logOut").hide();
    $("#view_members_component").hide();
    $('body').css("background-image", "url(\"./images/Hogwarts.jpg\")");


};


const initialRenderOfComponents = url => {
    let token = localStorage.getItem("token");
    if (token) {
        authenticatedActions(url, token);
        return token;
    } else {
        notAuthenticatedActions();
        return;
    }
};

function getHouseMembers(url, token, house) {
    $("#loginSignupForms").hide();
    $("#logOut").show();
    $("#introQuiz").hide();
    $("#view_members_component").show();
    if (house === "Gryffindor") {
        $('body').css("background-image", "url(\"./images/griffindor-gryffindor-garri.jpg\")");
    } else if (house === "Ravenclaw") {
        $('body').css("background-image", "url(\"./images/kogtevran-ravenclaw-fakultet.jpg\")");
    } else if (house === "Slytherin") {
        $('body').css("background-image", "url(\"./images/slizerin-slytherin-zmeya.jpg\")");
    } else {
        $('body').css("background-image", "url(\"./images/289889.jpg\")");

    }
    getData(url, token).then(response => {
        let resp_json = response;
        if (resp_json.success) {
            $("#message_board").text("");
            let list = document.createElement("ul");
            let members_array = response.data;
            console.log(members_array);
            list.className = "list-group";
            for (let i = 0; i < members_array.length; i++) {
                let item = document.createElement("li");
                item.className = "list-group-item danger";
                item.innerText = members_array[i].firstName + " " + members_array[i].lastName;
                list.appendChild(item);
            }
            $("#message_board").append(list);
        } else {
            $("#message_board").text(JSON.stringify(response.error));
        }
    })
        .catch(err => {
        });
}

function getQuestions(url, token) {
    $("#loginSignupForms").hide();
    $("#logOut").show();
    $("#introQuiz").hide();
    $("#view_members_component").hide();
    console.log("SALUT1");
    getData(url,token).then(response => {
        console.log("SALUT2");
        let resp_json = response;
        if (resp_json.success) {
            let quizQuestions = response.data;
            console.log(quizQuestions);
            $("#question").text("");
            let div2 = document.createElement("div");
            div2.classname = "col-md-12";
            let div3 = document.createElement("div");
            div3.classname = "text-center intro";
            let div4 = document.createElement("div");
            div4.classname = "scrolling-limit question";
            let div5 = document.createElement("div");
            div5.classname = "scrolling";
            let questionHTML = document.createElement("p");
            questionHTML.innerText = "Bonjour";
            /*console.log(quizQuestions[questionsCounter].question);*/
            div5.appendChild(questionHTML);
            div4.appendChild(div5);
            div3.appendChild(div4);
            div2.appendChild(div3);
            $("#question_view").append(div2);
        } else {
            $("#question").text(JSON.stringify(response.error))
        }
    }).catch(err => {
    });

}


////////////////////////////////////////////////////////////////////////////////////////////////////////

$(document).ready(function () {
    $("#loginSignupForms").show();
    $("#question_view").hide();
    $("#logOut").hide();
    $("#view_members_component").hide();
    let url = "/questions";
    let token = initialRenderOfComponents(url);
    $("#login_form").submit(e => {
        e.preventDefault();
        if ($("#emailLogin")[0].checkValidity() && $("#passwordLogin")[0].checkValidity()) {
            const data = {
                email: $("#emailLogin").val(),
                password: $("#passwordLogin").val()
            };

            postData("/login", data)
                .then(response => {
                    $("#emailLogin").val("");
                    $("#passwordLogin").val("");
                    if (response.success === "true") {
                        localStorage.setItem("token", response.token);
                        token = response.token;
                        authenticatedActions(url, token);
                    } else {
                        console.error("Error:", response);
                        notAuthenticatedActions(response.error);
                    }
                })
        } else {
            alert("Please provide valid credentials.");
        }
    });

    $("#register_form").submit(e => {
        e.preventDefault();
        if ($("#emailSignUp").get(0).checkValidity() && $("#passwordSignUp").get(0).checkValidity()) {
            const data = {
                email: $("#emailSignUp").val(),
                password: $("#passwordSignUp").val(),
                firstName: $("#firstNameSignUp").val(),
                lastName: $("#lastNameSignUp").val()
            };
            postData("/register", data, token)
                .then(response => {
                    $("#firstNameSignUp").val("");
                    $("#lastNameSignUp").val("");
                    $("#emailSignUp").val("");
                    $("#passwordSignUp").val("");
                    authenticatedActions(url, token);
                })
                .catch(err => {
                    console.error("Error :", err);
                });
        }
    });
    $("#logOut").click(e => {
        e.preventDefault();
        localStorage.removeItem("token");
        token = undefined;
        notAuthenticatedActions();
    });
    $("#start").click(e => {
        e.preventDefault();
        getQuestions("/questions", token);

    });
    $("#gryffindorHouse").click(e => {
        e.preventDefault();
        getHouseMembers("/house/gryffindor", token, "Gryffindor");
    });
    $("#slytherinHouse").click(e => {
        e.preventDefault();
        getHouseMembers("/house/slytherin", token, "Slytherin");
    });
    $("#hufflepuffHouse").click(e => {
        e.preventDefault();
        getHouseMembers("/house/hufflepuff", token, "Hufflepuff");
    });
    $("#ravenclawHouse").click(e => {
        e.preventDefault();
        getHouseMembers("/house/ravenclaw", token, "Ravenclaw");
    });
});


//SONS