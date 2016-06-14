/**
 * @fileOverview StudioAreaDao
 */

// third party
var _ = require('underscore');
var validator = require('validator');
var dateformat = require('dateformat');

// datastore
var mysql = require(__libpath + '/datastores/mysql');

// util
var inflector = require(__libpath+"/util/inflector");

var StudioAreaDao = function() {};


StudioAreaDao.prototype.get = function(req, callback) {
	// try {
	// 	validator.isDate(params.saleDate);
	// } catch(error) {
	// 	callback(error);
	// 	return;
	// }
	mysql.query("select * from studio_area", function (err, rows) {
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

StudioAreaDao.prototype.getById = function(req, id, callback) {
	// try {
	// 	validator.isDate(params.saleDate);
	// } catch(error) {
	// 	callback(error);
	// 	return;
	// }
	mysql.query("select * from studio_area where id = " + id + " and delete_flag = 0", function (err, rows) {
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

StudioAreaDao.prototype.getListByStudioId = function(req, id, callback) {
	// try {
	// 	validator.isDate(params.saleDate);
	// } catch(error) {
	// 	callback(error);
	// 	return;
	// }
	mysql.query("select * from studio_area where studio_id = " + id + " and delete_flag = 0", function (err, rows) {
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

StudioAreaDao.prototype.getListByIdList = function(req, idList, callback) {
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
	var queryString = '(' + _.map(idList, function(StudioAreaId) {
        return _.escape(StudioAreaId);
    }).join(', ') + ')';
    
	mysql.query("select * from studio_area where id in " + queryString + " and delete_flag = 0", function (err, rows) {
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


StudioAreaDao.prototype.getByIdForUpdate = function(req, id, callback) {
	// try {
	// 	validator.isDate(params.saleDate);
	// } catch(error) {
	// 	callback(error);
	// 	return;
	// }
	mysql.query("select * from studio_area where id = " + id + " for update", function (err, rows) {
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

StudioAreaDao.prototype.add = function(req, params, callback) {
	// try {
	// 	validator.isDate(params.saleDate);
	// } catch(error) {
	// 	callback(error);
	// 	return;
	// }
	var currentDatetime = new Date();
	var addData = [
		params.studioId,
		params.name,
		params.address,
		params.tel,
		params.nearStation,
		params.paymentMethod,
		params.startDate,
		params.endDate,
		params.lockerRoomFlag,
		params.parkingFlag,
		params.cancelRemark,
		params.remark,
		params.imagePath,
		currentDatetime,
		currentDatetime,
		false
	];
	var queryString = 'insert into studio_area (studio_id, name, address, tel, near_station, payment_method, start_date, end_date, locker_room_flag, parking_flag, cancel_remark, remark, image_path, insert_datetime, update_datetime, delete_flag) value (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
	mysql.query(queryString, addData, callback);

}


StudioAreaDao.prototype.update = function(req, params, callback) {
	// try {
	// 	validator.isDate(params.saleDate);
	// } catch(error) {
	// 	callback(error);
	// 	return;
	// }
	var currentDatetime = new Date();
	var updateData = [
		params.name,
		params.address,
		params.tel,
		params.nearStation,
		params.paymentMethod,
		params.startDate,
		params.endDate,
		params.lockerRoomFlag,
		params.parkingFlag,
		params.cancelRemark,
		params.remark,
		params.imagePath,
		currentDatetime,
		params.studioAreaId
	];
	var queryString = 'update studio_area set name = ?, address = ?, tel = ?, near_station = ?, payment_method = ?, start_date = ?, end_date = ?, locker_room_flag = ?, parking_flag = ?, cancel_remark = ?, remark = ?, image_path = ?, update_datetime = ? where id = ?';
	mysql.query(queryString, updateData, callback);

}

StudioAreaDao.prototype.delete = function(req, params, callback) {
	// try {
	// 	validator.isDate(params.saleDate);
	// } catch(error) {
	// 	callback(error);
	// 	return;
	// }
	var updateData = [
		params.studioAreaId,
		params.studioId
	];
	var queryString = 'update studio_area set delete_flag = 1 where id = ? and studio_id = ?';
	mysql.query(queryString, updateData, callback);

}

module.exports = new StudioAreaDao();
