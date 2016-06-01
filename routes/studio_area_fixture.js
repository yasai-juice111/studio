var express = require('express');
var router = express.Router();

// third party
var validator = require('validator');
var dateformat = require('dateformat');

// facade
var studioAreaFixtureFacade = require(__libpath + '/models/facade/studio_area_fixture_facade');

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
	studioAreaFixtureFacade.index(req, {
		"studioId": req.session.studio.id
	},function(error, result) {
		console.log(error);
		if (error) {
		  	res.redirect('/error');
			return
		}
		result.studio = req.session.studio;
console.log(result);
		res.render('studio_area_fixture/index', result);
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
	studioAreaFixtureFacade.regist(req, {
		"studioAreaId": studioAreaId
	},function(error, result) {
		console.log(error);
		if (error) {
		  	res.redirect('/error');
			return
		}
		result.studio = req.session.studio;
		res.render('studio_area_fixture/regist', result);
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
    var explanation = validator.escape(req.param('explanation'));
    var term = validator.escape(req.param('term'));
    var price = validator.escape(req.param('price'));

	studioAreaFixtureFacade.registExecute(req, {
		"studioId": req.session.studio.id,
		"studioAreaId": studioAreaId,
		"name": name,
		"explanation": explanation,
		"term": term,
		"price": price
	},function(error, result) {
		console.log(error);
		if (error) {
		  	res.redirect('/error');
			return
		}
		res.redirect('/studio_area_fixture');
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
    var studioAreaFixtureId = validator.toInt(req.param('studioAreaFixtureId'));

	studioAreaFixtureFacade.edit(req, {
		"studioAreaFixtureId": studioAreaFixtureId
	},function(error, result) {
		if (error) {
		  	res.redirect('/error');
			return
		}
		result.studio = req.session.studio;
		res.render('studio_area_fixture/edit', result);
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
    var studioAreaFixtureId = validator.toInt(req.param('studioAreaFixtureId'));
    var name = validator.escape(req.param('name'));
    var explanation = validator.escape(req.param('explanation'));
    var term = validator.escape(req.param('term'));
    var price = validator.escape(req.param('price'));

	studioAreaFixtureFacade.editExecute(req, {
		"studioId": req.session.studio.id,
		"studioAreaFixtureId": studioAreaFixtureId,
		"name": name,
		"explanation": explanation,
		"term": term,
		"price": price
	},function(error, result) {
		console.log(error);
		if (error) {
		  	res.redirect('/error');
			return
		}
		res.redirect('/studio_area_fixture');
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
    var studioAreaFixtureId = validator.escape(req.param('studioAreaFixtureId'));

	studioAreaFixtureFacade.delete(req, {
		"studioId": req.session.studio.id,
		"studioAreaFixtureId": studioAreaFixtureId
	},function(error, result) {
		if (error) {
		  	res.redirect('/error');
			return
		}
		res.redirect('/studio_area_fixture');
	});
});

module.exports = router;
