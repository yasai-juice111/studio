DROP TABLE studio_area_room_feestructure;

SET CHARSET utf8;

/**
 * スタジオ料金体系
 */
CREATE TABLE IF NOT EXISTS studio_area_room_feestructure (
  id                   BIGINT(20)   UNSIGNED NOT NULL  AUTO_INCREMENT  COMMENT 'ID',
  studio_area_room_id  int(20)      UNSIGNED NOT NULL  				         COMMENT 'スタジオエリアID',
  day_type_id          int(10)               NOT NULL                  COMMENT '曜日ID',
  start_time           varchar(255)          NOT NULL                  COMMENT '開始時',
  end_time             varchar(255)          NOT NULL                  COMMENT '終了時',
  price                int(10)               NOT NULL                  COMMENT '金額',
  price_type_id        int(10)               NOT NULL                  COMMENT '金額タイプ',
  remark               varchar(255)          NOT NULL                  COMMENT '備考',
  insert_datetime      DATETIME 				     NOT NULL				           COMMENT '作成日時',
  update_datetime      DATETIME              NOT NULL                  COMMENT '更新日時',
  delete_flag          boolean               NOT NULL                  COMMENT '削除フラグ',
  PRIMARY KEY (id),
  KEY (studio_area_room_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='スタジオ料金体系';