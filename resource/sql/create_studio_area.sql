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
  tel		            varchar(11)           NOT NULL                  COMMENT '電話番号',
  near_station      varchar(255)          NOT NULL                  COMMENT '最寄り駅',
  payment_method    varchar(255)          NOT NULL                  COMMENT '支払い方法',
  start_date        TIME                  NOT NULL                  COMMENT '営業開始時間',
  end_date          TIME                  NOT NULL                  COMMENT '営業終了時間',
  locker_room_flag  boolean               NOT NULL                  COMMENT '更衣室フラグ',
  parking_flag      boolean               NOT NULL                  COMMENT '駐車場フラグ',
  cancel_remark     varchar(255)              NULL                  COMMENT 'キャンセル期限',
  remark            varchar(255)              NULL                  COMMENT '備考',
  image_path        varchar(255)              NULL                  COMMENT '画像パス',
  insert_datetime   DATETIME 				      NOT NULL				          COMMENT '作成日時',
  update_datetime   DATETIME              NOT NULL                  COMMENT '更新日時',
  delete_flag       boolean               NOT NULL                  COMMENT '削除フラグ',
  PRIMARY KEY (id),
  KEY (studio_id),
  KEY (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='スタジオエリア';

insert into studio_area (studio_id, name, address, tel, near_station, payment_method, start_date, end_date, locker_room_flag, parking_flag, cancel_remark, remark, image_path, insert_datetime, update_datetime, delete_flag) values (1, 
  '渋谷店',
  '東京都渋谷区1-1',
  '09012345678',
  'テスト駅徒歩1秒',
  '現金のみ',
  '06:00',
  '24:00',
  true,
  true,
  '24時間前',
  'なし',
  '/img/test001.jpg'
,now(), now(), false);
insert into studio_area (studio_id, name, address, tel, near_station, payment_method, start_date, end_date, locker_room_flag, parking_flag, cancel_remark, remark, image_path, insert_datetime, update_datetime, delete_flag) values (1, 
  '恵比寿店',
  '東京都渋谷区1-2',
  '09012345678',
  'テスト駅徒歩1秒',
  '現金のみ',
  '06:00',
  '24:00',
  true,
  true,
  '24時間前',
  'なし',
  '/img/test001.jpg'
,now(), now(), false);
insert into studio_area (studio_id, name, address, tel, near_station, payment_method, start_date, end_date, locker_room_flag, parking_flag, cancel_remark, remark, image_path, insert_datetime, update_datetime, delete_flag) values (1, 
  '渋谷店',
  '東京都渋谷区2-1',
  '09012345678',
  'テスト駅徒歩1秒',
  '現金のみ',
  '06:00',
  '24:00',
  true,
  true,
  '24時間前',
  'なし',
  '/img/test001.jpg'
,now(), now(), false);
insert into studio_area (studio_id, name, address, tel, near_station, payment_method, start_date, end_date, locker_room_flag, parking_flag, cancel_remark, remark, image_path, insert_datetime, update_datetime, delete_flag) values (1, 
  '祐天寺店',
  '東京都目黒区1-1',
  '09012345678',
  'テスト駅徒歩1秒',
  '現金のみ',
  '06:00',
  '24:00',
  true,
  true,
  '24時間前',
  'なし',
  '/img/test001.jpg'
,now(), now(), false);