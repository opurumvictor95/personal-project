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


//initial login
firebase.auth().onAuthStateChanged(function(user) {

  if (user) {
    // User is signed in.
   
    document.getElementById("login_div").style.display = "none";
    document.getElementById("register_div").style.display = "none";
    document.getElementById("addToCart").style.display = "none";
    document.getElementById("user_div").style.display = "block";
    document.getElementById("logoutbtn").style.display = "block";
    document.getElementById("testsearch").style.display = "block";
    document.getElementById("ImageContainer-div").style.display = "block";
    document.getElementById("addToCart").style.display = "none";
    document.getElementById("cartPage").style.display = "none";
    document.getElementById("cartdiv").style.display = "none";
    

 
 

    useruid = user.uid;
    var ref = firebase.database().ref('/user/' + useruid);
    ref.on("value", function(snapshot) {

      var newPost = snapshot.val();
      var nameObj = newPost.Name;
      var cartItemsObj = newPost.totalQty;
      
      document.getElementById("welcomeuser").innerHTML = "Welcome Back " + nameObj + "!";  

      document.getElementById("cartNumLabel").innerHTML = cartItemsObj + " items";
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
    document.getElementById("cartPage").style.display = "none";
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

 

  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then(function(){
  
    var userID = firebase.auth().currentUser.uid;
    const ref = firebase.database().ref('/user/' + userID);

    ref.set({
      Name: name,
      Email: email,
      Password: password,
      Phonenumber:  phonenumber, 
      Address: address
    });

  }).catch(function(error) {

    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error: " + errorMessage);
  });
  

}




//For id use # 
//For class use . 
//Create a span class and use that to filter images by search
  $(document).ready(function () {

    $("#myInput").on("keyup", function(){

      //Retrieve the input field text
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







  //Filter by categories:

//Jquery code to filter images
$(document).ready(function() {

  //Get the class of the link
  $('.button').click(function(){

      var name = $(this).attr("data-filter");
     

      if(name == "all"){

          $(".filter").show("2000");
      }

      else {
          $(".filter").not("."+name).hide("2000");
          $(".filter").filter("."+name).show("2000");
      }

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
  document.getElementById("ImageContainer-div").style.display = "none";
  document.getElementById("searchnav").style.display = "none";

  var img = document.createElement('img'); 
  img.src = '/Users/victoropurum/Desktop/ShopGames/GameIcons/GravityRush.png'; 
  img.width = "300";
  img.height = "300";
  img.alt = "Gravity Rush";

  document.getElementById('imageitem').appendChild(img);

  var X = document.getElementById("shopGames").getAttribute("img-title");
  document.getElementById('UserItem').innerHTML = X;

  //Unit price
  document.getElementById("unitprice").innerHTML = "Unit Price: $30";


  var user = firebase.auth().currentUser;
  useruid = user.uid;

  document.getElementById("currentQtyItems").innerHTML = "Cart Qty: " + 0;

  firebase.auth().onAuthStateChanged(function(user) {

      if (user) {
        // User is signed in.
        var ref = firebase.database().ref('/user/' + useruid + '/GravURL/');
          ref.on("value", function(snapshot) {

            var newPost = snapshot.val();
            var GravGameQty = newPost.GravQty;

            console.log("Grav Qty: " + GravGameQty);

            if (GravGameQty !== null && GravGameQty > 0){
              document.getElementById("currentQtyItems").innerHTML = "Cart Qty: " + GravGameQty;
            }
              
   
            else if(GravGameQty == null){
              document.getElementById("currentQtyItems").innerHTML = "Cart Qty: " + 0;
            }


          });


      } else {
        console.log("User not signed in");
      }
  });


}




function AddCOD() {
  document.getElementById("addToCart").style.display = "block";
  document.getElementById("testsearch").style.display = "none";
  document.getElementById("ImageContainer-div").style.display = "none";
  document.getElementById("searchnav").style.display = "none";

  var img = document.createElement('img'); 
  img.src = '/Users/victoropurum/Desktop/ShopGames/GameIcons/CODBlackOps.png'; 
  img.width = "300";
  img.height = "300";
  img.alt = "COD";
  document.getElementById('imageitem').appendChild(img);


  var X = document.getElementById("shopCOD").getAttribute("img-title");
  document.getElementById('UserItem').innerHTML = X;

  //Unit price
  document.getElementById("unitprice").innerHTML = "Unit Price: $40";


  var user = firebase.auth().currentUser;
  useruid = user.uid;


  document.getElementById("currentQtyItems").innerHTML = "Cart Qty: " + 0;

  firebase.auth().onAuthStateChanged(function(user) {

      if (user) {
        // User is signed in.
      
        var ref = firebase.database().ref('/user/' + useruid + '/CODURL/');
          ref.on("value", function(snapshot) {

            var newPost = snapshot.val();
            var CODGameQty = newPost.CODQty;

           if (CODGameQty !== null && CODGameQty > 0){
              document.getElementById("currentQtyItems").innerHTML = "Cart Qty: " + CODGameQty;
            }
              
   
            else if(CODGameQty == null){
              document.getElementById("currentQtyItems").innerHTML = "Cart Qty: " + 0;
            }


          });


      } else {
        console.log("User not signed in");
      }
  });


}





function AddFIFA20() {
  document.getElementById("addToCart").style.display = "block";
  document.getElementById("testsearch").style.display = "none";
  document.getElementById("ImageContainer-div").style.display = "none";
  document.getElementById("searchnav").style.display = "none";


  var img = document.createElement('img'); 
  img.src = '/Users/victoropurum/Desktop/ShopGames/GameIcons/FIFA20.png'; 
  img.width = "300";
  img.height = "300";
  img.alt = "FIFA20";
  document.getElementById('imageitem').appendChild(img);

  var X = document.getElementById("shopFIFA20").getAttribute("img-title");
  document.getElementById('UserItem').innerHTML = X;


  //Unit price
  document.getElementById("unitprice").innerHTML = "Unit Price: $50";


  //Change to FIFA
  var user = firebase.auth().currentUser;
  useruid = user.uid;


  document.getElementById("currentQtyItems").innerHTML = "Cart Qty: " + 0;

  firebase.auth().onAuthStateChanged(function(user) {

      if (user) {
        // User is signed in.
      
        var ref = firebase.database().ref('/user/' + useruid + '/FIFAURL/');
          ref.on("value", function(snapshot) {

            var newPost = snapshot.val();
            var FIFAGameQty = newPost.FIFAQty;

            if (FIFAGameQty !== null && FIFAGameQty > 0){
              document.getElementById("currentQtyItems").innerHTML = "Cart Qty: " + FIFAGameQty;
            }
              
   
            else if(FIFAGameQty == null){
              document.getElementById("currentQtyItems").innerHTML = "Cart Qty: " + 0;
            }


          });


      } else {
        console.log("User not signed in");
      }
  });
  
}



function AddHockey() {
  document.getElementById("addToCart").style.display = "block";
  document.getElementById("testsearch").style.display = "none";
  document.getElementById("ImageContainer-div").style.display = "none";
  document.getElementById("searchnav").style.display = "none";


  var img = document.createElement('img'); 
  img.src = '/Users/victoropurum/Desktop/ShopGames/GameIcons/Hockey.png'; 
  img.width = "300";
  img.height = "300";
  img.alt = "Hockey";
  document.getElementById('imageitem').appendChild(img);

  var X = document.getElementById("shopHockey").getAttribute("img-title");
  document.getElementById('UserItem').innerHTML = X;

  //Unit price
  document.getElementById("unitprice").innerHTML = "Unit Price: $30";


  //Change to hockey
  var user = firebase.auth().currentUser;
  useruid = user.uid;


  document.getElementById("currentQtyItems").innerHTML = "Cart Qty: " + 0;

  firebase.auth().onAuthStateChanged(function(user) {

      if (user) {
        // User is signed in.
      
        var ref = firebase.database().ref('/user/' + useruid + '/HockeyURL/');
          ref.on("value", function(snapshot) {

            var newPost = snapshot.val();
            var HockeyGameQty = newPost.HockeyQty;

            if (HockeyGameQty !== null && HockeyGameQty > 0){
              document.getElementById("currentQtyItems").innerHTML = "Cart Qty: " + HockeyGameQty;
            }
              
   
            else if(HockeyGameQty == null){
              document.getElementById("currentQtyItems").innerHTML = "Cart Qty: " + 0;
            }



          });


      } else {
        console.log("User not signed in");
      }
  });
  
}




//Add to cart button
function additem() {

  document.getElementById("addToCart").style.display = "none";
  document.getElementById("testsearch").style.display = "none";
  document.getElementById("cartPage").style.display = "block";




  //Get the cost and quantity of the item and the properties of the image item
  var itemcost = document.getElementById("priceItem").innerText;
  var itemqty = document.getElementById("itemCount").innerText;
  var imageURL = document.getElementById('imageitem').innerHTML; 

  console.log(itemcost);

  

  //Use the alt of the image to save the item value and quantity of a specific selection of the game you buy
  var alt = imageURL.split('"');
  var altlength = (alt.length-1);
  var alt = imageURL.split('"')[altlength-1];   //alt is the name of the file
  
  var pricepostn = itemcost.indexOf('$')+1;
  var qtypostn = itemqty.indexOf(':')+2;


  var itemcostDB = itemcost.substring(pricepostn, itemcost.length);
  var itemqtyLengthDB = itemqty.substring(qtypostn, itemqty.length);



  var user = firebase.auth().currentUser;

  if (user) {

  var currentuserID = user.uid;


  if(alt == "Gravity Rush"){

      var GravRefObject = firebase.database().ref('user/' + currentuserID + "/GravURL/");

      GravRefObject.update({
        GravURL: imageURL,
        GravPrice: itemcostDB,
        GravQty: itemqtyLengthDB
      });

      
  }



  else if(alt == "COD"){

    const CODRefObject = firebase.database().ref('user/' + currentuserID + "/CODURL/");

    CODRefObject.update({
      CODURL: imageURL,
      CODPrice: itemcostDB,
      CODQty: itemqtyLengthDB
    });

  }




  else if(alt == "FIFA20"){

    const FIFARefObject = firebase.database().ref('user/' + currentuserID + "/FIFAURL/");

    FIFARefObject.update({
      FIFAURL: imageURL,
      FIFAPrice: itemcostDB,
      FIFAQty: itemqtyLengthDB
    });

  }




  else if(alt == "Hockey"){
  
    var HockeyRefObject = firebase.database().ref('user/' + currentuserID + "/HockeyURL/");

    HockeyRefObject.update({
      HockeyURL: imageURL,
      HockeyPrice: itemcostDB,
      HockeyQty: itemqtyLengthDB
    });

  }


  } else {
    
    console.log("User is not signed in");
  }



  //The display part
  document.getElementById("itemNum").innerHTML = itemqtyLengthDB;
  document.getElementById("PriceNum").innerHTML = itemcostDB;


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


  //Get qty from DB
  var dbqty = document.getElementById("currentQtyItems").innerText;
  var dbqtyprice = dbqty.substring(dbqty.indexOf(':')+2, dbqty.length);



  //User value
  var qty = document.getElementById("qtyfield").value;
  var sumqty = +dbqtyprice + +qty;

  
  //Calculate price
  var checkout = document.getElementById("unitprice").innerText;
  var priceLength = checkout.length;
  var pricepostn = checkout.indexOf('$')+1;

  var checkoutPrice = checkout.substring(pricepostn,priceLength);



  if(qty > 1) {
    var newPrice = sumqty * checkoutPrice;

    document.getElementById("priceItem").innerHTML = "Total Price: $" + newPrice;
    document.getElementById("itemCount").innerHTML = "Total Items: " + sumqty;
  }



}



//logout
function logout(){
  document.getElementById("searchnav").style.display = "none";
  document.getElementById("ImageContainer-div").style.display = "none";
  document.getElementById("cartdiv").style.display = "none";
  

  firebase.auth().signOut();
}



//Return home
function returnHome() {
  document.getElementById("testsearch").style.display = "block";
  document.getElementById("addToCart").style.display = "none";
}







//display cart function
function displayCart() {

  document.getElementById("ImageContainer-div").style.display = "none";
  document.getElementById("searchnav").style.display = "none";
  document.getElementById("testsearch").style.display = "none";
  document.getElementById("cartdiv").style.display = "block";

  var GravItem = null; var CODItem = null; var FIFAItem = null; var HockeyItem = null;
  
  //Price
  var GravPrice = null; var CODPrice = null; var FIFAPrice = null; var HockeyPrice = null;

  var user = firebase.auth().currentUser;

  firebase.auth().onAuthStateChanged(function(user) {

    if (user) {

      var currentuserID = user.uid;

      //Gravity Rush display
      var GravRefObject = firebase.database().ref('user/' + currentuserID + "/GravURL/");


      GravRefObject.on("value", function(snapshot) {

        var newPost = snapshot.val();
        var GravImage = newPost.GravURL;
        GravItem = newPost.GravQty;
        GravPrice = newPost.GravPrice;

        if (GravImage !== null){
          document.getElementById("gravimageCart").innerHTML = GravImage;
        }

        if (GravItem !== null){
          document.getElementById("gravitemCart").innerHTML = GravItem;
        }
        

        if (GravPrice !== null){
          document.getElementById("gravpriceCart").innerHTML = "$" + GravPrice; 
        }

      });



    
      var CODRefObject = firebase.database().ref('user/' + currentuserID + "/CODURL/");
    
      CODRefObject.on("value", function(snapshot) {

          var newPost = snapshot.val();
          var CODImage = newPost.CODURL;
          CODItem = newPost.CODQty;
          CODPrice = newPost.CODPrice;

          if (CODImage !== null){
            document.getElementById("CODimageCart").innerHTML = CODImage;
          }

          if (CODItem !== null){
            document.getElementById("CODitemCart").innerHTML = CODItem;
          }
          

          if (CODPrice !== null){
            document.getElementById("CODpriceCart").innerHTML = "$" + CODPrice; 
          }
          

  
        });


    

       var FIFARefObject = firebase.database().ref('user/' + currentuserID + "/FIFAURL/");
    
       FIFARefObject.on("value", function(snapshot) {

          var newPost = snapshot.val();
          var FIFAImage = newPost.FIFAURL;
          var FIFAItem = newPost.FIFAQty;
          FIFAPrice = newPost.FIFAPrice;



          if (FIFAImage !== null){
            document.getElementById("FIFAimageCart").innerHTML = FIFAImage;
          }

          if (FIFAItem !== null){
            document.getElementById("FIFAitemCart").innerHTML = FIFAItem;
          }
          

          if (FIFAPrice !== null){
            document.getElementById("FIFApriceCart").innerHTML = "$" + FIFAPrice; 
          }

  
        });
    

    
        var HockeyRefObject = firebase.database().ref('user/' + currentuserID + "/HockeyURL/");
    
        HockeyRefObject.on("value", function(snapshot) {

          var newPost = snapshot.val();
          var HockeyImage = newPost.HockeyURL;
          HockeyItem = newPost.HockeyQty;
          HockeyPrice = newPost.HockeyPrice;

          if (HockeyImage !== null){
            document.getElementById("HockeyimageCart").innerHTML = HockeyImage;
          }

          if (HockeyItem!== null){
            document.getElementById("HockeyitemCart").innerHTML = HockeyItem;
          }
          

          if (HockeyPrice !== null){
            document.getElementById("HockeypriceCart").innerHTML = "$" + HockeyPrice;  
          }

  
        });


        //Display cart item
        var totalItems = +GravItem + +FIFAItem + +CODItem + +HockeyItem;
        var totalPriceItems = +GravPrice + +CODPrice + +FIFAPrice + +HockeyPrice;
        document.getElementById("cartNumLabel").innerHTML = totalItems + " items";

        document.getElementById("totalQuantityItem").innerHTML = totalItems;
        document.getElementById("totalPriceItem").innerHTML = "$" + totalPriceItems;
        

        var totalItemsRef = firebase.database().ref('user/' + currentuserID);

        totalItemsRef.update({
          totalQty: totalItems
        });


    
      } else {
        
        console.log("User is not signed in");
      }

  });

}





function deleteGrav() {

        var txt;

        var user = firebase.auth().currentUser;
        //initial login
        firebase.auth().onAuthStateChanged(function(user) {

          if (user) {
            // User is signed in.
          
            useruid = user.uid;
            var ref = firebase.database().ref('/user/' + useruid);
            var GravID = document.getElementsByClassName("GravclassImg")[0].id;
          

            //Delete Grav Price and Qty
            var GravRefQty = firebase.database().ref('user/' + useruid + "/GravURL/" + "GravQty/");
            var GravRefPrice = firebase.database().ref('user/' + useruid + "/GravURL/" + "GravPrice/");

        
            if(GravID== "GravImage"){

              if(confirm("Do you want to delete entire cart!?")){
                txt = "Yes"
              }
            
              else {
                  txt = "No"
              }

            
              if(txt == "Yes") {
                
                GravRefQty.remove();
                GravRefPrice.remove();

                alert("Entire cart has been deleted!");
              }
            
              else {
                returnHome();
              }

            }
            

          }  else {
            alert("User not signed");
          }


        });
      
}





function deleteCOD() {

  var user = firebase.auth().currentUser;
        //initial login
        firebase.auth().onAuthStateChanged(function(user) {

          if (user) {
            // User is signed in.
          
            useruid = user.uid;
            var ref = firebase.database().ref('/user/' + useruid);
            var CodID = document.getElementsByClassName("CODclassImg")[0].id;
          

            //Delete Grav Price and Qty
            var CODRefQty = firebase.database().ref('user/' + useruid + "/CODURL/" + "CODQty/");
            var CODRefPrice = firebase.database().ref('user/' + useruid + "/CODURL/" + "CODPrice/");
        
            if(CodID== "CODImage"){
        
              console.log("Grav Delete button detected");

              if(confirm("Do you want to delete entire cart!?")){
                txt = "Yes"
              }
            
              else {
                  txt = "No"
              }
              
            
              if(txt == "Yes") {
  
                CODRefQty.remove();
                CODRefPrice.remove();

                alert("Entire cart has been deleted!");

              }
            
              else {
                returnHome();
              }

            }
            

          }  else {
            alert("User not signed");
          }


    });

}





function deleteFIFA() {

  var user = firebase.auth().currentUser;
        //initial login
        firebase.auth().onAuthStateChanged(function(user) {

          if (user) {
            // User is signed in.
          
            useruid = user.uid;
            var ref = firebase.database().ref('/user/' + useruid);
            var FIFAId = document.getElementsByClassName("FIFAclassImg")[0].id;
          

            //Delete Grav Price and Qty
            var FIFARefQty = firebase.database().ref('user/' + useruid + "/FIFAURL/" + "FIFAQty/");
            var FIFARefPrice = firebase.database().ref('user/' + useruid + "/FIFAURL/" + "FIFAPrice/");

            if(FIFAId == "FIFAImage"){
        
              console.log("FIFA Delete button detected");

              if(confirm("Do you want to delete entire cart!?")){
                txt = "Yes"
              }
            
              else {
                  txt = "No"
              }
              
            
              if(txt == "Yes") {

                FIFARefQty.remove();
                FIFARefPrice.remove();

                alert("Entire cart has been deleted!");

              }
            
              else {
                returnHome();
              }

            }
            

          }  else {
            alert("User not signed");
          }


    });

}




function deleteHockey() {

        
  
        var user = firebase.auth().currentUser;
        //initial login
        firebase.auth().onAuthStateChanged(function(user) {

          if (user) {
            // User is signed in.
          
            useruid = user.uid;
            var ref = firebase.database().ref('/user/' + useruid);
            var HockeyID = document.getElementsByClassName("HockeyclassImg")[0].id;
          

            //Delete Grav Price and Qty
            var HockeyRefQty = firebase.database().ref('user/' + useruid + "/HockeyURL/" + "HockeyQty/");
            var HockeyRefPrice = firebase.database().ref('user/' + useruid + "/HockeyURL/" + "HockeyPrice/");
        

            if(HockeyID == "HockeyImage"){
        
              console.log("Hockey Delete button detected");

              if(confirm("Are you sure you want to delete this item permanently!")){
                txt = "Yes"
              }
            
              else {
                  txt = "No"
              }
              
            
              if(txt == "Yes") {
                
                HockeyRefQty.remove();
                HockeyRefPrice.remove();

                alert("Entire cart has been deleted!");
              }
            
              else {
                returnHome();
              }

            }
            

          }  else {
            alert("User not signed");
          }


    });

}















