DROP TABLE studio_area_room;

SET CHARSET utf8;

/**
 * スタジオエリアルーム
 */
CREATE TABLE IF NOT EXISTS studio_area_room (
  id              BIGINT(20)  UNSIGNED  NOT NULL  AUTO_INCREMENT  COMMENT 'ID',
  studio_area_id  BIGINT(20)  UNSIGNED  NOT NULL  				        COMMENT 'スタジオエリアID',
  name            varchar(255)          NOT NULL                  COMMENT '部屋名',
  room_size       varchar(255)          NOT NULL                  COMMENT '間取り・広さ',
  maximum_number  INT(20)     UNSIGNED  NOT NULL                  COMMENT 'MAX所要人数',
  mirror          varchar(255)              NULL                  COMMENT '鏡',
  floor_material  varchar(255)              NULL                  COMMENT '床材',
  speaker         varchar(255)              NULL                  COMMENT 'スピーカー',
  mixer           varchar(255)              NULL                  COMMENT 'ミキサー',
  compact_disc_flag    boolean              NULL                  COMMENT 'CDフラグ',
  micro_disc_flag      boolean              NULL                  COMMENT 'MDフラグ',
  mp3_flag        boolean                   NULL                  COMMENT 'mp3フラグ',
  other_acoustic  varchar(255)              NULL                  COMMENT 'そのた音響',
  illumination    varchar(255)              NULL                  COMMENT '照明',
  wifi_flag       boolean                   NULL                  COMMENT 'wifiフラグ',
  image_path      varchar(255)              NULL                  COMMENT '画像パス',
  explanation     varchar(255)              NULL                  COMMENT '備考',
  insert_datetime DATETIME 				      NOT NULL				          COMMENT '作成日時',
  update_datetime DATETIME              NOT NULL                  COMMENT '更新日時',
  delete_flag     boolean               NOT NULL                  COMMENT '削除フラグ',
  PRIMARY KEY (id),
  KEY (studio_area_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='スタジオエリアルーム';