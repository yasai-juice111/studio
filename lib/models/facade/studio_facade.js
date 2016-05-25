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
var studioAreaRoomDao = require(__libpath+"/models/dao/studio_area_room_dao");

var Studiofacade = function() {};

Studiofacade.prototype.index = function(req, params, callback) {
	// try {
	// 	var is = _.isDate(params.saleDate);
	// } catch(error) {
	// 	callback(error);
	// 	return;
	// }
    async.series({
        // スタジオエリア取得
        studioAreaList: function(callback) {
            studioAreaDao.getListByStudioId(req, params.studioId, callback);
        }
    }, callback);
}

Studiofacade.prototype.registExecute = function(req, params, callback) {
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
	    		studioAreaDao.add(req, params, callback);
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

Studiofacade.prototype.edit = function(req, params, callback) {
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

Studiofacade.prototype.editExecute = function(req, params, callback) {
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
	    		studioAreaDao.update(req, params, callback);
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


Studiofacade.prototype.delete = function(req, params, callback) {
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
	    		studioAreaDao.delete(req, params, callback);
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

// Studiofacade.prototype.finish = function(req, params, callback) {
//     try {
//         // validator.isInt(params.userId);
//         // validator.isInt(params.studioId);
//     } catch(error) {
//         callback(error);
//         return;
//     }

//     async.series({
//         // 指定の日時の弁当リスト取得
//         studio: function(callback) {
//             studioDao.getById(req, params.studioId, callback);
//         },
//         // その週における現在の予約状況取得
//         userstudio: function(callback) {
//             userstudioDao.getByUserIdAndstudioId(req, params, callback);
//         }
//     }, function(error, prepare) {
//         if (error) {
//             callback(error);
//             return;
//         }
//         callback(null, {
//             studio : prepare.studio,
//             userstudio : prepare.userstudio,
//         });
//     });
// }

// Studiofacade.prototype.receive = function(req, params, callback) {
//     try {
//         // validator.isInt(params.studioId);
//         // validator.isInt(params.amount);
//     } catch(error) {
//         callback(error);
//         return;
//     }
//     // transaction start
//     async.waterfall([
//         function(callback) {
//             mysql.beginTransaction(function(error) {
//                 if (error) {
//                     callback(error);
//                     return;
//                 }
//                 async.waterfall([
//                     // fonUpdate
//                     function(callback) {
//                         userstudioDao.updateReceiveFlag(req, params, callback);
//                     }
//                 ], function(error, prepare) {
//                     if (error) {
//                         mysql.rollback(function() {
//                             callback(error);
//                         });
//                         return;
//                     }
//                     mysql.commit(function(err) {
//                         callback();
//                     });
//                 });
//             });
//         },
//         function(callback) {
//             var userstudio = {};
//             async.series({
//                 // 予約状況取得
//                 userstudio: function(callback) {
//                     userstudioDao.getById(req, params.userstudioId, function(error, result) {
//                         if (error) {
//                             callback(error);
//                             return;
//                         }
//                         userstudio = result;
//                         callback(null, result);
//                     });
//                 },
//                 // 指定の日時の弁当取得
//                 studio: function(callback) {
//                     studioDao.getById(req, userstudio.studioId, callback);
//                 },
//                 // ユーザ情報取得
//                 user: function(callback) {
//                     userDao.getById(req, userstudio.userId, callback);
//                 },
//             }, callback);
//         }
//     ], callback);

// }

module.exports = new Studiofacade();