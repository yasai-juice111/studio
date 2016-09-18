/**
 * @fileOverview IndexFacade
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

var IndexFacade = function() {};

IndexFacade.prototype.index = function(req, callback) {
	
	var facadeData = {};

    async.series({
        // スタジオエリア取得
        studioAreaList: function(callback) {
            studioAreaDao.get(req, callback);
        }    	
    }, callback);
}

IndexFacade.prototype.detail = function(req, callback) {
    async.series({
        // スタジオエリア取得
        studioList: function(callback) {
            studioDao.get(req, callback);
        }
    }, callback);
}

module.exports = new IndexFacade();