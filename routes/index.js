var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log(req.session.studio);
	if (req.session.studio) {
        res.redirect('/calendar');
		return;		
	}
	var result = {
		studio : req.session.studio
	};
	res.render('index', result);
});

module.exports = router;
