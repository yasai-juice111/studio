SET CHARSET utf8;

ALTER TABLE studio ADD explanation varchar(255) DEFAULT 0 NOT NULL AFTER login_password;
ALTER TABLE studio ADD station varchar(255) DEFAULT 0 NOT NULL AFTER explanation;
ALTER TABLE studio ADD delete_flag tinyint(1) DEFAULT 0 NOT NULL AFTER update_datetime;