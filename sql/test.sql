
SELECT * FROM game_room;
SELECT * FROM game_room_job_state;
SELECT * FROM game_room_state;
SELECT * FROM game_job_data;
SELECT * FROM user;
SELECT * FROM atattment;
SELECT * FROM notice;
SELECT * FROM item;
SELECT * FROM USER;
SELECT * FROM game_vote;
SELECT * FROM chat_message ;

SHOW table;

INSERT INTO user (id, email, gamemoney,name, password, username, ingame_job_id) VALUES
(1,"aa1@naver.com",0,"1번",2,"1번",1),
(2,"aa2@naver.com",0,"2번",2,"2번",1),
(3,"aa3@naver.com",0,"3번",2,"3번",1),
(4,"aa4@naver.com",0,"4번",2,"4번",1),
(5,"aa5@naver.com",0,"5번",2,"5번",1),
(6,"aa6@naver.com",0,"6번",2,"6번",1),
(7,"aa7@naver.com",0,"7번",2,"7번",1),
(8,"aa8@naver.com",0,"8번",2,"8번",1)
;
INSERT INTO game_job_data (id, name, night_vote, self_vote,effect_type) VALUES
(1, "시민",FALSE,FALSE,"NONE"),
(2,"마피아",TRUE,FALSE,"KILL"),
(3,"경찰",TRUE,FALSE,"SEARCH"),
(4,"의사",TRUE,TRUE,"HEAL");
UPDATE game_job_data SET selfvote = FALSE ;
UPDATE game_job_data SET night_vote = FALSE WHERE id = 1;
UPDATE USER SET game_room_id = NULL ;


DELETE FROM user;
DELETE FROM user;
ALTER TABLE user AUTO_INCREMENT = 1;
DELETE FROM game_room;
DELETE FROM game_room_job_state;
DELETE FROM game_job_data ;
DELETE FROM game_room_state;
DROP TABLE selling;
DROP TABLE user_authorities;
DROP TABLE gameavatar;
DROP TABLE USER;
DROP table game_room;