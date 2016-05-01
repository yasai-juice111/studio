var router = require('express').Router();
var passport = require(__libpath + '/middleware/platform/twitter').passport;

// facade
var authFacade = require(__libpath + '/models/facade/auth_facade');

/**
 * 認証
 *
 * @param {Object} req リクエスト
 * @param {Object} res レスポンス
 * @param {Function} next ネクスト
 */
router.get('/', function(req, res, next) {
    res.render('auth/index', {});
});


/**
 * twitter認証
 */
router.get('/twitter', passport.authenticate('twitter'));

/**
 * twitter認証callback
 */
router.get('/twitter/callback', 
    passport.authenticate('twitter', {
        successRedirect: '/',
        failureRedirect: '/error'
    })
);

/**
 * facebook認証
 */
router.get('/facebook', passport.authenticate('facebook'));
 
/**
 * facebook認証callback
 */
router.get('/facebook/callback',
    passport.authenticate('facebook',{ 
        failureRedirect: '/error'
    }),
    function(req, res) {
        res.redirect('/');
    }
);

module.exports = router;
