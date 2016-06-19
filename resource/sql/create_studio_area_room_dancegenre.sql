DROP TABLE studio_area_room_dancegenre;

SET CHARSET utf8;

/**
 * スタジオ部屋ダンスジャンル
 */
CREATE TABLE IF NOT EXISTS studio_area_room_dancegenre (
  id                   BIGINT(20)   UNSIGNED NOT NULL  AUTO_INCREMENT  COMMENT 'ID',
  studio_area_room_id  int(20)      UNSIGNED NOT NULL  				         COMMENT 'スタジオエリアID',
  dance_genre_type_id  int(10)               NOT NULL                  COMMENT 'ジャンルタイプID',
  enableFlag           boolean               NOT NULL                  COMMENT '可能か不可能か',
  insert_datetime      DATETIME 				     NOT NULL				           COMMENT '作成日時',
  update_datetime      DATETIME              NOT NULL                  COMMENT '更新日時',
  delete_flag          boolean               NOT NULL                  COMMENT '削除フラグ',
  PRIMARY KEY (id),
  KEY (studio_area_room_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='スタジオ部屋ダンスジャンル';