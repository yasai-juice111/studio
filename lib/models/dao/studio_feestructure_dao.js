/**
 * @fileOverview StudioFeestructureDao
 */

// third party
var _ = require('underscore');
var validator = require('validator');
var dateformat = require('dateformat');

// datastore
var mysql = require(__libpath + '/datastores/mysql');

// util
var inflector = require(__libpath+"/util/inflector");

var StudioFeestructureDao = function() {};


StudioFeestructureDao.prototype.get = function(req, callback) {
	// try {
	// 	validator.isDate(params.saleDate);
	// } catch(error) {
	// 	callback(error);
	// 	return;
	// }
	mysql.query("select * from studio_feestructure", function (err, rows) {
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

StudioFeestructureDao.prototype.getById = function(req, id, callback) {
	// try {
	// 	validator.isDate(params.saleDate);
	// } catch(error) {
	// 	callback(error);
	// 	return;
	// }
	mysql.query("select * from studio_feestructure where id = " + id + " and delete_flag = 0", function (err, rows) {
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

StudioFeestructureDao.prototype.getListByStudioAreaRoomId = function(req, id, callback) {
	// try {
	// 	validator.isDate(params.saleDate);
	// } catch(error) {
	// 	callback(error);
	// 	return;
	// }
	mysql.query("select * from studio_feestructure where studio_feestructure_id = " + id + " and delete_flag = 0", function (err, rows) {
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

StudioFeestructureDao.prototype.getListByStudioAreaRoomIdList = function(req, idList, callback) {
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
	var queryString = '(' + _.map(idList, function(StudioFeestructureId) {
        return _.escape(StudioFeestructureId);
    }).join(', ') + ')';
    
	mysql.query("select * from studio_feestructure where studio_area_room_id in " + queryString + " and delete_flag = 0", function (err, rows) {
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

StudioFeestructureDao.prototype.getListByIdList = function(req, idList, callback) {
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
	var queryString = '(' + _.map(idList, function(StudioFeestructureId) {
        return _.escape(StudioFeestructureId);
    }).join(', ') + ')';
    
	mysql.query("select * from studio_feestructure where id in " + queryString + " and delete_flag = 0", function (err, rows) {
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


StudioFeestructureDao.prototype.getByIdForUpdate = function(req, id, callback) {
	// try {
	// 	validator.isDate(params.saleDate);
	// } catch(error) {
	// 	callback(error);
	// 	return;
	// }
	mysql.query("select * from studio_feestructure where id = " + id + " for update", function (err, rows) {
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

StudioFeestructureDao.prototype.add = function(req, params, callback) {
	// try {
	// 	validator.isDate(params.saleDate);
	// } catch(error) {
	// 	callback(error);
	// 	return;
	// }
	var currentDatetime = new Date();
	var addData = [
		params.studioAreaRoomId,
		params.title,
		params.startDate,
		params.startTime,
		params.endDate,
		params.endTime,
		params.status,
		currentDatetime,
		currentDatetime,
		false
	];
	var queryString = 'insert into studio_feestructure (studio_feestructure_id, title, start_date, start_time, end_date, end_time, status, insert_datetime, update_datetime, delete_flag) value (?,?,?,?,?,?,?,?,?,?)';
	mysql.query(queryString, addData, callback);

}

StudioFeestructureDao.prototype.update = function(req, params, callback) {
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
		params.studioFeestructureId,
		params.studioAreaRoomId
	];
	var queryString = 'update studio_feestructure set title = ?, start_date = ?, start_time = ?, end_date = ?, end_time = ?, status = ?, update_datetime = ? where id = ? and studio_feestructure_id = ?';
	mysql.query(queryString, updateData, callback);

}


StudioFeestructureDao.prototype.delete = function(req, params, callback) {
	// try {
	// 	validator.isDate(params.saleDate);
	// } catch(error) {
	// 	callback(error);
	// 	return;
	// }
	var updateData = [
		params.currentDatetime,
		params.studioFeestructureId,
		params.studioAreaRoomId
	];
	var queryString = 'update studio_feestructure set delete_flag = 1, update_datetime = ? where id = ? and studio_feestructure_id = ?';
	mysql.query(queryString, updateData, callback);

}

module.exports = new StudioFeestructureDao();
