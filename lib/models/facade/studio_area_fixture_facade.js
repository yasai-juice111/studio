/**
 * @fileOverview StudioFacade
 */

// third party
var async = require('async');
var _ = require('underscore');
var validator = require('validator');

// datastore
var mysql = require(__libpath + '/datastores/mysql');

// dao
var studioDao = require(__libpath+"/models/dao/studio_dao");
var studioAreaDao = require(__libpath+"/models/dao/studio_area_dao");
var studioAreaFixtureDao = require(__libpath+"/models/dao/studio_area_fixture_dao");

var StudioAreaFixturefacade = function() {};

StudioAreaFixturefacade.prototype.index = function(req, params, callback) {
	// try {
	// 	var is = _.isDate(params.saleDate);
	// } catch(error) {
	// 	callback(error);
	// 	return;
	// }
	var studio = {};
	var studioAreaIdList = [];
    async.series({
        // スタジオ取得
        studio: function(callback) {
            studioDao.getById(req, params.studioId, function(error, result) {
                if (error) {
                    callback(error);
                    return;
                }
                studio = result;
                callback(null, studio);
            });
        },
        // スタジオエリア取得
        studioAreaList: function(callback) {
            studioAreaDao.getListByStudioId(req, studio.id, function(error, result) {
                if (error) {
                    callback(error);
                    return;
                }
                studioAreaIdList = _.pluck(result, 'id');
                callback(null, result);
            });
        },
    	// スタジオエリアルーム取得
    	studioAreaFixtureList: function(callback) {
    		studioAreaFixtureDao.getListByStudioAreaIdList(req, studioAreaIdList, callback);
    	}
    }, function(error, prepare) {
    	if (error) {
    		callback(error);
    		return;
    	}
        var studioAreaList = _.filter(prepare.studioAreaList, function(studioArea) {
            return studio.id == studioArea.studioId
        });
        _.each(studioAreaList, function(studioArea) {
            studioArea.studioAreaFixtureList = _.filter(prepare.studioAreaFixtureList, function(studioAreaRoom) {
                return studioArea.id == studioAreaRoom.studioAreaId
            });
        });
        studio.studioAreaList = studioAreaList;
    	callback(null, {
            studioData : studio
        });
    });
}

StudioAreaFixturefacade.prototype.regist = function(req, params, callback) {
	try {
		// validator.isInt(params.studioId);
		// validator.isInt(params.amount);
	} catch(error) {
		callback(error);
		return;
	}
    async.series({
        // スタジオエリア取得
        studioArea: function(callback) {
            studioAreaDao.getById(req, params.studioAreaId, callback);
        }
    }, callback);
}

StudioAreaFixturefacade.prototype.registExecute = function(req, params, callback) {
	try {
		// validator.isInt(params.studioId);
		// validator.isInt(params.amount);
	} catch(error) {
		callback(error);
		return;
	}
	// transaction start
	mysql.beginTransaction(function(error) {
		if (error) {
			callback(error);
			return;
		}
	    async.waterfall([
	    	// fonUpdate
	    	function(callback) {
	    		studioDao.getByIdForUpdate(req, params.studioId, callback);
	    	},
    		// TODO validationError 同じ名前が無いかチェック
	    	// 登録
	    	function(studio, callback) {
	    		studioAreaFixtureDao.add(req, params, callback);
	    	}
	    ], function(error, result) {
	    	console.log(error);
	    	if (error) {
				mysql.rollback(function() {
					callback(error);
	    		});
                return;
	    	}
			mysql.commit(function(err) {
				callback(null, result);
	  		});
	    });
	});
}

StudioAreaFixturefacade.prototype.edit = function(req, params, callback) {
	try {
		// validator.isInt(params.studioId);
		// validator.isInt(params.amount);
	} catch(error) {
		callback(error);
		return;
	}
	var studioAreaFixture = {};
    async.series({
        // スタジオエリア備品取得
        studioAreaFixture: function(callback) {
			studioAreaFixtureDao.getById(req, params.studioAreaFixtureId, function(error, result) {
				if (error) {
					callback(error);
					return;
				}
				studioAreaFixture = result;
				callback(null, result);
			});
        },
        // スタジオエリア取得
        studioArea: function(callback) {
            studioAreaDao.getById(req, studioAreaFixture.studioAreaId, callback);
        }
    }, callback);
}

StudioAreaFixturefacade.prototype.editExecute = function(req, params, callback) {
	try {
		// validator.isInt(params.studioId);
		// validator.isInt(params.amount);
	} catch(error) {
		callback(error);
		return;
	}
	// transaction start
	mysql.beginTransaction(function(error) {
		if (error) {
			callback(error);
			return;
		}
	    async.waterfall([
	    	// fonUpdate
	    	function(callback) {
	    		studioDao.getByIdForUpdate(req, params.studioId, callback);
	    	},
    		// TODO validationError 同じ名前が無いかチェック
	    	// 登録
	    	function(studio, callback) {
	    		studioAreaFixtureDao.update(req, params, callback);
	    	}
	    ], function(error, result) {
	    	if (error) {
				mysql.rollback(function() {
					callback(error);
	    		});
                return;
	    	}
			mysql.commit(function(err) {
				callback(null, result);
	  		});
	    });
	});
}


StudioAreaFixturefacade.prototype.delete = function(req, params, callback) {
	try {
		// validator.isInt(params.studioId);
		// validator.isInt(params.amount);
	} catch(error) {
		callback(error);
		return;
	}
	// transaction start
	mysql.beginTransaction(function(error) {
		if (error) {
			callback(error);
			return;
		}
	    async.waterfall([
	    	// fonUpdate
	    	function(callback) {
	    		studioDao.getByIdForUpdate(req, params.studioId, callback);
	    	},
	    	// 指定の日時の弁当リスト取得
	    	function(studio, callback) {
	    		studioAreaFixtureDao.delete(req, params, callback);
	    	}
	    ], function(error, result) {
	    	if (error) {
				mysql.rollback(function() {
					callback(error);
	    		});
                return;
	    	}
			mysql.commit(function(err) {
				callback(null, result);
	  		});
	    });
	});
}

module.exports = new StudioAreaFixturefacade();