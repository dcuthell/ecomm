//Business Logic

//GLOBAL VARIABLE FOR TESTING
mySite = new SiteManager();

//CONSTRUCTORS
function SiteManager(){
  this.buyers = [];
  this.goods = [];
  this.accounts = [];
  this.active;
}

function Buyer(name, id){
  this.buyerName = name;
  this.cart = [];
  this.buyerID = id;
}

function Good(name, desc, quantity, price, imglink, id){
  this.goodName = name;
  this.goodDesc = desc;
  this.quantity = quantity;
  this.price = price;
  this.imgLink = imglink;
  this.goodID = id;
}

function Account(first, last, userName, password, id) {
  this.first = first;
  this.last = last;
  this.userName = userName;
  this.password = password;
  this.accountID = id;
}

//FUNCTION PROTOTYPES

//addGood will create a new good and give it an ID before adding it to the array
SiteManager.prototype.addGood = function(name, desc, quantity, price, imglink) {
  var index = this.goods.length;
  var newGood = new Good(name, desc, quantity, price, imglink, index);
  this.goods.push(newGood);
}

//addBuyer will create a new buyer and give it an ID before adding it to the array
SiteManager.prototype.addBuyer = function(name) {
  var index = this.buyers.length;
  var newBuyer = new Buyer(name, index);
  this.buyers.push(newBuyer);
}

//addAccount will create a new account and give it an ID before adding it to the array
//it was also control for casing of username and password
SiteManager.prototype.addAccount = function(first, last, userName, password) {
  var index = this.accounts.length;
  userName = userName.toLowerCase();
  password = password.toLowerCase();
  var newAccount = new Account(first, last, userName, password, index);
  this.accounts.push(newAccount);
}

//goodToCart will take a specific good and put a specifc amount into a specific buyer's cart
SiteManager.prototype.goodToCart = function(buyerID, goodID, amount) {
  if(this.goods[goodID].decreaseAmount(amount) === 0){
    alert("Not enough inventory");
    return 0;
  }
  this.buyers[buyerID].addToCart(this.goods[goodID], amount);
}

//cartToGood will return a specific amount of a specific good in a specific buyer's cart to the original good's location
SiteManager.prototype.cartToGood = function(buyerID, goodID, amount) {
  var oldGoodID = this.buyers[buyerID].cart[goodID].oldID;
  if(this.buyers[buyerID].removeFromCart(goodID, amount) === 0){
    alert("Not enough in cart");
    return 0;
  }
  alert(oldGoodID);
  this.goods[oldGoodID].increaseAmount(amount);
}

//addToCart will take a good, and amount, and create a new good item in the cart with the amount as the quantity. It will also assign a new ID for use in the cart. This allows us to "separate" a good into two different amounts.
//Also will remove amount from good's inventory
Buyer.prototype.addToCart = function(inputGood, amount){
  var index = this.cart.length;
  var newGood = new Good(inputGood.goodName, inputGood.goodDesc, amount, inputGood.price, inputGood.imgLink, index);
  newGood.oldID = inputGood.goodID;
  this.cart.push(newGood);
}

//removeFromCart will take a good index and an amount, and remove that many of that good from the cart. If successful, it will return that amount
//If the amount is greater than the quantity, it will return 0. If the good's quantity goes to 0, it will remove that good from the cart
Buyer.prototype.removeFromCart = function(goodIndex, amount){
  if(this.cart[goodIndex].quantity < amount){
    return 0;
  }
  if(this.cart[goodIndex].quantity === amount){
    this.cart.splice(goodIndex, 1);
    return amount;
  }
  this.cart[goodIndex].decreaseAmount(amount);
  return amount;
}

//totalCart will add up all the prices of the goods in the cart and return to total
Buyer.prototype.totalCart = function(){
  var total = 0;
  for(var i=0; i < this.cart.length; i++){
    total += (this.cart[i].price * this.cart[i].quantity);
  }
  return total;
}
//decreaseAmount will take an amount input and subract that amount from a good's quantity
//It will return that same amount, unless the amount is greater than the quantity, it which case it will return 0
Good.prototype.decreaseAmount = function(amount){
  var newAmount = this.quantity - amount;
  if(newAmount < 0){
    return 0;
  }
  this.quantity -= amount;
  return amount;
}

//increaseAmount will take an amount input and add that amount to a good's quantity
Good.prototype.increaseAmount = function(amount){
  this.quantity += amount;
  return 1;
}


//POPULATE FUNCTIONS
//Enters in dummy data for testing purposes

function populateBuyers(sitemanager){
  var name = ["Jimmy the Nose", "Buddy Small Shoes", "Frankie Squats", "Donny Diamonds", "Fast Freddy"];
  for (var i=0; i < name.length; i++){
    sitemanager.addBuyer(name[i]);
  }
}

