/**
 * @fileOverview CalendarFacade
 */

// third party
var async = require('async');
var _ = require('underscore');
var validator = require('validator');
var dateformat = require('dateformat');

// datastore
var mysql = require(__libpath + '/datastores/mysql');

// dao
var studioDao = require(__libpath+"/models/dao/studio_dao");
var studioAreaDao = require(__libpath+"/models/dao/studio_area_dao");
var studioAreaRoomDao = require(__libpath+"/models/dao/studio_area_room_dao");
var studioAreaRoomReserveDao = require(__libpath+"/models/dao/studio_area_room_reserve_dao");

var Calendarfacade = function() {};

Calendarfacade.prototype.index = function(req, params, callback) {
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
            studioDao.getById(req, params.id, callback);
        },
        // スタジオエリア取得
        studioAreaList: function(callback) {
            studioAreaDao.getListByStudioId(req, params.id, function(error, result) {
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
        studio = prepare.studio;
        var studioAreaList = _.filter(prepare.studioAreaList, function(studioArea) {
            return params.id == studioArea.studioId
        });
        var showStudioArea = null;
        var showStudioAreaRoom = null;
        // 登録しているスタジオを整形
        _.each(studioAreaList, function(studioArea) {
            var studioAreaRoomList = [];
            _.each(prepare.studioAreaRoomList, function(studioAreaRoom) {
                if (studioArea.id == studioAreaRoom.studioAreaId) {
                    studioAreaRoomList.push(studioAreaRoom);
                }
                if (studioArea.id == studioAreaRoom.studioAreaId &&
                    studioAreaRoom.id == params.studioAreaRoomId
                ) {
                    showStudioArea = studioArea;
                    showStudioAreaRoom = studioAreaRoom;
                }
            });
            studioArea.studioAreaRoomList = studioAreaRoomList;
        });
        // 指定がない場合
        if (!showStudioAreaRoom) {
            if (studioAreaList.length > 0) {
                var studioArea = _.first(studioAreaList);
                showStudioArea = studioArea;
                if (studioArea.studioAreaRoomList.length > 0) {
                    showStudioAreaRoom = studioAreaList[0].studioAreaRoomList[0];
                }
            }
        }
        // 登録がされていないとき
        if (!showStudioAreaRoom) {
            callback(null, {
                studioAreaList : studioAreaList,
                showStudioArea : showStudioArea,
                showStudioAreaRoom : showStudioAreaRoom,
                studioAreaRoomReserveList : []
            });
            return;
        }
        studioAreaRoomReserveDao.getListByStudioAreaRoomId(req, showStudioAreaRoom.id, function(error, result) {
            if (error) {
                callback(error);
                return;
            }
            var studioAreaRoomReserveList = [];
            _.each(result, function(studioAreaRoomReserve) {
                studioAreaRoomReserveList.push({
                    id : studioAreaRoomReserve.id,
                    title : studioAreaRoomReserve.title,
                    start : dateformat(studioAreaRoomReserve.startDate, 'yyyy-mm-dd') + 'T' + studioAreaRoomReserve.startTime,
                    end : dateformat(studioAreaRoomReserve.endDate, 'yyyy-mm-dd') + 'T' + studioAreaRoomReserve.endTime,
                    status : studioAreaRoomReserve.status
                });
            });
            callback(null, {
                studioAreaList : studioAreaList,
                showStudioArea : showStudioArea,
                showStudioAreaRoom : showStudioAreaRoom,
                studioAreaRoomReserveList : studioAreaRoomReserveList
            });
        });
    });
}

Calendarfacade.prototype.regist = function(req, params, callback) {
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
            // TODO 同じ日時でデータが入っていないか
            // TODO 指定されたstudioAreaRoomIdがstudioIdのエリアであるかチェック
            // 指定の日時にデータを挿入
            function(studio, callback) {
                studioAreaRoomReserveDao.add(req, params, callback);
            }
        ], function(error, prepare) {
            if (error) {
                mysql.rollback(function() {
                    callback(error);
                });
                return;
            }
            mysql.commit(function(err) {
                callback();
            });
        });
    });
}

Calendarfacade.prototype.edit = function(req, params, callback) {
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
            // TODO 同じ日時でデータが入っていないか
            // TODO 指定されたstudioAreaRoomIdがstudioIdのエリアであるかチェック
            // 指定の日時にデータを挿入
            function(studio, callback) {
                studioAreaRoomReserveDao.update(req, params, callback);
            }
        ], function(error, prepare) {
            if (error) {
                mysql.rollback(function() {
                    callback(error);
                });
                return;
            }
            mysql.commit(function(err) {
                callback();
            });
        });
    });
}

Calendarfacade.prototype.delete = function(req, params, callback) {
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
            // TODO 同じ日時でデータが入っていないか
            // TODO 指定されたstudioAreaRoomIdがstudioIdのエリアであるかチェック
            // 指定の日時にデータを挿入
            function(studio, callback) {
                studioAreaRoomReserveDao.delete(req, params, callback);
            }
        ], function(error, prepare) {
            if (error) {
                mysql.rollback(function() {
                    callback(error);
                });
                return;
            }
            mysql.commit(function(err) {
                callback();
            });
        });
    });
}

module.exports = new Calendarfacade();