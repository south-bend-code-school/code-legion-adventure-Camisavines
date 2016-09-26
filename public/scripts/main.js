(function(){
  $(document).ready(init);

  var username = "Unknown User";
  var gameState = "newgame";

  function init(){
    /*The following snippet of code will give the basic version of the Facebook SDK
    where the options are set to their most common defaults.
    You should insert it directly after the opening <body> tag
    on each page you want to load it:*/
    //login to facebook
    window.fbAsyncInit = function() {
      FB.init({
        appId      : '1467251056622138',
        xfbml      : true,
        version    : 'v2.7'
      });
    };

    (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "//connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));
    //END Facebook

    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyDEMt0LpJ-vhQlB9RaOBMGtLY3o66jqqCI",
      authDomain: "adventure-d2493.firebaseapp.com",
      databaseURL: "https://adventure-d2493.firebaseio.com",
      storageBucket: "adventure-d2493.appspot.com",
    };
    firebase.initializeApp(config);

    var provider = new firebase.auth.FacebookAuthProvider();

    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      username = user.displayName;

      setGameState("welcome");

    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;

    });


  }

  function setInputControls() {

  }

  function setGameState(state){
    switch(state)
    {
        case "welcome":
          $("#game").load( "screens/intro.html", function() {
          $("#playername").append(username);
            $("#btn1").unbind();
            $("#btn2").unbind();
            $("#btn3").unbind();
            $("#btn1").click(function() {setGameState("bathroom")});
            $("#btn1").html("Wash your hands");
            $("#btn2").click(function() {setGameState("outside")});
            $("#btn2").html("Leave the house");
            $("#btn3").click(function() {setGameState("welcome")});
            $("#btn3").html("Go back to sleep");
          } );
          break;

        case "bathroom":
          $("#game").load( "screens/bathroom.html", function() {
            $("#btn1").unbind();
            $("#btn2").unbind();
            $("#btn3").unbind();
            $("#btn1").click(function() {setGameState("dead")});
            $("#btn1").html("Go upstairs");
            $("#btn2").click(function() {setGameState("dead")});
            $("#btn2").html("Go into kitchen");
            $("#btn3").click(function() {setGameState("welcome")});
            $("#btn3").html("Go outside");
          } );
          break;

        case "dead":
          $("#game").load( "screens/dead.html", function() {
            $("#playername").append(username);
            $("#btn1").unbind();
            $("#btn2").unbind();
            $("#btn3").unbind();
            $("#btn1").click(function() {setGameState("welcome")});
            $("#btn1").html("Restart");
            $("#btn2").click(function() {setGameState("welcome")});
            $("#btn2").html("Restart");
            $("#btn3").click(function() {setGameState("welcome")});
            $("#btn3").html("Restart");
          } );
          break;

          case "outside":
            $("#game").load( "screens/outside.html", function() {
              $("playername").append(username);
              $("#btn1").unbind();
              $("#btn2").unbind();
              $("#btn3").unbind();
              $("#btn4").unbind();
              $("#btn1").click(function() {setGameState("dead")});
              $("#btn1").html("Grab the knife")
              $("#btn2").click(function() {setGameState("dead")});
              $("#btn2").html("Grab the gun")
              $("#btn3").click(function() {setGameState("dead")});
              $("#btn3").html("Read the paper")
            })

            break;

    }
  }

})();
