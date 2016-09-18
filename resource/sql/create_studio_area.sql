DROP TABLE studio_area;

SET CHARSET utf8;

/**
 * スタジオエリア
 */
CREATE TABLE IF NOT EXISTS studio_area (
  id                BIGINT(20)  UNSIGNED  NOT NULL  AUTO_INCREMENT  COMMENT 'ID',
  studio_id         BIGINT(20)  UNSIGNED  NOT NULL  				        COMMENT 'スタジオID',
  name              varchar(255)          NOT NULL                  COMMENT '名前',
  address           varchar(255)          NOT NULL                  COMMENT '住所',
  prefectures_id    INT(10)               NOT NULL                  COMMENT '都道府県ID',
  city_id           INT(10)               NOT NULL                  COMMENT '市区町村ID',
  tel		            varchar(11)           NOT NULL                  COMMENT '電話番号',
  payment_method    varchar(255)          NOT NULL                  COMMENT '支払い方法',
  start_date        TIME                  NOT NULL                  COMMENT '営業開始時間',
  end_date          TIME                  NOT NULL                  COMMENT '営業終了時間',
  max_number        INT(10)               NOT NULL                  COMMENT '最大収容数',
  locker_room_flag  boolean               NOT NULL                  COMMENT '更衣室フラグ',
  parking_flag      boolean               NOT NULL                  COMMENT '駐車場フラグ',
  url               varchar(255)              NULL                  COMMENT 'URL',
  remark            varchar(255)              NULL                  COMMENT '特徴',
  explanation       varchar(255)              NULL                  COMMENT '備考',
  image_path        varchar(255)              NULL                  COMMENT '画像パス',
  insert_datetime   DATETIME 				      NOT NULL				          COMMENT '作成日時',
  update_datetime   DATETIME              NOT NULL                  COMMENT '更新日時',
  delete_flag       boolean               NOT NULL                  COMMENT '削除フラグ',
  PRIMARY KEY (id),
  KEY (studio_id),
  KEY (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='スタジオエリア';

insert into studio_area (
  studio_id,
  name,
  address,
  prefectures_id,
  city_id,
  tel,
  payment_method,
  start_date,
  end_date,
  locker_room_flag,
  parking_flag,
  max_number,
  url,
  remark,
  explanation,
  image_path,
  insert_datetime, update_datetime, delete_flag) values (
  1, 
  'テストスタジオ渋谷店1号店',
  '東京都渋谷区1-1',
  10001,
  20001,
  '09012345678',
  '現金のみ',
  '06:00',
  '24:00',
  100,
  true,
  true,
  'http://google.co.jp',
  '24時間営業',
  'なし',
  '/img/test001.jpg'
,now(), now(), false);

insert into studio_area (
  studio_id,
  name,
  address,
  prefectures_id,
  city_id,
  tel,
  payment_method,
  start_date,
  end_date,
  locker_room_flag,
  parking_flag,
  max_number,
  url,
  remark,
  explanation,
  image_path,
  insert_datetime, update_datetime, delete_flag) values (
  1, 
  'テストスタジオ渋谷店2号店',
  '東京都渋谷区2-1',
  10001,
  20001,
  '09012345678',
  '現金のみ',
  '06:00',
  '24:00',
  100,
  true,
  true,
  'http://google.co.jp',
  '24時間営業',
  'なし',
  '/img/test001.jpg'
,now(), now(), false);