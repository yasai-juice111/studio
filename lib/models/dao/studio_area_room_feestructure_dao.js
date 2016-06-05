/**
 * @fileOverview studioAreaRoomFeestructureDao
 */

// third party
var _ = require('underscore');
var validator = require('validator');
var dateformat = require('dateformat');

// datastore
var mysql = require(__libpath + '/datastores/mysql');

// util
var inflector = require(__libpath+"/util/inflector");

var studioAreaRoomFeestructureDao = function() {};


studioAreaRoomFeestructureDao.prototype.get = function(req, callback) {
	// try {
	// 	validator.isDate(params.saleDate);
	// } catch(error) {
	// 	callback(error);
	// 	return;
	// }
	mysql.query("select * from studio_area_room_feestructure", function (err, rows) {
		if (err) {
			callback(err);
			return;
		}
		var result = _.map(rows, function(row) {
	        // カラム名をキャメルケースに変換
	        row = inflector.toCamelCaseKeys(row);
	        return row;
	    });
		callback(null, result);
	});

}

studioAreaRoomFeestructureDao.prototype.getById = function(req, id, callback) {
	// try {
	// 	validator.isDate(params.saleDate);
	// } catch(error) {
	// 	callback(error);
	// 	return;
	// }
	mysql.query("select * from studio_area_room_feestructure where id = " + id + " and delete_flag = 0", function (err, rows) {
		if (err) {
			callback(err);
			return;
		}
		var result = _.map(rows, function(row) {
	        // カラム名をキャメルケースに変換
	        row = inflector.toCamelCaseKeys(row);
	        return row;
	    });
		callback(null, result[0]);
	});

}

studioAreaRoomFeestructureDao.prototype.getListByStudioAreaRoomId = function(req, id, callback) {
	// try {
	// 	validator.isDate(params.saleDate);
	// } catch(error) {
	// 	callback(error);
	// 	return;
	// }
	mysql.query("select * from studio_area_room_feestructure where studio_area_room_feestructure_id = " + id + " and delete_flag = 0", function (err, rows) {
		if (err) {
			callback(err);
			return;
		}
		var result = _.map(rows, function(row) {
	        // カラム名をキャメルケースに変換
	        row = inflector.toCamelCaseKeys(row);
	        return row;
	    });
		callback(null, result);
	});

}

studioAreaRoomFeestructureDao.prototype.getListByStudioAreaRoomIdList = function(req, idList, callback) {
	// try {
	// 	validator.isDate(params.saleDate);
	// } catch(error) {
	// 	callback(error);
	// 	return;
	// }
	if (idList.length == 0) {
		callback(null, []);
		return
	}
	var queryString = '(' + _.map(idList, function(studioAreaRoomFeestructureId) {
        return _.escape(studioAreaRoomFeestructureId);
    }).join(', ') + ')';
    
	mysql.query("select * from studio_area_room_feestructure where studio_area_room_id in " + queryString + " and delete_flag = 0", function (err, rows) {
		if (err) {
			callback(err);
			return;
		}
		var result = _.map(rows, function(row) {
	        // カラム名をキャメルケースに変換
	        row = inflector.toCamelCaseKeys(row);
	        return row;
	    });
		callback(null, result);
	});

}

studioAreaRoomFeestructureDao.prototype.getListByIdList = function(req, idList, callback) {
	// try {
	// 	validator.isDate(params.saleDate);
	// } catch(error) {
	// 	callback(error);
	// 	return;
	// }
	if (idList.length == 0) {
		callback(null, []);
		return
	}
	var queryString = '(' + _.map(idList, function(studioAreaRoomFeestructureId) {
        return _.escape(studioAreaRoomFeestructureId);
    }).join(', ') + ')';
    
	mysql.query("select * from studio_area_room_feestructure where id in " + queryString + " and delete_flag = 0", function (err, rows) {
		if (err) {
			callback(err);
			return;
		}
		var result = _.map(rows, function(row) {
	        // カラム名をキャメルケースに変換
	        row = inflector.toCamelCaseKeys(row);
	        return row;
	    });
		callback(null, result);
	});

}


studioAreaRoomFeestructureDao.prototype.getByIdForUpdate = function(req, id, callback) {
	// try {
	// 	validator.isDate(params.saleDate);
	// } catch(error) {
	// 	callback(error);
	// 	return;
	// }
	mysql.query("select * from studio_area_room_feestructure where id = " + id + " for update", function (err, rows) {
		if (err) {
			callback(err);
			return;
		}
		var result = _.map(rows, function(row) {
	        // カラム名をキャメルケースに変換
	        row = inflector.toCamelCaseKeys(row);
	        return row;
	    });
		callback(null, result[0]);
	});

}

studioAreaRoomFeestructureDao.prototype.add = function(req, params, callback) {
	// try {
	// 	validator.isDate(params.saleDate);
	// } catch(error) {
	// 	callback(error);
	// 	return;
	// }
	var currentDatetime = new Date();
	var addData = [
		params.studioAreaRoomId,
		params.startTime,
		params.endTime,
		params.price,
		params.priceTypeId,
		params.dayTypeId,
		params.remark,
		currentDatetime,
		currentDatetime,
		false
	];
	var queryString = 'insert into studio_area_room_feestructure (studio_area_room_id, day_type_id, start_time, end_time, price, price_type_id, remark, insert_datetime, update_datetime, delete_flag) value (?,?,?,?,?,?,?,?,?,?)';
	mysql.query(queryString, addData, callback);

}

studioAreaRoomFeestructureDao.prototype.update = function(req, params, callback) {
	// try {
	// 	validator.isDate(params.saleDate);
	// } catch(error) {
	// 	callback(error);
	// 	return;
	// }
	var currentDatetime = new Date();
	var updateData = [
		params.title,
		params.startDate,
		params.startTime,
		params.endDate,
		params.endTime,
		params.status,
		currentDatetime,
		params.studioAreaRoomFeestructureId,
		params.studioAreaRoomId
	];
	var queryString = 'update studio_area_room_feestructure set title = ?, start_date = ?, start_time = ?, end_date = ?, end_time = ?, status = ?, update_datetime = ? where id = ? and studio_area_room_feestructure_id = ?';
	mysql.query(queryString, updateData, callback);

}


studioAreaRoomFeestructureDao.prototype.delete = function(req, params, callback) {
	// try {
	// 	validator.isDate(params.saleDate);
	// } catch(error) {
	// 	callback(error);
	// 	return;
	// }
	var updateData = [
		params.currentDatetime,
		params.studioAreaRoomFeestructureId,
		params.studioAreaRoomId
	];
	var queryString = 'update studio_area_room_feestructure set delete_flag = 1, update_datetime = ? where id = ? and studio_area_room_feestructure_id = ?';
	mysql.query(queryString, updateData, callback);

}

module.exports = new studioAreaRoomFeestructureDao();
