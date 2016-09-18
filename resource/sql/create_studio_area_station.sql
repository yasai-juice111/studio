DROP TABLE studio_area_fixture;

SET CHARSET utf8;

/**
 * スタジオエリア備品
 */
CREATE TABLE IF NOT EXISTS studio_area_fixture (
  id                      INT(10)    UNSIGNED  NOT NULL  AUTO_INCREMENT  COMMENT 'ID',
  studio_area_id          INT(10)    UNSIGNED  NOT NULL                  COMMENT 'スタジオエリアID',
  studio_area_station_id  INT(10)    UNSIGNED  NOT NULL  				         COMMENT 'スタジオエリアステーションID',
  insert_datetime         DATETIME 				     NOT NULL				           COMMENT '作成日時',
  update_datetime         DATETIME             NOT NULL                  COMMENT '更新日時',
  delete_flag             boolean              NOT NULL                  COMMENT '削除フラグ',
  PRIMARY KEY (id),
  KEY (studio_area_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='スタジオエリア備品';

insert into studio_area_fixture (studio_area_id, studio_area_station_id, insert_datetime, update_datetime, delete_flag) values (1, 1, now(), now(), false);
insert into studio_area_fixture (studio_area_id, studio_area_station_id, insert_datetime, update_datetime, delete_flag) values (1, 2, now(), now(), false);
insert into studio_area_fixture (studio_area_id, studio_area_station_id, insert_datetime, update_datetime, delete_flag) values (1, 3, now(), now(), false);