
SELECT * FROM game_room;
SELECT * FROM game_room_state;
SELECT * FROM user;
SELECT * FROM atattment;
SELECT * FROM notice;
SELECT * FROM item;
SELECT * FROM USER;

SHOW table;

INSERT INTO user (id, email, gamemoney,name, password, username) VALUES
(1,"aa1@naver.com",0,"1번",2,"1번"),
(2,"aa2@naver.com",0,"2번",2,"2번"),
(3,"aa3@naver.com",0,"3번",2,"3번"),
(4,"aa4@naver.com",0,"4번",2,"4번"),
(5,"aa5@naver.com",0,"5번",2,"5번"),
(6,"aa6@naver.com",0,"6번",2,"6번"),
(7,"aa7@naver.com",0,"7번",2,"7번"),
(8,"aa8@naver.com",0,"8번",2,"8번")
;

DELETE FROM user;
DELETE FROM user;
ALTER TABLE user AUTO_INCREMENT = 1;
DELETE FROM game_room;
DELETE FROM game_room_job_state;
DELETE FROM game_room_state;
DROP TABLE selling;
DROP TABLE user_authorities;
DROP TABLE gameavatar;
DROP TABLE USER;
DROP table game_room;