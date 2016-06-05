/**
 * @fileOverview StudioFacade
 */

// third party
var async = require('async');
var _ = require('underscore');
var validator = require('validator');

// datastore
var mysql = require(__libpath + '/datastores/mysql');

// util
var jsonAccesser = require(__libpath+"/util/json_accesser");

// dao
var studioDao = require(__libpath+"/models/dao/studio_dao");
var studioAreaDao = require(__libpath+"/models/dao/studio_area_dao");
var studioAreaRoomDao = require(__libpath+"/models/dao/studio_area_room_dao");
var studioAreaRoomFeestructureDao = require(__libpath+"/models/dao/studio_area_room_feestructure_dao");

var studioFeestructureFacadefacade = function() {};

studioFeestructureFacadefacade.prototype.index = function(req, params, callback) {
	// try {
	// 	var is = _.isDate(params.saleDate);
	// } catch(error) {
	// 	callback(error);
	// 	return;
	// }
	var studio = {};
	var studioAreaIdList = [];
	var studioAreaRoomIdList = [];
    async.series({
        // スタジオエリア取得
        studioAreaList: function(callback) {
            studioAreaDao.getListByStudioId(req, params.studioId, function(error, result) {
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
    		studioAreaRoomDao.getListByStudioAreaIdList(req, studioAreaIdList, function(error, result) {
    			if (error) {
    				callback(error);
    				return;
    			}
                studioAreaRoomIdList = _.pluck(result, 'id');
    			callback(null, result);
    		});
        },
    	// スタジオエリアルーム取得
    	studioAreaRoomFeestructureList: function(callback) {
            studioAreaRoomFeestructureDao.getListByStudioAreaRoomIdList(req, studioAreaRoomIdList, callback);
    	}
    }, function(error, prepare) {
    	if (error) {
    		callback(error);
    		return;
    	}
        var studioAreaList = prepare.studioAreaList;
        _.each(studioAreaList, function(studioArea) {
        	studioArea.studioAreaRoomList = _.filter(prepare.studioAreaRoomList, function(studioAreaRoom) {
        		return studioAreaRoom.studioAreaId == studioArea.id;
        	});
        	_.each(studioArea.studioAreaRoomList, function(studioAreaRoom) {
	            studioAreaRoom.studioAreaRoomFeestructureList = _.filter(prepare.studioAreaRoomFeestructureList, function(studioAreaRoomFeestructure) {
	                return studioAreaRoom.id == studioAreaRoomFeestructure.studioAreaRoomId;
	            });
        	});
        });
    	callback(null, {
            studioAreaList : studioAreaList,
    		dayTypeMap: jsonAccesser.get('day_type'),
    		priceTypeMap: jsonAccesser.get('price_type')
        });
    });
}

studioFeestructureFacadefacade.prototype.regist = function(req, params, callback) {
	try {
		// validator.isInt(params.studioId);
		// validator.isInt(params.amount);
	} catch(error) {
		callback(error);
		return;
	}
	var studioAreaRoom = {};
    async.series({
        // スタジオエリアルーム取得
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
        }
    }, function(error, prepare) {
    	if (error) {
    		callback(error);
    		return;
    	}

    	callback(null, {
    		studioArea: prepare.studioArea,
    		studioAreaRoom: prepare.studioAreaRoom,
    		dayTypeMap: jsonAccesser.get('day_type'),
    		priceTypeMap: jsonAccesser.get('price_type')
    	});
    });
}

studioFeestructureFacadefacade.prototype.registExecute = function(req, params, callback) {
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
    		// TODO validationError 自分のスタジオであるかチェック
	    	// 登録
	    	function(studio, callback) {
	    		studioAreaRoomFeestructureDao.add(req, params, callback);
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

studioFeestructureFacadefacade.prototype.edit = function(req, params, callback) {
	try {
		// validator.isInt(params.studioId);
		// validator.isInt(params.amount);
	} catch(error) {
		callback(error);
		return;
	}
	var studioAreaRoom = {};
	var studioAreaRoomFeestructure = {};
    async.series({
        // スタジオエリア備品取得
        studioAreaRoomFeestructure: function(callback) {
			studioAreaRoomFeestructureDao.getById(req, params.studioAreaRoomFeestructureId, function(error, result) {
				if (error) {
					callback(error);
					return;
				}
				studioAreaRoomFeestructure = result;
				callback(null, result);
			});
        },
        // スタジオエリアルーム取得
        studioAreaRoom: function(callback) {
            studioAreaRoomDao.getById(req, studioAreaRoomFeestructure.studioAreaRoomId, function(error, result) {
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
        }
    }, function(error, prepare) {
    	if (error) {
    		callback(error);
    		return;
    	}
    	callback(null, _.extend(prepare, {
    		dayTypeMap: jsonAccesser.get('day_type'),
    		priceTypeMap: jsonAccesser.get('price_type')
    	}));
    });
}

studioFeestructureFacadefacade.prototype.editExecute = function(req, params, callback) {
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
	    		studioAreaRoomFeestructureDao.update(req, params, callback);
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


studioFeestructureFacadefacade.prototype.delete = function(req, params, callback) {
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
	    		studioAreaRoomFeestructureDao.delete(req, params, callback);
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

module.exports = new studioFeestructureFacadefacade();