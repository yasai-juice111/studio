var express = require('express');
var router = express.Router();

// third party
var validator = require('validator');
var dateformat = require('dateformat');

// facade
var calendarFacade = require(__libpath + '/models/facade/calendar_facade');

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
	var currentDatetime = req.currentDatetime || new Date();

    var studioAreaRoomId = null;
	if (req.param('studioAreaRoomId')) {
		studioAreaRoomId = validator.toInt(req.param('studioAreaRoomId'));
	}

	calendarFacade.index(req, {
		"id": req.session.studio.id,
		"studioAreaRoomId": studioAreaRoomId,
		"currentDatetime": currentDatetime
	},function(error, result) {
		if (error) {
		  	res.redirect('/error');
			return
		}
		result.studio = req.session.studio;
console.log(result);
		res.render('calendar/index', result);
	});
});

/**
 * 登録
 *
 * @param {Object} req リクエスト
 * @param {Object} res レスポンス
 * @param {Function} next ネクスト
 */
router.post('/regist', function(req, res, next) {
    // if (!req.session.user) {
    //     res.redirect('/auth');
    //     return;
    // }
    var studioAreaRoomId = validator.toInt(req.param('studioAreaRoomId'));
    var title = validator.escape(req.param('title'));
    var startDate = validator.escape(req.param('startDate'));
    var startTime = validator.escape(req.param('startTime'));
    var endDate = validator.escape(req.param('endDate'));
    var endTime = validator.escape(req.param('endTime'));

    var status = null;
    if (req.param('status')) {
		status = req.param('status');
    }

	var currentDatetime = req.currentDatetime || new Date();

	calendarFacade.regist(req, {
		"studioId": req.session.studio.id,
		"studioAreaRoomId": studioAreaRoomId,
		"title": title,
		"startDate": startDate,
		"startTime": startTime,
		"endDate": endDate,
		"endTime": endTime,
		"status": status,
		"currentDatetime": currentDatetime
	},function(error, result) {
		console.log(error);
		console.log(result);
		if (error) {
		  	res.redirect('/error');
			return
		}
	    res.redirect('/calendar');
	});
});

/**
 * 編集
 *
 * @param {Object} req リクエスト
 * @param {Object} res レスポンス
 * @param {Function} next ネクスト
 */
router.post('/edit', function(req, res, next) {
    // if (!req.session.user) {
    //     res.redirect('/auth');
    //     return;
    // }
    var studioAreaRoomReserveId = validator.toInt(req.param('studioAreaRoomReserveId'));
    var studioAreaRoomId = validator.toInt(req.param('studioAreaRoomId'));
    var title = validator.escape(req.param('title'));
    var startDate = validator.escape(req.param('startDate'));
    var startTime = validator.escape(req.param('startTime'));
    var endDate = validator.escape(req.param('endDate'));
    var endTime = validator.escape(req.param('endTime'));

    var status = null;
    if (req.param('status')) {
		status = req.param('status');
    }

	var currentDatetime = req.currentDatetime || new Date();

	calendarFacade.edit(req, {
		"studioId": req.session.studio.id,
		"studioAreaRoomReserveId": studioAreaRoomReserveId,
		"studioAreaRoomId": studioAreaRoomId,
		"title": title,
		"startDate": startDate,
		"startTime": startTime,
		"endDate": endDate,
		"endTime": endTime,
		"status": status,
		"currentDatetime": currentDatetime
	},function(error, result) {
		console.log(error);
		console.log(result);
		if (error) {
		  	res.redirect('/error');
			return
		}
	    res.redirect('/calendar');
	});
});

module.exports = router;
