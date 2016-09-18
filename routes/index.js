var express = require('express');
var router = express.Router();

var indexFacade = require(__libpath + '/models/facade/index_facade');

/* GET home page. */
router.get('/', function(req, res, next) {
	indexFacade.index(req, function(error, result) {
		if (error) {
		  	res.redirect('/error');
			return
		}
console.log(result);
		res.render('index', result);
	});

});

/* 
* 詳細
* 
* return {callback Object}
*/
router.get('/detail', function(req, res, next) {

    var studioId = validator.toInt(req.param('id'));

	indexFacade.detail(req, {
		studioId : studioId
	}, function(error, result) {
		if (error) {
		  	res.redirect('/error');
			return
		}
		res.render('index', result);
	});

});

module.exports = router;
