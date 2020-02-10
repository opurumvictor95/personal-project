var firebaseConfig = {
  apiKey: "AIzaSyDmXdZ7hR7udOiiBdiM1RXtE3eSP9aTjA0",
  authDomain: "shopgames-2b2f0.firebaseapp.com",
  databaseURL: "https://shopgames-2b2f0.firebaseio.com",
  projectId: "shopgames-2b2f0",
  storageBucket: "shopgames-2b2f0.appspot.com",
  messagingSenderId: "460638858846",
  appId: "1:460638858846:web:694d08ac761af6c37c8ecf",
  measurementId: "G-NN3ZVXRSVS"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var user = firebase.auth().currentUser;


firebase.auth().onAuthStateChanged(function(user) {

  if (user) {
    // User is signed in.
   
    document.getElementById("login_div").style.display = "none";
    document.getElementById("register_div").style.display = "none";
    document.getElementById("addToCart").style.display = "none";
    document.getElementById("user_div").style.display = "block";
    document.getElementById("logoutbtn").style.display = "block";
    document.getElementById("testsearch").style.display = "block";
    document.getElementById("addToCart").style.display = "none";
    document.getElementById("cartPage").style.display = "none";

    const dbRefObject = firebase.database().ref('gameProfiles');
    //const dbRefObject = firebase.database().ref('gameProfiles').child('users');
 
    dbRefObject.on("child_added", function(snapshot, prevChildKey) { //works

    //dbRefObject.on("child_added", function(snapshot) {

      var newPost = snapshot.val();
      var addressObj = newPost.Address;
      var emailObj = newPost.Email;
      var nameObj = newPost.Name;
      var phonenumberObj = newPost.phonenumber;
      var cartItem = newPost.ItemValue;
      
      document.getElementById("welcomeuser").innerHTML = "Welcome Back " + nameObj + "!";

      //console.log(Object.keys(user));
      //console.log(user.uid);

      //var getcartItem = cartItem.substr(0, cartItem.indexOf(' '));

      document.getElementById("cartNumLabel").innerHTML = cartItem + " items";
    });  
    
  

  } else {
    // No user is signed in.

    document.getElementById("logoutbtn").style.display = "none";
    document.getElementById("user_div").style.display = "none";
    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";
    document.getElementById("addToCart").style.display = "none";
    document.getElementById("testsearch").style.display = "none";
    document.getElementById("addToCart").style.display = "none";
  }
});




function createUser() {
  document.getElementById("register_div").style.display = "block";
  document.getElementById("login_div").style.display = "none";
  document.getElementById("testsearch").style.display = "none";

}


function register() {

  var name = document.getElementById("username_txt").value;
  var email = document.getElementById("email_txt").value;
  var password = document.getElementById("pass_field").value;
  var phonenumber = document.getElementById("phone_num").value;
  var address = document.getElementById("address_txt").value; 

  const database = firebase.database().ref('gameProfiles');
  /*const ref = database.ref('email');  //Saves with email as the reference
  const ref = database.ref('email');  //Saves with email as the reference
  //var ref = database.ref();   //This saves database objects with random ID*/


const ref = database.child('users');

ref.set({
  Name: name,
  Email: email,
  Password: password,
  Phonenumber:  phonenumber, 
  Address: address
})


  /*ref.push({
    Name: name,
    Email: email,
    Password: password,
    Phonenumber:  phonenumber, 
    Address: address
  })*/



  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error: " + errorMessage);
    // ...
  });
}




//For id use # 
//For class use . 
  $(document).ready(function () {

    $("#myInput").on("keyup", function(){

      //Retrieve the inpit field text
      var filter = $(this).val().toLowerCase();


      $(".imgtitle").each(function() {

        //If the div item does not contain the text phrase fade it out
        if($(this).attr('img-title').search(new RegExp(filter, "i")) < 0) {
          $(this).fadeOut();
        }
        else {
          $(this).show();
        }

      });
    });
  });




function login(){

  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);

    // ...

    
  }); 
}



