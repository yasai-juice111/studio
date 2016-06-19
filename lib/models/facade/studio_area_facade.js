/**
 * @fileOverview StudioFacade
 */

// third party
var async = require('async');
var _ = require('underscore');
var validator = require('validator');

// datastore
var mysql = require(__libpath + '/datastores/mysql');
var jsonAccesser = require(__libpath+"/util/json_accesser");

// dao
var studioDao = require(__libpath+"/models/dao/studio_dao");
var studioAreaDao = require(__libpath+"/models/dao/studio_area_dao");
var studioAreaRoomDao = require(__libpath+"/models/dao/studio_area_room_dao");

var StudioAreafacade = function() {};

StudioAreafacade.prototype.index = function(req, params, callback) {
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
    	studioAreaRoomList: function(callback) {
    		studioAreaRoomDao.getListByStudioAreaIdList(req, studioAreaIdList, callback);
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
            studioArea.studioAreaRoomList = _.filter(prepare.studioAreaRoomList, function(studioAreaRoom) {
                return studioArea.id == studioAreaRoom.studioAreaId
            });
        });
        studio.studioAreaList = studioAreaList;
    	callback(null, {
            studioData : studio
        });
    });
}

StudioAreafacade.prototype.regist = function(req, params, callback) {
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
        },
        danceGenreTypeMap: function(callback) {
        	callback(null, jsonAccesser.get('dance_genre_type'));
        },
    }, callback);
}

StudioAreafacade.prototype.registExecute = function(req, params, callback) {
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
	    	// 登録
	    	function(studio, callback) {
	    		studioAreaRoomDao.add(req, params, callback);
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

StudioAreafacade.prototype.edit = function(req, params, callback) {
	try {
		// validator.isInt(params.studioId);
		// validator.isInt(params.amount);
	} catch(error) {
		callback(error);
		return;
	}
	var studioAreaRoom = {};
    async.series({
        // スタジオエリア取得
        studioAreaRoom: function(callback) {
			studioAreaRoomDao.getById(req, params.studioAreaRoomId, function(error, result) {
				if (error) {
					callback(error);
					return;
				}
				studioAreaRoom = result;
				callback(null, result);
			});
        },
        // スタジオエリア取得
        studioArea: function(callback) {
            studioAreaDao.getById(req, studioAreaRoom.studioAreaId, callback);
        },
        danceGenreTypeMap: function(callback) {
        	callback(null, jsonAccesser.get('dance_genre_type'));
        }
    }, callback);
}

StudioAreafacade.prototype.editExecute = function(req, params, callback) {
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
	    		studioAreaRoomDao.update(req, params, callback);
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


StudioAreafacade.prototype.delete = function(req, params, callback) {
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
	    		studioAreaRoomDao.delete(req, params, callback);
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

module.exports = new StudioAreafacade();