var express = require('express');
var router = express.Router();

// third party
var validator = require('validator');
var dateformat = require('dateformat');

// facade
var studioFacade = require(__libpath + '/models/facade/studio_facade');

/**
 * TOP
 *p
 * @param {Object} req リクエスト
 * @param {Object} res レスポンス
 * @param {Function} next ネクスト
 */
router.get('/', function(req, res, next) {
	if (!req.session.studio) {
        res.redirect('/');
		return;		
	}
	var studioId = req.session.studio.id;

	studioFacade.index(req, {
		"studioId": studioId
	},function(error, result) {
		if (error) {
		  	res.redirect('/error');
			return
		}
		result.studio = req.session.studio;
		res.render('studio/index', result);
	});
});

/**
 * 登録
 *
 * @param {Object} req リクエスト
 * @param {Object} res レスポンス
 * @param {Function} next ネクスト
 */
router.get('/regist', function(req, res, next) {
    if (!req.session.studio) {
        res.redirect('/');
        return;
    }
	var result = {
		studio : req.session.studio
	};
	res.render('studio/regist', result);
});

/**
 * 登録実行
 *
 * @param {Object} req リクエスト
 * @param {Object} res レスポンス
 * @param {Function} next ネクスト
 */
router.post('/regist/excute', function(req, res, next) {
    if (!req.session.studio) {
        res.redirect('/');
        return;
    }
    console.log(req.param('studioArea'));
    console.log(req.param('tel'));
    console.log(req.param('studioStation'));
    console.log(req.param('studioAddress'));
    console.log(req.param('studioPayment'));
    console.log(req.param('studioRemarks'));
	res.render('studio/index', {});
	// studioFacade.registExcute(req, {
	// 	"studioId": studioId
	// },function(error, result) {
	// 	if (error) {
	// 	  	res.redirect('/error');
	// 		return
	// 	}
	// 	result.studio = req.session.studio;
	// 	res.render('studio/index', result);
	// });
});

module.exports = router;
