/**
 * @fileOverview StudioAreaRoomDao
 */

// third party
var _ = require('underscore');
var validator = require('validator');
var dateformat = require('dateformat');

// datastore
var mysql = require(__libpath + '/datastores/mysql');

// util
var inflector = require(__libpath+"/util/inflector");

var StudioAreaRoomDao = function() {};


StudioAreaRoomDao.prototype.get = function(req, callback) {
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

StudioAreaRoomDao.prototype.getById = function(req, id, callback) {
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

StudioAreaRoomDao.prototype.getByIdList = function(req, id, callback) {
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
		callback(null, result);
	});

}

StudioAreaRoomDao.prototype.getListByStudioAreaIdList = function(req, idList, callback) {
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
	var queryString = '(' + _.map(idList, function(StudioAreaRoomId) {
        return _.escape(StudioAreaRoomId);
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


StudioAreaRoomDao.prototype.getListByStudioAreaId = function(req, id, callback) {
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
    
	mysql.query("select * from studio_area_room where studio_area_id = " + id + " and delete_flag = 0", function (err, rows) {
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

StudioAreaRoomDao.prototype.getListByIdList = function(req, idList, callback) {
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
	var queryString = '(' + _.map(idList, function(StudioAreaRoomId) {
        return _.escape(StudioAreaRoomId);
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


StudioAreaRoomDao.prototype.getByIdForUpdate = function(req, id, callback) {
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

StudioAreaRoomDao.prototype.add = function(req, params, callback) {
	// try {
	// 	validator.isDate(params.saleDate);
	// } catch(error) {
	// 	callback(error);
	// 	return;
	// }
	var currentDatetime = new Date();
	var addData = [
		params.studioAreaId,
		params.name,
		params.roomSize,
		params.maximumNumber,
		params.mirror,
		params.floorMaterial,
		params.speaker,
		params.mixer,
		params.compactDiscFlag,
		params.microDiscFlag,
		params.mp3Flag,
		params.otherAcoustic,
		params.illumination,
		params.wifiFlag,
		params.explanation,
		params.imagePath,
		currentDatetime,
		currentDatetime,
		false
	];
console.log(addData);
	var queryString = 'insert into studio_area_room (studio_area_id, name, room_size, maximum_number, mirror, floor_material, speaker, mixer, compact_disc_flag, micro_disc_flag, mp3_flag, other_acoustic, illumination, wifi_flag, explanation, image_path, insert_datetime, update_datetime, delete_flag) value (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
	mysql.query(queryString, addData, callback);

}

StudioAreaRoomDao.prototype.update = function(req, params, callback) {
	// try {
	// 	validator.isDate(params.saleDate);
	// } catch(error) {
	// 	callback(error);
	// 	return;
	// }
	var currentDatetime = new Date();
	var updateData = [
		params.name,
		params.roomSize,
		params.maximumNumber,
		params.mirror,
		params.floorMaterial,
		params.speaker,
		params.mixer,
		params.compactDiscFlag,
		params.microDiscFlag,
		params.mp3Flag,
		params.otherAcoustic,
		params.illumination,
		params.wifiFlag,
		params.explanation,
		params.imagePath,
		currentDatetime,
		params.studioAreaRoomId
	];
	var queryString = 'update studio_area_room set name = ?, room_size = ?, maximum_number = ?, mirror = ?, floor_material = ?, speaker = ?, mixer = ?, compact_disc_flag = ?, micro_disc_flag = ?, mp3_flag = ?, other_acoustic = ?, illumination = ?, wifi_flag = ?, explanation = ?, image_path = ?, update_datetime = ? where id = ?';
	mysql.query(queryString, updateData, callback);

}


StudioAreaRoomDao.prototype.delete = function(req, params, callback) {
	// try {
	// 	validator.isDate(params.saleDate);
	// } catch(error) {
	// 	callback(error);
	// 	return;
	// }
	var updateData = [
		params.studioAreaRoomId,
	];
	var queryString = 'update studio_area_room set delete_flag = 1 where id = ?';
	mysql.query(queryString, updateData, callback);

}

module.exports = new StudioAreaRoomDao();
