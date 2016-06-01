/**
 * @fileOverview StudioAreaRoomReserveDao
 */

// third party
var _ = require('underscore');
var validator = require('validator');
var dateformat = require('dateformat');

// datastore
var mysql = require(__libpath + '/datastores/mysql');

// util
var inflector = require(__libpath+"/util/inflector");

var StudioAreaRoomReserveDao = function() {};


StudioAreaRoomReserveDao.prototype.get = function(req, callback) {
	// try {
	// 	validator.isDate(params.saleDate);
	// } catch(error) {
	// 	callback(error);
	// 	return;
	// }
	mysql.query("select * from studio_area_room", function (err, rows) {
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

StudioAreaRoomReserveDao.prototype.getById = function(req, id, callback) {
	// try {
	// 	validator.isDate(params.saleDate);
	// } catch(error) {
	// 	callback(error);
	// 	return;
	// }
	mysql.query("select * from studio_area_room where id = " + id + " and delete_flag = 0", function (err, rows) {
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

StudioAreaRoomReserveDao.prototype.getListByStudioAreaRoomId = function(req, id, callback) {
	// try {
	// 	validator.isDate(params.saleDate);
	// } catch(error) {
	// 	callback(error);
	// 	return;
	// }
	mysql.query("select * from studio_area_room_reserve where studio_area_room_id = " + id + " and delete_flag = 0", function (err, rows) {
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

StudioAreaRoomReserveDao.prototype.getListByStudioAreaIdList = function(req, idList, callback) {
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
	var queryString = '(' + _.map(idList, function(StudioAreaRoomReserveId) {
        return _.escape(StudioAreaRoomReserveId);
    }).join(', ') + ')';
    
	mysql.query("select * from studio_area_room where studio_area_id in " + queryString + " and delete_flag = 0", function (err, rows) {
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

StudioAreaRoomReserveDao.prototype.getListByIdList = function(req, idList, callback) {
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
	var queryString = '(' + _.map(idList, function(StudioAreaRoomReserveId) {
        return _.escape(StudioAreaRoomReserveId);
    }).join(', ') + ')';
    
	mysql.query("select * from studio_area_room where id in " + queryString + " and delete_flag = 0", function (err, rows) {
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


StudioAreaRoomReserveDao.prototype.getByIdForUpdate = function(req, id, callback) {
	// try {
	// 	validator.isDate(params.saleDate);
	// } catch(error) {
	// 	callback(error);
	// 	return;
	// }
	mysql.query("select * from studio_area_room where id = " + id + " for update", function (err, rows) {
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

StudioAreaRoomReserveDao.prototype.add = function(req, params, callback) {
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
	var queryString = 'insert into studio_area_room_reserve (studio_area_room_id, title, start_date, start_time, end_date, end_time, status, insert_datetime, update_datetime, delete_flag) value (?,?,?,?,?,?,?,?,?,?)';
	mysql.query(queryString, addData, callback);

}

StudioAreaRoomReserveDao.prototype.update = function(req, params, callback) {
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
		params.studioAreaRoomReserveId,
		params.studioAreaRoomId
	];
	var queryString = 'update studio_area_room_reserve set title = ?, start_date = ?, start_time = ?, end_date = ?, end_time = ?, status = ?, update_datetime = ? where id = ? and studio_area_room_id = ?';
	mysql.query(queryString, updateData, callback);

}


StudioAreaRoomReserveDao.prototype.delete = function(req, params, callback) {
	// try {
	// 	validator.isDate(params.saleDate);
	// } catch(error) {
	// 	callback(error);
	// 	return;
	// }
	var updateData = [
		params.currentDatetime,
		params.studioAreaRoomReserveId,
		params.studioAreaRoomId
	];
	var queryString = 'update studio_area_room_reserve set delete_flag = 1, update_datetime = ? where id = ? and studio_area_room_id = ?';
	mysql.query(queryString, updateData, callback);

}

module.exports = new StudioAreaRoomReserveDao();
