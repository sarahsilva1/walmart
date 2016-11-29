var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var Cart = require('../models/cart');
var Order = require('../models/order');


/** GET home page. */
router.get('/', function(req, res, next) {

  /** Sets up success message */
  var successMsg = req.flash('success')[0];

  /** Function to display objects */
  Product.find(function(err, docs) {

      var productGroup = [];
      var groupSize = 3;

      /** Pushes objects into array in groups of three and separates them */
      for (var i = 0; i < docs.length; i += groupSize) {
          productGroup.push(docs.slice(i, i + groupSize));
      }
      /** Passes title,products,successMsg,noMessages to shopping cart view */
      res.render('shop/index', { title: 'Shopping Cart', products: productGroup, successMsg: successMsg, noMessages: !successMsg });
  });
});

router.get('/add-to-cart/:id', function(req, res, next) {
    var productId = req.params.id;

    /** If cart exists passes it to session otherwise passes an empty object*/
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    /** Finds product */
    Product.findById(productId, function(err, product) {
       if (err) {
           return res.redirect('/');
       }
        cart.add(product, product.id);
        req.session.cart = cart;
        console.log(req.session.cart);
        res.redirect('/');
    });
});

router.get('/shopping-cart', function(req, res, next) {
   /** Checks if there is a cart in session */
   if (!req.session.cart) {
       return res.render('shop/shopping-cart', {products: null});
   }
    /** Creates a new cart in session */
    var cart = new Cart(req.session.cart);

    /** Passes products and totalPrice to shopping cart view */
    res.render('shop/shopping-cart', {products: cart.generateArray(), totalPrice: cart.totalPrice});
});

router.get('/reduce/:id', function(req, res, next) {
    var productId = req.params.id;

    /** If cart exists passes it to session otherwise passes an empty object*/
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.reduceByOne(productId);
    req.session.cart = cart;
    res.redirect('/shopping-cart');
});

router.get('/increase/:id', function(req, res, next) {
    var productId = req.params.id;

    /** If cart exists passes it to session otherwise passes an empty object*/
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.increaseByOne(productId);
    req.session.cart = cart;
    res.redirect('/shopping-cart');
});

router.get('/remove/:id', function(req, res, next) {
    var productId = req.params.id;

    /** If cart exists passes it to session otherwise passes an empty object*/
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.removeItem(productId);
    req.session.cart = cart;
    res.redirect('/shopping-cart');
});

router.get('/checkout', isLoggedIn, function(req, res, next) {
    /** Checks if there is a cart in session */
    if (!req.session.cart) {
        return res.redirect('/shopping-cart');
    }
    /** Creates a new cart in session */
    var cart = new Cart(req.session.cart);
    var errMsg = req.flash('error')[0];
    res.render('shop/checkout', {total: cart.totalPrice, errMsg: errMsg, noError: !errMsg});
});

router.post('/checkout', isLoggedIn, function(req, res, next) {
    /** Checks if there is a cart in session */
    if (!req.session.cart) {
        return res.redirect('/shopping-cart');
    }
    /** Creates a new cart in session */
    var cart = new Cart(req.session.cart);

    var stripe = require("stripe")(
        "sk_test_66p2gEDmFkXotQAcc46hKjAF"
    );

    stripe.charges.create({
        amount: cart.totalPrice * 100,
        currency: "usd",
        source: req.body.stripeToken, /** obtained with Stripe.js */
        description: "Test Charge"
    }, function(err, charge) {
        if (err) {
            req.flash('error', err.message);
            return res.redirect('/checkout');
        }
        var order = new Order({
            user: req.user,
            cart: cart,
            address: req.body.address,
            name: req.body.name,
            paymentId: charge.id
        });
        order.save(function(err, result) {
            req.flash('success', 'Successfully bought product!');
            req.session.cart = null;
            res.redirect('/');
        });
    });
});


module.exports = router;

/** Requires user to be logged in */
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.session.oldUrl = req.url;
    res.redirect('/users/signin');
}
