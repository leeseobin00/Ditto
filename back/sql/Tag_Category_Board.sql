-- USER_ROLE 테이블에 데이터 삽입
insert into user_role(role_name) values('사용자');
insert into user_role(role_name) values('강사');
insert into user_role(role_name) values('운영자');

-- Category 테이블에 데이터 삽입
INSERT INTO Category (category_name) VALUES ('리빙');
INSERT INTO Category (category_name) VALUES ('패브릭');
INSERT INTO Category (category_name) VALUES ('푸드');
INSERT INTO Category (category_name) VALUES ('아트');

-- Category 테이블의 ID 값 조회
SELECT category_id, category_name FROM Category;

-- 조회된 Category ID를 바탕으로 Tag 테이블에 데이터 삽입
INSERT INTO Tag (tag_name, category_id) VALUES ('비누', 1);
INSERT INTO Tag (tag_name, category_id) VALUES ('향수', 1);
INSERT INTO Tag (tag_name, category_id) VALUES ('캔들', 1);
INSERT INTO Tag (tag_name, category_id) VALUES ('무드등', 1);
INSERT INTO Tag (tag_name, category_id) VALUES ('방향제', 1);

INSERT INTO Tag (tag_name, category_id) VALUES ('뜨개질', 2);
INSERT INTO Tag (tag_name, category_id) VALUES ('가죽', 2);
INSERT INTO Tag (tag_name, category_id) VALUES ('모루', 2);
INSERT INTO Tag (tag_name, category_id) VALUES ('바느질', 2);
INSERT INTO Tag (tag_name, category_id) VALUES ('십자수', 2);
INSERT INTO Tag (tag_name, category_id) VALUES ('마크라메', 2);

INSERT INTO Tag (tag_name, category_id) VALUES ('떡', 3);
INSERT INTO Tag (tag_name, category_id) VALUES ('베이커리', 3);

INSERT INTO Tag (tag_name, category_id) VALUES ('미니어처', 4);
INSERT INTO Tag (tag_name, category_id) VALUES ('키링', 4);
INSERT INTO Tag (tag_name, category_id) VALUES ('모빌', 4);
INSERT INTO Tag (tag_name, category_id) VALUES ('페인팅', 4);

-- Board 테이블에 데이터 삽입
INSERT INTO Board (board_name) VALUES ('소통해요');
INSERT INTO Board (board_name) VALUES ('자랑해요');
INSERT INTO Board (board_name) VALUES ('도와줘요');