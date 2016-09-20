var express = require('express');
var router = express.Router();
var passport = require('passport');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/search', function(req, res, next) {
  // Refer: http://qiita.com/itagakishintaro/items/265e4910a777b08a787c

  var Twitter = require('twitter');
  var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  });

  var options = {};
  options.q = 'a';
  options.count = 3;
  client.get('search/tweets', options, function(error, tweets, response) {
    res.send({
      error: error,
      tweets: tweets
    });
  });
});

router.get('/login', function(req, res, next) {
  res.render('login', {
    title: 'Login',
    session: req.session.passport
  });
});

router.get('/oauth', passport.authenticate('twitter'), function(req, res, next) {
  console.log(req, res, next);
});

router.get('/oauth/callback', passport.authenticate('twitter', { failureRedirect: '/login' }), function(req, res) {
  res.redirect('/login');
});


module.exports = router;

