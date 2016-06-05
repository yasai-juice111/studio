/**
 * @fileOverview TopFacade
 */

// third party
var async = require('async');
var _ = require('underscore');
var validator = require('validator');
var http = require('superagent');

// datastore
var mysql = require(__libpath + '/datastores/mysql');

// dao
var studioDao = require(__libpath+"/models/dao/studio_dao");

var Authfacade = function() {};

Authfacade.prototype.confirm = function(req, params, callback) {
	// try {
	// 	var is = _.isDate(params.saleDate);
	// } catch(error) {
	// 	callback(error);
	// 	return;
	// }
	// transaction start
	mysql.beginTransaction(function(error) {
		if (error) {
			callback(error);
			return;
		}
	    async.waterfall([
	    	// スタジオ取得
	    	function(callback) {
	    		studioDao.getByLoginIdLoginPassword(req, params, function(error, result) {
	    			if (error) {
	    				callback(error);
	    				return;
	    			}
	    			var enableLoginFlag = false;
	    			if (result) {
	    				enableLoginFlag = true;
	    			}
	    			callback(null, {
    					studio : result,
    					enableLoginFlag : enableLoginFlag
	    			});
	    		});
	    	}
	    ], function(error, result) {
	    	if (error) {
				mysql.rollback(function() {
					console.log('Error. Mysql Rollback');
					callback(error);
	    		});
				return;
	    	}
			mysql.commit(function() {
				console.log('Mysql Commit');
				callback(null, result);
	  		});
	    });
	});
}

module.exports = new Authfacade();