function AddGravityRush() {
  document.getElementById("addToCart").style.display = "block";
  document.getElementById("testsearch").style.display = "none";

  var img = document.createElement('img'); 
  img.src = '/Users/victoropurum/Desktop/ShopGames/GameIcons/GravityRush.png'; 
  img.width = "100";
  img.height = "100";
  img.alt = "Gravity Rush";
  document.getElementById('imageitem').appendChild(img);



  var X = document.getElementById("shopGames").getAttribute("img-title");
  document.getElementById('UserItem').innerHTML = X;

  //Price per item
  document.getElementById("priceItem").innerHTML = "Price:$ " + 30;

}


function AddCOD() {
  document.getElementById("addToCart").style.display = "block";
  document.getElementById("testsearch").style.display = "none";

  var img = document.createElement('img'); 
  img.src = '/Users/victoropurum/Desktop/ShopGames/GameIcons/CODBlackOps.png'; 
  img.width = "100";
  img.height = "100";
  img.alt = "Gravity Rush";
  document.getElementById('imageitem').appendChild(img);


  var X = document.getElementById("shopCOD").getAttribute("img-title");
  document.getElementById('UserItem').innerHTML = X;

  //Price per item
  document.getElementById("priceItem").innerHTML = "Price:$ " + 40;


}

function AddFIFA20() {
  document.getElementById("addToCart").style.display = "block";
  document.getElementById("testsearch").style.display = "none";

  var img = document.createElement('img'); 
  img.src = '/Users/victoropurum/Desktop/ShopGames/GameIcons/FIFA20.png'; 
  img.width = "100";
  img.height = "100";
  img.alt = "Gravity Rush";
  document.getElementById('imageitem').appendChild(img);

  var X = document.getElementById("shopFIFA20").getAttribute("img-title");
  document.getElementById('UserItem').innerHTML = X;


  //Price of FIFA is $50 but this varies per game
  document.getElementById("priceItem").innerHTML = "Price:$ " + 50;
  
}




//Add to cart button
function additem() {

  document.getElementById("addToCart").style.display = "none";
  document.getElementById("testsearch").style.display = "none";
  document.getElementById("cartPage").style.display = "block";


  //Get the cost and quantity of the item
  var itemcost = document.getElementById("priceItem").innerText;
  var itemqty = document.getElementById("itemCount").innerText


  var itemcostLength = itemcost.length;
  var itemqtyLength = itemqty.length;


  //Optimize the substring code in such a way that you find the "$" sign and go from there instead of hardcoding numbers
  var itemcostDB = itemcost.substring(8, itemcostLength);
  var itemqtyLengthDB = itemqty.substring(6, itemqtyLength);

  console.log(itemcostDB);
  console.log(itemqtyLengthDB);


  var user = firebase.auth().currentUser;
 
  if (user) {

  const dbRefObject = firebase.database().ref('gameProfiles').child('users');

  dbRefObject.update({
    ItemPrice: itemcostDB,
    ItemValue: itemqtyLengthDB
  });


  } else {
    // No user is signed in.
    console.log("User is not signed in");
  }



  //The display part
  document.getElementById("PriceNum").innerHTML = itemcost;
  document.getElementById("itemNum").innerHTML = itemqty;


}





//reset password redirect
function resetPass() {
  document.getElementById("resetPass").style.display = "block";
  document.getElementById("login_div").style.display = "none";
}



//reset password func
function reset() {
var auth = firebase.auth();
var emailAddress = document.getElementById("email_field").value;

auth.sendPasswordResetEmail(emailAddress).then(function() {
  // Email sent.
    window.alert("Link sent to email, please check!");
    }).catch(function(error) {
      // An error happened.
    });
}


//return to login from register page
function returnlogin() { 
  document.getElementById("login_div").style.display = "block";
  document.getElementById("register_div").style.display = "none";
  document.getElementById("testsearch").style.display = "none";
}



//Update cost based on quantity inputted
function confirmQty() {

  var qty = document.getElementById("qtyfield").value;

  //Calculate price
  var checkout = document.getElementById("priceItem").innerText;
  var priceLength = checkout.length;
  checkoutPrice = checkout.substring(8,priceLength);



  if(qty > 1) {
    var newPrice = qty * checkoutPrice;
    document.getElementById("priceItem").innerHTML = "Price:$ " + newPrice;
    document.getElementById("itemCount").innerHTML = "Item: " + qty;
  }

}






//logout
function logout(){
  firebase.auth().signOut();
}


//Return home
function returnHome() {
  document.getElementById("testsearch").style.display = "block";
  document.getElementById("addToCart").style.display = "none";
}












