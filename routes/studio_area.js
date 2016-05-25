var express = require('express');
var router = express.Router();

// third party
var validator = require('validator');
var dateformat = require('dateformat');

// facade
var studioAreaFacade = require(__libpath + '/models/facade/studio_area_facade');

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
	studioAreaFacade.index(req, {
		"studioId": req.session.studio.id
	},function(error, result) {
		if (error) {
		  	res.redirect('/error');
			return
		}
		result.studio = req.session.studio;
		res.render('studio_area/index', result);
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
    var studioAreaId = validator.toInt(req.param('studioAreaId'));
	studioAreaFacade.regist(req, {
		"studioAreaId": studioAreaId
	},function(error, result) {
		if (error) {
		  	res.redirect('/error');
			return
		}
		result.studio = req.session.studio;
		res.render('studio_area/regist', result);
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
    var studioAreaId = validator.toInt(req.param('studioAreaId'));
    var name = validator.escape(req.param('name'));
    var price = validator.escape(req.param('price'));
    var roomSize = validator.escape(req.param('roomSize'));
    var explanation = validator.escape(req.param('explanation'));

	studioAreaFacade.registExecute(req, {
		"studioId": req.session.studio.id,
		"studioAreaId": studioAreaId,
		"name": name,
		"price": price,
		"roomSize": roomSize,
		"explanation": explanation,
		"imagePath": '/img/test001.png'
	},function(error, result) {
		console.log(error);
		if (error) {
		  	res.redirect('/error');
			return
		}
		res.redirect('/studio_area');
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
    var studioAreaRoomId = validator.toInt(req.param('studioAreaRoomId'));

	studioAreaFacade.edit(req, {
		"studioAreaRoomId": studioAreaRoomId
	},function(error, result) {
		console.log(error);
		console.log(result);
		if (error) {
		  	res.redirect('/error');
			return
		}
		result.studio = req.session.studio;
		res.render('studio_area/edit', result);
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
    var studioAreaRoomId = validator.toInt(req.param('studioAreaRoomId'));
    var name = validator.escape(req.param('name'));
    var price = validator.escape(req.param('price'));
    var roomSize = validator.escape(req.param('roomSize'));
    var explanation = validator.escape(req.param('explanation'));

	studioAreaFacade.editExecute(req, {
		"studioId": req.session.studio.id,
		"studioAreaRoomId": studioAreaRoomId,
		"name": name,
		"price": price,
		"roomSize": roomSize,
		"explanation": explanation,
		"imagePath": '/img/test001.png'
	},function(error, result) {
		console.log(error);
		if (error) {
		  	res.redirect('/error');
			return
		}
		res.redirect('/studio_area');
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
    var studioAreaRoomId = validator.escape(req.param('studioAreaRoomId'));

	studioAreaFacade.delete(req, {
		"studioId": req.session.studio.id,
		"studioAreaRoomId": studioAreaRoomId
	},function(error, result) {
		if (error) {
		  	res.redirect('/error');
			return
		}
		res.redirect('/studio_area');
	});
});

module.exports = router;