function populateGoods(sitemanager){
  var name = ["ackee", "buddhas hand", "hala aka puhala tree fruit", "horned mellon", "jackfruit", "mangosteen", "pitaya", "rambutan", "romanesco broccoli"];
  var desc = ["So what does ackee taste like? It's completely unique. The fruit has a buttery, creamy texture and a mildtaste that reminded me of hearts of palm. The saltfish in the dish plays off the mild fruit nicely, adding a saline tang.", "Though it looks like a lemon gone wild, the Buddha's hand is actually a distinct fruit in the citron family. It has a sweet, lemon blossom aroma and no juice or pulp. The mild-tasting pith is not bitter, so the fruit can be zested or used whole.", "Although the hala fruit was indeed eaten in times of famine in Hawai'i, the edible part wasn't considered all that tasty.", "connoisseurs describe the flavor of the slimy green interior as a cross between cucumber, zucchini, and kiwifruit (though as it ripens, it tastes more like a banana). A fully ripened kiwano has an orange rind with prominent spikes. To eat plain, cut the fruit in half, as shown above.connoisseurs describe the flavor of the slimy green interior as a cross between cucumber, zucchini, and kiwifruit (though as it ripens, it tastes more like a banana). A fully ripened kiwano has an orange rind with prominent spikes. To eat plain, cut the fruit in half, as shown above.", "The starchy unripe fruit can be cooked in curries, while sweet, ripe jackfruit complements sticky rice and ice cream. You can get jackfruit chips, jackfruit noodles, jackfruit papad. Followers of American vegan-cooking blogs, on the other hand, will find unripe jackfruit compared, with confounding frequency, to “vegan pulled pork.”", "It's not very common in North America, but if you grew up in Southeast Asia, chances are you're familiar with this sweet yet tangy tropical fruit. The mangosteen is a nearly spherical fruit with a thick, inedible deep purple skin, a succulent white segmented interior, and a thick, cartoonish green stem", "Dragonfruit (pitaya) doesn't have much taste. The best way I can describe it, is kind of like a white kiwi - in terms of consistency/flavor. Usually not very sweet (like a kiwi). Tends to be more bland/subtle (once in a while somewhat sweet).", "Native to the Malay Archipelago, the name of this fruit is derived from the Malay word meaning 'hairy,' and you can see why. But once the hairy exterior of therambutan is peeled away, the tender, fleshy, delicious fruit is revealed. Its taste is described as sweet and sour, much like a grape.", "In fact, it's an edible flower from the family that includes broccoli, cauliflower, Brussels sprouts, and cabbage. It tastes very similar to cauliflower, but with a slightly nuttier, earthier flavor."];
  var quantity = [12, 12, 12, 12, 12, 12, 12, 12, 12];
  var price = [1.25, 1.25, 1.25, 2.75, 2.75, 2.75, 3.50, 3.50, 3.50];
  var imglink = ["img/ackee.jpg", "img/buddhas.hand.jpg", "img/hala.aka.puhala.tree.fruit.jpg", "img/horned.melon.jpg", "img/jackfruit.jpg", "img/mangosteen.jpg", "img/pitaya.jpg", "img/rambutan.jpg", "img/romanesco.broccoli.jpg"];

  for (var i=0; i < name.length; i++){
    sitemanager.addGood(name[i], desc[i], quantity[i], price[i], imglink[i]);
  }
}



function testPassword(first, second) {
  if (first===second) {
    return true;
  } else {
    return false;
  }
}



Account.prototype.fullName = function() {
  // console.log('yo');
  return this.first + ' ' + this.last;
}

//User Interface
$(document).ready(function() {
  var siteManager = new SiteManager();
  populateGoods(siteManager);
  var goodsArray = siteManager.goods;
  console.log(goodsArray);
  var accountBank = []; //Hold accounts in array

  function showProducts(productArray) {
    var colCount = 3;
    var output = "";

    for (var i =0; i < productArray.length; i++) {
      if(colCount === 3){
        output += '<div class="row">' //start a new row when 3 columns
      }
      output += '<div class ="col-md-4">' +
                  '<div class="panel panel-default">' +
                    '<div class="panel-heading">' +
                      '<p class="style1">' +
                      productArray[i].goodName +
                      '</p>'+
                      '<img src="' + productArray[i].imgLink + '" alt="broken" class="fruitPic"/>' +
                    '</div>'+
                    '<div class="panel-body">'+
                      '<p>' + productArray[i].goodDesc + '</p>' +
                      '<p>' + productArray[i].price + '</p>' +
                      '<form class="form-group">' +
                        '<label for=" ' + productArray[i].goodID + ' ">' + "Quantity: " + '</label>' +
                        '<input type = "number" id= "'+ productArray[i].goodID +' ">'+
                        '<button class"btn btn-info">"Add to Cart!"</button'+
                      '</form>'+
                    '</div>'+
                  '</div>'+
                '</div>';
      colCount--;
      if (colCount === 0) {
        output += '</div>'; //When three columns, add closing div for row
        colCount = 3;
      }
    }
    if (productArray.length%3 !== 0) {
      output += '</div>';
    }
    return output;
  }

  $('#newAccount').submit(function(e) {
    e.preventDefault();
    //Take values
    var first = $('#newFirstName').val();
    var second = $('#newLastName').val();
    var newUserName = $('#newUserName').val();
    var pswd = $('#newUserPassword').val();
    var pswdConfirm = $('#confirmPassword').val();
    var verified = testPassword(pswd, pswdConfirm);
    //If verified, create new Object
    if (verified) {
      var accountHolder = new Account(first, second, newUserName, pswd)
      accountBank.push(accountHolder);
    } else {
      alert("Please enter a valid password");
    }
    // alert('Welcome back, ' + accountHolder.fullName() );
    $('.form-group input').val(''); //Reset form fields
    $(".col-md-6").hide();
    var ourProducts = showProducts(goodsArray) ;
    $('#productDisplay').html(ourProducts);

  });
});
