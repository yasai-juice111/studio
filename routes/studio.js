var express = require('express');
var router = express.Router();

// third party
var validator = require('validator');
var dateformat = require('dateformat');
var _ = require('underscore');

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
    var validationErrorFlag = false;
    var studioAreaName = validator.escape(req.param('studioAreaName'));

    if (!studioAreaName.match(/\S/g)) {
    	validationErrorFlag = true;
    }

    tel = validator.toInt(req.param('tel'));

    if (_.isNaN(tel)) {
    	validationErrorFlag = true;
    }
	// var errors = req.validationErrors();
    if (validationErrorFlag) {
	  	res.redirect('/error');
        return;
    }

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
		res.redirect('/studio');
	});
});

/**
 * 登録編集
 *
 * @param {Object} req リクエスト
 * @param {Object} res レスポンス
 * @param {Function} next ネクスト
 */
router.get('/edit', function(req, res, next) {
    if (!req.session.studio) {
        res.redirect('/');
        return;
    }
	var studioId = req.session.studio.id;
    var studioAreaId = validator.escape(req.param('studioAreaId'));

	studioFacade.edit(req, {
		"studioId": studioId,
		"studioAreaId": studioAreaId
	},function(error, result) {
		if (error) {
		  	res.redirect('/error');
			return
		}
		result.studio = req.session.studio;
		res.render('studio/edit', result);
	});
});

/**
 * 登録変更
 *
 * @param {Object} req リクエスト
 * @param {Object} res レスポンス
 * @param {Function} next ネクスト
 */
router.post('/edit/execute', function(req, res, next) {
    if (!req.session.studio) {
        res.redirect('/');
        return;
    }

    // TODO validationError
    var studioAreaId = validator.escape(req.param('studioAreaId'));
    var studioAreaName = validator.escape(req.param('studioAreaName'));
    var tel = validator.toInt(req.param('tel'));
    var studioStation = validator.escape(req.param('studioStation'));
    var studioAddress = validator.escape(req.param('studioAddress'));
    var studioPayment = validator.escape(req.param('studioPayment'));
    var studioRemarks = validator.escape(req.param('studioRemarks'));

	studioFacade.editExecute(req, {
		"studioId": req.session.studio.id,
		"studioAreaId": studioAreaId,
		"name": studioAreaName,
		"tel": tel,
		"nearStation": studioStation,
		"address": studioAddress,
		"paymentMethod": studioPayment,
		"remark": studioRemarks,
		"imagePath": '/img/test001.png'
	},function(error, result) {
		if (error) {
		  	res.redirect('/error');
			return
		}
		res.redirect('/studio');
	});
});


/**
 * 登録編集
 *
 * @param {Object} req リクエスト
 * @param {Object} res レスポンス
 * @param {Function} next ネクスト
 */
router.get('/edit/execute', function(req, res, next) {
    if (!req.session.studio) {
        res.redirect('/');
        return;
    }
	var result = {
		studio : req.session.studio
	};
	res.render('studio/regist_edit', result);
});

/**
 * 管理
 *
 * @param {Object} req リクエスト
 * @param {Object} res レスポンス
 * @param {Function} next ネクスト
 */
router.get('/manage', function(req, res, next) {
    if (!req.session.studio) {
        res.redirect('/');
        return;
    }
	var result = {
		studio : req.session.studio
	};
	console.log(result);
	res.render('studio/manage', result);
});

/**
 * 登録編集
 *
 * @param {Object} req リクエスト
 * @param {Object} res レスポンス
 * @param {Function} next ネクスト
 */
router.get('/delete', function(req, res, next) {
    if (!req.session.studio) {
        res.redirect('/');
        return;
    }
    // TODO validationError
    var studioAreaId = validator.escape(req.param('studioAreaId'));

	studioFacade.delete(req, {
		"studioId": req.session.studio.id,
		"studioAreaId": studioAreaId
	},function(error, result) {
		if (error) {
		  	res.redirect('/error');
			return
		}
		res.redirect('/studio');
	});
});

module.exports = router;
