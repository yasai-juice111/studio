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
router.post('/regist/execute', function(req, res, next) {
    if (!req.session.studio) {
        res.redirect('/');
        return;
    }

    // TODO validationError
    var studioAreaName = validator.escape(req.param('studioAreaName'));
    var tel = validator.toInt(req.param('tel'));
    var studioStation = validator.escape(req.param('studioStation'));
    var studioAddress = validator.escape(req.param('studioAddress'));
    var studioPayment = validator.escape(req.param('studioPayment'));
    var studioRemarks = validator.escape(req.param('studioRemarks'));

	studioFacade.registExecute(req, {
		"studioId": req.session.studio.id,
		"name": studioAreaName,
		"tel": tel,
		"nearStation": studioStation,
		"address": studioAddress,
		"paymentMethod": studioPayment,
		"remark": studioRemarks,
		"imagePath": '/img/test001.png'
	},function(error, result) {
		console.log(error);
		console.log(result);
		if (error) {
		  	res.redirect('/error');
			return
		}
		res.redirect('/studio/');
	});
});

module.exports = router;
