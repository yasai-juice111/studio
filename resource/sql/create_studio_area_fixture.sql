DROP TABLE studio_area_fixture;

SET CHARSET utf8;

/**
 * スタジオエリア備品
 */
CREATE TABLE IF NOT EXISTS studio_area_fixture (
  id              BIGINT(20)  UNSIGNED  NOT NULL  AUTO_INCREMENT  COMMENT 'ID',
  studio_area_id  BIGINT(20)  UNSIGNED  NOT NULL  				        COMMENT 'スタジオエリアID',
  name            varchar(255)          NOT NULL                  COMMENT '部屋名',
  explanation     varchar(255)          NOT NULL                  COMMENT '説明',
  term            varchar(255)          NOT NULL                  COMMENT '時間ごと',
  price           varchar(255)          NOT NULL                  COMMENT '料金',
  insert_datetime DATETIME 				      NOT NULL				          COMMENT '作成日時',
  update_datetime DATETIME              NOT NULL                  COMMENT '更新日時',
  delete_flag     boolean               NOT NULL                  COMMENT '削除フラグ',
  PRIMARY KEY (id),
  KEY (studio_area_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='スタジオエリア備品';

insert into studio_area_fixture (studio_area_id, name, explanation, term, price, insert_datetime, update_datetime, delete_flag) values (1, 'CDプレイヤー', 'テスト', '1時間ごと', '1000円', now(), now(), false);
insert into studio_area_fixture (studio_area_id, name, explanation, term, price, insert_datetime, update_datetime, delete_flag) values (1, 'CDプレイヤー', 'テスト', '1時間ごと', '1000円', now(), now(), false);
insert into studio_area_fixture (studio_area_id, name, explanation, term, price, insert_datetime, update_datetime, delete_flag) values (1, 'CDプレイヤー', 'テスト', '1時間ごと', '1000円', now(), now(), false);