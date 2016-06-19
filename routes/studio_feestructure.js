var express = require('express');
var router = express.Router();

// third party
var validator = require('validator');
var dateformat = require('dateformat');
var _ = require('underscore');

// facade
var studioFeestructureFacade = require(__libpath + '/models/facade/studio_feestructure_facade');

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
	studioFeestructureFacade.index(req, {
		"studioId": req.session.studio.id
	},function(error, result) {
		if (error) {
		  	res.redirect('/error');
			return;
		}
		result.studio = req.session.studio;
		_.each(result.studioAreaList, function(studioArea) {
			_.each(studioArea.studioAreaRoomList, function(studioAreaRoom) {
				_.each(studioAreaRoom.studioAreaRoomFeestructureList, function(studioAreaRoomFeestructure) {
					studioAreaRoomFeestructure.price = String(studioAreaRoomFeestructure.price).replace( /^(-?\d+)(\d{3})/, "$1,$2" );
				});
			});
		});
console.log(result);
		res.render('studio_feestructure/index', result);
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
    var studioAreaRoomId = validator.toInt(req.param('studioAreaRoomId'));
	studioFeestructureFacade.regist(req, {
		"studioAreaRoomId": studioAreaRoomId
	},function(error, result) {
		console.log(error);
		if (error) {
		  	res.redirect('/error');
			return
		}
		result.studio = req.session.studio;
console.log(result);
		res.render('studio_feestructure/regist', result);
	});
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
    var studioAreaRoomId = validator.toInt(req.param('studioAreaRoomId'));
    var price = validator.toInt(req.param('price')) || 1000;
    var priceTypeId = validator.toInt(req.param('priceTypeId'));
    var dayTypeId = validator.toInt(req.param('dayTypeId'));
    var remark = validator.escape(req.param('remark'));

    var startHour = validator.escape(req.param('startHour'));
    var startMinutes = validator.escape(req.param('startMinutes'));
    var endHour = validator.escape(req.param('endHour'));
    var endMinutes = validator.escape(req.param('endMinutes'));

    var startTime = startHour + ':' + startMinutes;
    var endTime = endHour + ':' + endMinutes;

	studioFeestructureFacade.registExecute(req, {
		"studioId": req.session.studio.id,
		"studioAreaRoomId": studioAreaRoomId,
		"startTime": startTime,
		"endTime": endTime,
		"price": price,
		"priceTypeId": priceTypeId,
		"dayTypeId": dayTypeId,
		"remark": remark
	},function(error, result) {
		if (error) {
		  	res.redirect('/error');
			return
		}
		res.redirect('/studio_feestructure');
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
    var studioAreaRoomFeestructureId = validator.toInt(req.param('studioAreaRoomFeestructureId'));

	studioFeestructureFacade.edit(req, {
		"studioId": req.session.studio.id,
		"studioAreaRoomFeestructureId": studioAreaRoomFeestructureId
	},function(error, result) {
		if (error) {
		  	res.redirect('/error');
			return
		}
		result.studio = req.session.studio;
console.log(result);
		res.render('studio_feestructure/edit', result);
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
    var studioAreaRoomFeestructureId = validator.toInt(req.param('studioAreaRoomFeestructureId'));
    var price = validator.toInt(req.param('price')) || 1000;
    var priceTypeId = validator.toInt(req.param('priceTypeId'));
    var dayTypeId = validator.toInt(req.param('dayTypeId'));
    var remark = validator.escape(req.param('remark'));

    var startHour = validator.escape(req.param('startHour'));
    var startMinutes = validator.escape(req.param('startMinutes'));
    var endHour = validator.escape(req.param('endHour'));
    var endMinutes = validator.escape(req.param('endMinutes'));

    var startTime = startHour + ':' + startMinutes;
    var endTime = endHour + ':' + endMinutes;

	studioFeestructureFacade.editExecute(req, {
		"studioId": req.session.studio.id,
		"studioAreaRoomFeestructureId": studioAreaRoomFeestructureId,
		"startTime": startTime,
		"endTime": endTime,
		"price": price,
		"priceTypeId": priceTypeId,
		"dayTypeId": dayTypeId,
		"remark": remark
	},function(error, result) {
		if (error) {
		  	res.redirect('/error');
			return
		}
		res.redirect('/studio_feestructure');
	});
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
    var studioAreaRoomFeestructureId = validator.toInt(req.param('studioAreaRoomFeestructureId'));

	studioFeestructureFacade.delete(req, {
		"studioId": req.session.studio.id,
		"studioAreaRoomFeestructureId": studioAreaRoomFeestructureId
	},function(error, result) {
		console.log(error);
		if (error) {
		  	res.redirect('/error');
			return
		}
		res.redirect('/studio_feestructure');
	});
});

module.exports = router;
