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
router.post('/regist', function(req, res, next) {
    // if (!req.session.user) {
    //     res.redirect('/auth');
    //     return;
    // }
    console.log('////////////');
    console.log('きてる？');
    console.log('////////////');
    console.log(req.param('title'));
    console.log(req.param('startDate'));
    console.log(req.param('startTime'));
    console.log(req.param('endDate'));
    console.log(req.param('endTime'));
    console.log(req.param('booking'));
    console.log(req.param('rental'));
	var currentDatetime = req.currentDatetime || new Date();

	calendarFacade.index(req, {
		"id": 1,
		"currentDatetime": currentDatetime
	},function(error, result) {
		console.log(error);
		console.log(result);
		if (error) {
		  	res.redirect('/error');
			return
		}
		res.render('calendar/index', result);
	});
});

module.exports = router;
