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
    var studioAreaRoomId = null;
    var studioAreaRoom = null;
    var calendarView = '';
	if (req.session.studioAreaRoom) {
		studioAreaRoom = req.session.studioAreaRoom;
		studioAreaRoomId = req.session.studioAreaRoom.studioAreaRoomId;
		calendarView = req.session.studioAreaRoom.calendarView;
		delete req.session.studioAreaRoom;
	}

	if (req.param('studioAreaRoomId')) {
		studioAreaRoomId = validator.toInt(req.param('studioAreaRoomId'));
	}

	var currentDatetime = req.currentDatetime || new Date();

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
		result.studioAreaRoom = studioAreaRoom;
		result.currentDate = {
			currentStartDate : dateformat(currentDatetime, 'yyyy-mm-dd'),
			currentStartTime : dateformat(currentDatetime, 'HH-MM')
		};
		result.calendarView = calendarView;
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
    var title = validator.toString(req.param('title'));
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
		req.session.studioAreaRoom = {
			"studioAreaRoomId": studioAreaRoomId,
			"startDate": startDate,
			"startTime": startTime,
			"calendarView": validator.escape(req.param('calendarView'))
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
    var title = validator.toString(req.param('title'));
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
		if (error) {
		  	res.redirect('/error');
			return
		}
		req.session.studioAreaRoom = {
			"studioAreaRoomId": studioAreaRoomId,
			"calendarView": validator.escape(req.param('calendarView'))
		}
	    res.redirect('/calendar');
	});
});

/**
 * 削除
 *
 * @param {Object} req リクエスト
 * @param {Object} res レスポンス
 * @param {Function} next ネクスト
 */
router.post('/delete', function(req, res, next) {
    // if (!req.session.user) {
    //     res.redirect('/auth');
    //     return;
    // }
    var studioAreaRoomReserveId = validator.toInt(req.param('studioAreaRoomReserveId'));
    var studioAreaRoomId = validator.toInt(req.param('studioAreaRoomId'));

	var currentDatetime = req.currentDatetime || new Date();

	calendarFacade.delete(req, {
		"studioId": req.session.studio.id,
		"studioAreaRoomReserveId": studioAreaRoomReserveId,
		"studioAreaRoomId": studioAreaRoomId,
		"currentDatetime": currentDatetime
	},function(error, result) {
		console.log(error);
		if (error) {
		  	res.redirect('/error');
			return
		}
		req.session.studioAreaRoom = {
			"studioAreaRoomId": studioAreaRoomId,
			"calendarView": validator.escape(req.param('calendarView'))
		}
	    res.redirect('/calendar');
	});
});

module.exports = router;
