DROP TABLE studio_area_room_reserve;

SET CHARSET utf8;

/**
 * スタジオ予約情報
 */
CREATE TABLE IF NOT EXISTS studio_area_room_reserve (
  id                   BIGINT(20)  UNSIGNED  NOT NULL  AUTO_INCREMENT  COMMENT 'ID',
  studio_area_room_id  BIGINT(20)  UNSIGNED  NOT NULL  				         COMMENT 'スタジオエリアID',
  title                varchar(255)          NOT NULL                  COMMENT '部屋名',
  start_date           DATE                  NOT NULL                  COMMENT '開始日',
  start_time           TIME                  NOT NULL                  COMMENT '開始時',
  end_date             DATE                  NOT NULL                  COMMENT '終了日',
  end_time             TIME                  NOT NULL                  COMMENT '終了時',
  status               varchar(255)          NOT NULL                  COMMENT 'ステータス',
  insert_datetime      DATETIME 				     NOT NULL				           COMMENT '作成日時',
  update_datetime      DATETIME              NOT NULL                  COMMENT '更新日時',
  delete_flag          boolean               NOT NULL                  COMMENT '削除フラグ',
  PRIMARY KEY (id),
  KEY (studio_area_room_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='スタジオ予約';