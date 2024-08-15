-- MySQL dump 10.13  Distrib 8.0.36, for macos14 (arm64)
--
-- Host: i11a106.p.ssafy.io    Database: ditto
-- ------------------------------------------------------
-- Server version	8.0.39-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `dclass`
--

DROP TABLE IF EXISTS `dclass`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dclass` (
  `category_id` int DEFAULT NULL,
  `class_hour` tinyint DEFAULT NULL,
  `class_id` int NOT NULL AUTO_INCREMENT,
  `class_max` tinyint DEFAULT NULL,
  `class_min` tinyint DEFAULT NULL,
  `class_minute` tinyint DEFAULT NULL,
  `class_price` int DEFAULT NULL,
  `file_id` int DEFAULT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `kit_id` int DEFAULT NULL,
  `like_count` int DEFAULT NULL,
  `rating_sum` int DEFAULT NULL,
  `review_count` int DEFAULT NULL,
  `student_sum` int DEFAULT NULL,
  `tag_id` int DEFAULT NULL,
  `user_id` int NOT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `modified_date` datetime(6) DEFAULT NULL,
  `class_name` varchar(50) DEFAULT NULL,
  `class_explanation` varchar(3000) DEFAULT NULL,
  PRIMARY KEY (`class_id`),
  KEY `FKtmu5jj6tdfhpeqyvq7m5ribt3` (`category_id`),
  KEY `FKfotk9xmpijwlq14473l66kml6` (`file_id`),
  KEY `FKo69wxglq3o7nlw1yv8dk36134` (`kit_id`),
  KEY `FKcx857mydt1hew644jir4w54ip` (`tag_id`),
  KEY `FK7i8nmicsb9vfd9c37a16hfjkb` (`user_id`),
  CONSTRAINT `FK7i8nmicsb9vfd9c37a16hfjkb` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FKcx857mydt1hew644jir4w54ip` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`tag_id`),
  CONSTRAINT `FKfotk9xmpijwlq14473l66kml6` FOREIGN KEY (`file_id`) REFERENCES `file` (`file_id`),
  CONSTRAINT `FKo69wxglq3o7nlw1yv8dk36134` FOREIGN KEY (`kit_id`) REFERENCES `kit` (`kit_id`),
  CONSTRAINT `FKtmu5jj6tdfhpeqyvq7m5ribt3` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dclass`
--

LOCK TABLES `dclass` WRITE;
/*!40000 ALTER TABLE `dclass` DISABLE KEYS */;
INSERT INTO `dclass` VALUES (1,0,1,10,0,5,1234,2,_binary '',1,1,15,3,4,1,4,'2024-08-12 10:29:23.744833','2024-08-13 08:46:54.188749','테스트','ㅌㅅㅌ'),(3,0,4,8,0,5,20000,10,_binary '',4,0,5,1,6,14,23,'2024-08-12 14:11:06.196405','2024-08-13 11:15:39.948730','밥','밥'),(2,1,5,8,0,0,5000,13,_binary '',5,0,0,0,0,7,4,'2024-08-12 17:33:33.273833','2024-08-13 09:03:56.399990','초보자도 쉽게 할 수 있는 뜨개질 강의','뜨개질'),(1,1,6,8,0,20,38000,18,_binary '\0',6,21,0,0,0,6,4,'2024-08-13 09:03:13.525482','2024-08-13 18:43:26.002018','내가 만드는 라탄소품 미니채반','안녕하세요 소소라탄입니다.<br /><br />원데이 클래스로 진행하는 내가 만드는 라탄소품 미니채반은 쓰임새가 많은 채반입니다 :)<br />과일이나,디저트를 올리기도하며, 소품채반으로 사용도 좋습니다.<br /><br />화장대에 올려놔도, 거실,주방 어디에 둬도 크기며,모양까지 완벽하게 예쁜 채반이죠 :)'),(1,2,8,7,0,0,45000,29,_binary '\0',8,42,0,0,0,6,4,'2024-08-13 09:28:44.645662','2024-08-15 19:58:54.912799','캐릭터 라탄저금통 만들기','소소라탄은 라탄을 엮는 힐링을 많은 분들이 경험해보셨으면 하는 마음으로 수업을 준비했습니다.<br />꼭 좋은 경험,취미생활로도 가능한 라탄클래스 해보셨으면 좋겠어요 :)<br /><br />느리지만 천천히 엮는 라탄수업 함께해요.<br /><br /><br />라탄저금통은 키즈클래스가 가능해요 :)<br /><br />동물 모양으로 아이들이 좋아하는 저금통, 엄마와 아이가 함께하는 수업이랍니다.<br />( 아이와 엄마가 함께하는 수업으로 예약후 어떤 캐릭터저금통으로 수업하고 싶으신지 메모남겨주세요! )'),(1,1,9,6,0,45,40000,34,_binary '\0',9,21,0,0,1,6,4,'2024-08-13 10:05:40.869723','2024-08-14 12:53:16.457838','라탄 휴지 케이스 만들기','안녕하세요 소소라탄 입니다 :)<br />라탄으로 소소한일상에 따뜻함과 힐링 을 선물해 드리고 싶어요.<br /><br />그래서 준비한 이번 수업은 합판을 이용하여 어린이들 부터 모두가 쉽게 만들수있는 휴지케이스입니다.<br />얇은 환심으로 만들어내는 작품이 얼마나 아름다운지 수업을 통해 배워가실 수 있었으면 좋겠어요 :)<br /><br />일상생활에 많이 쓰이는 휴지케이스는 통기성이 좋은 라탄으로 만들어 더 빨리 마르고 물고임이 없는 소품으로 사용하실 수 있어요 :)'),(3,1,10,10,0,0,33000,39,_binary '\0',10,35,0,0,0,13,1,'2024-08-13 10:14:59.185158','2024-08-13 12:59:35.056931','앙금 플라워 케이크 클래스 ','- 미니 장미 꽃다발 케이크를 쉽게 만들 수 있어요 <br />- 비싼 재료를 쓸만큼만 사용할 수 있어서 좋아요 <br />- 집에서 편하게 수업을 들을 수 있어서 좋아요<br />- 저비용으로 재밌는 앙금플라워 케이크 만들기에 도전해볼수 있어요<br />- 아이와 함께, 연인과 함께 소중한 추억을 나눌 수 있어요'),(4,1,11,8,0,0,25000,47,_binary '\0',11,57,0,0,4,16,11,'2024-08-13 10:22:11.261351','2024-08-14 12:26:28.601704','커비 비즈 키링 만들기','커비 펜던트와 여러가지 비즈를 이용한 키링을 만들어 볼거에요<br /><br /><br />\'과일 먹는 커비 비즈키링\' <br /><br />저와 함께 만들어 볼까요??'),(1,0,12,6,0,30,20000,73,_binary '\0',12,33,0,0,2,2,12,'2024-08-13 11:15:17.235722','2024-08-14 17:17:59.868005','나만의 향수 만들기 클래스','나만의 향수를 만들어 기분 전환을 해보거나, 소중한 사람에게 선물해보는 것은 어떨까요?<br /><br />특별한 기술은 필요 없어요. 초보자도 쉽게 도전할 수 있답니다 ㅎㅎ'),(1,0,13,6,0,40,21000,93,_binary '\0',13,24,0,0,0,5,9,'2024-08-13 12:35:44.329035','2024-08-13 13:39:24.673472','향기로 채우는 공간: DIY 방향제 만들기','이 강의에서는 집에서 쉽게 만들 수 있는 다양한 DIY 방향제를 소개합니다. 천연 재료를 활용하여 건강하고 안전한 방향제를 만드는 방법을 배울 수 있으며, 자신만의 향을 창조하여 공간을 더욱 쾌적하게 가꾸어 보세요. 이 과정은 초보자도 쉽게 따라할 수 있도록 체계적으로 구성되어 있으며, 창의적인 손작업을 통해 스트레스를 해소하고 성취감을 느낄 수 있습니다.'),(4,1,14,8,0,30,24000,99,_binary '\0',14,12,19,4,17,15,10,'2024-08-13 12:55:09.427128','2024-08-14 18:04:19.766542','비즈발 만들기','#나만의 큐티뽀짝 비즈발 만들기<br /><br />나만의 비즈발 만들기 클래스<br /><br />- 미니비즈발: 60분~90분'),(1,1,15,6,0,40,42000,117,_binary '\0',15,27,0,0,0,3,8,'2024-08-13 13:54:01.565181','2024-08-13 16:57:17.770354','커스텀 캔들 DIY 클래스','가장 기본적이고 집에서도 실용적으로 태울 수 있는 캔들인 <br /><br />컨테이너 캔들만들기 순서에 대해서 알려드리려고 해요 <br /><br />가장 기본적인 캔들만들기지만! 집에서 쉽게 만들기는 어려운 캔들이에요 <br /><br />그래도 제가 사용하는 꿀팁을 알려드릴 예정이니 함께 만들어봐요~'),(2,1,16,8,1,30,80000,152,_binary '',16,24,0,0,0,8,4,'2024-08-13 17:42:26.023253','2024-08-13 17:42:26.023253','내 취향에 맞추어, 멋지게 완성하는 가죽 소품','숄더 혹은 토트 형태로도 활용할 수 있는 M자 형태 패턴의 이해와 만드는 방법을 배워보아요. 어깨에 착! 메고 친구들과 만나면 \"정말 네가 만들었다고?\"라는 소리 들으실 거예요 :)\n가방을 착용할 때 캐주얼한 느낌의 스트랩이 하나 있으면 좋겠는데 기성품에서는 마음에 드는 게 없는 경우가 많죠. 활용도 만점인 웨빙 스트랩도 함께 만들어 볼 거에요.\n해당 클래스에서는 재료도 좋은 것으로만 골라 준비했어요! 실은 프랑스에서 만들어진 최고급 린넨사 린카블레를 제공합니다.'),(4,0,17,6,0,40,12000,166,_binary '\0',17,12,0,0,0,17,10,'2024-08-13 17:48:10.624906','2024-08-13 17:48:10.624906','모시 비즈 커스텀 모빌 클래스','이번 신규 클래스 DIY 인테리어 소품 테마는<br /><br />바로 시원하고 빳빳한 재질이 돋보이는 모시 비즈 모빌입니다<br /><br />오늘날의 날씨와 딱 어울리는 인테리어 소품<br /><br />40분이면 누구나 만들 수 있어요 ?'),(2,1,18,8,0,30,80000,172,_binary '\0',18,35,0,0,0,8,7,'2024-08-13 17:51:18.366271','2024-08-13 17:51:18.366271','내 취향에 맞추어, 멋지게 완성하는 가죽 소품','숄더 혹은 토트 형태로도 활용할 수 있는 M자 형태 패턴의 이해와 만드는 방법을 배워보아요. 어깨에 착! 메고 친구들과 만나면 \\\"정말 네가 만들었다고?\\\"라는 소리 들으실 거예요 :)\\n가방을 착용할 때 캐주얼한 느낌의 스트랩이 하나 있으면 좋겠는데 기성품에서는 마음에 드는 게 없는 경우가 많죠. 활용도 만점인 웨빙 스트랩도 함께 만들어 볼 거에요.\\n해당 클래스에서는 재료도 좋은 것으로만 골라 준비했어요! 실은 프랑스에서 만들어진 최고급 린넨사 린카블레를 제공합니다.'),(3,0,19,6,0,30,10000,181,_binary '\0',19,44,5,1,1,14,25,'2024-08-13 18:02:12.582681','2024-08-14 09:12:00.797244','[노오븐베이커리] 초간단 브라우니 클래스','재료도 간단, 레시피는 더 간단!<br /><br />그치만, 맛은 카페에서 먹는 브라우니 안부럽다는 거>_<<br /><br />이제는 집에있는 재료로 쉽게 브라우니 같이 만들어보아요♡'),(3,1,20,4,0,0,14000,188,_binary '\0',20,22,0,0,0,14,25,'2024-08-13 18:14:41.091283','2024-08-13 18:14:41.091283','[노오븐베이커리] 몬테크리스토 샌드위치 클래스','간단히 브런치로 즐겨도 좋고 피크닉 도시락 메뉴나 간식으로 즐기기 좋은 몬테크리스토 샌드위치를 같이 만들어보아요<br /><br />베니건스의 몬테크리스토 샌드위치는 안에 칠면조가 들어가는 반면 저는 간단하게 만들 것이기 때문에 햄과 치즈만 이용했답니다!'),(2,1,21,6,0,20,30000,193,_binary '\0',21,6,0,0,0,12,6,'2024-08-13 18:18:18.857246','2024-08-13 18:18:18.857246','매듭의 마법: 마크라메로 만드는 나만의 작품!','손끝에서 펼쳐지는 매듭의 마법, 마크라메 강의입니다!<br /><br />마크라메의 기본 매듭부터 시작해, 다양한 디자인을 직접 만들어보는 재미를 느낄 수 있습니다. 단조로운 끈들이 여러분의 손끝에서 매혹적인 예술로 변신하는 순간을 경험하세요!<br /><br />집을 장식할 벽걸이, 화분 걸이, 독특한 악세서리를 직접 만들어보세요!<br />'),(4,0,22,10,0,30,15000,198,_binary '\0',22,37,0,0,0,16,11,'2024-08-13 18:21:58.604025','2024-08-13 18:21:58.604025','레고 키링 커스텀 클래스','세상에 하나 뿐인 나만의 키링을 만들어보는 체험입니다.<br /><br />공방에 구비된 다양한 호환 레고 중 1개를 먼저 고른 뒤<br /><br />다양한 소품들을 이용해 무제한으로 키링을 꾸밀 수 있어요 :)<br /><br />30분이면 완성되는 귀염뽀짝한 레고 키링! 친구/연인/동료/가족 모두 함께 즐길 수 있어요~'),(3,2,23,4,0,0,22000,204,_binary '\0',23,17,0,0,0,13,1,'2024-08-13 18:43:00.892325','2024-08-13 18:43:00.892325','딸기 앙금 모찌 클래스','딸기모찌를 사 먹으면 편하고 좋지만<br />한 번쯤은 내 손으로 직접 만들어 먹는 것도 좋아요~<br />새콤달콤 쫄깃한 딸기찹쌀떡, 딸기모찌 만들기 ♥<br />우리 함께 전자렌지로 조물조물 만들어보아요 :)'),(1,1,24,5,0,0,45000,211,_binary '\0',24,19,0,0,0,1,5,'2024-08-13 18:49:05.545237','2024-08-13 18:49:05.545237','제로웨이스트 커스텀 비누 클래스','나만의 풍경,디자인 비누를 만들수 있는 원데이 클래스이며<br />누구나 쉽게 만들수 있는 클래스 입니다^^'),(1,2,25,4,0,30,36000,215,_binary '\0',25,9,0,0,0,3,5,'2024-08-13 18:55:10.797051','2024-08-13 18:55:10.797051','플라워 캔들 원데이클래스','향을 담은 캔들 만들기 클래스<br />나의 공간속 감성 한스푼<br />나만의 캔들로 공간을 디자인해보세요 :)'),(2,1,26,5,0,40,27000,220,_binary '\0',26,11,0,0,0,12,6,'2024-08-13 19:06:00.720902','2024-08-13 19:06:00.720902','실용만점 투톤 네트백 만들기 클래스','오늘의 스타일에 따라 들고 싶은 가방은 다르잖아요!<br /><br />투톤 네트백 클래스를 통해 새로운 기분 전환을 하는건 어떨까요?'),(2,3,27,5,0,0,40000,225,_binary '\0',27,5,0,0,0,7,6,'2024-08-13 19:12:26.198017','2024-08-14 09:03:26.053488','글로시 실버백팩 - 코바늘 뜨개질 패키지','■ 글로시 실버백팩은 실 두겹으로 뜨는 키트입니다.<br /><br />■ S사이즈는 실 2볼 발송되며, M,L사이즈는 4볼 구성으로 발송됩니다.<br /><br />■ 사이즈별로 제작하실 수 있도록 모든 사이즈 도안 증정별도 준비<br /><br />■ 도구는 별도로 준비해주세요.'),(1,2,28,6,0,20,38000,230,_binary '\0',28,24,0,0,1,1,5,'2024-08-13 19:13:23.434368','2024-08-14 11:17:57.816403','보글보글 나만의 배쓰밤 만들기','이런 분 같이해요!<br />- 기분전환이 필요한 분<br />- 정성이 들어간 선물을 하고싶은 분<br />- 호캉스를 준비하는 분<br />- 휴식이 필요한 분<br /><br />배쓰밤(bath bomb)은 이름에서 알 수 있듯 폭탄처럼 발포하는 탄산 입욕제예요.<br /><br />같이 리프레쉬하며 배쓰밤 만들어볼까요?'),(4,2,29,6,0,0,35000,233,_binary '\0',29,38,0,0,1,15,11,'2024-08-13 19:32:34.714892','2024-08-14 15:48:55.491288','당신의 마음을 담은 테라리움 원데이클래스','더욱 진하게 내 마음이 가득 담긴 테라리움을 만드는 과정입니다.<br /><br />어렸을 때 놀던 추억의 공간, 내 마음이 힘들 때 마다 위로해주던 나만의 아지트, 그리운 사람들, 그리운 동물들.<br /><br />그런 모든 그리움의 마음을 담아 진한 사랑을 표현하는 시간입니다.'),(2,2,30,4,0,0,32000,238,_binary '\0',30,13,0,0,0,7,6,'2024-08-13 19:37:01.224579','2024-08-13 19:37:01.224579','업사이클 양말목 방석 클래스','양말목이 궁금하셨던분, 업사이클에 관심이 있는분들께 추천드리는 클래스입니다.<br /><br />양말목을 처음 접하는 분도 수업 한 번에 방석을 만들 수 있습니다.<br /><br />사각이나 원형 중 한 가지를 선택해 방석한개를 만들기 목표 클래스입니다'),(1,1,31,8,0,0,20000,242,_binary '\0',31,22,0,0,2,4,12,'2024-08-13 19:45:09.165742','2024-08-14 17:26:03.363006','선물하기 좋은 감성 무드등 클래스','나만의 인테리어 무드등이 필요하신 분<br />기념일, 선물용으로 특별한 아이템을 찾으시는 분<br />너무 어렵지 않은 수준의 공예로 힐링하고 싶으신 분<br /><br />★인테리어 조명으로도 좋고, 기념일 선물로도 좋습니다!★'),(4,1,32,10,0,20,28000,247,_binary '\0',32,4,5,1,1,17,10,'2024-08-13 19:52:48.679139','2024-08-14 10:29:24.755241','내 공간의 반전 포인트, 썬캐처 만들기','썬캐쳐는 빛을 모아 퍼트려주는 오브제로, 악몽을 쫓아주는 드림캐쳐 처럼 좋은 기운을 불러들인다는 의미를 담고 있습니다. 다양한 빛을 만드는 썬캐쳐를 만들어보세요.<br /><br />미다모은 공방에에서 준비한 다양한 모양의 비즈와 자개를 골라 나만의 디자인을 구성해보는 시간을 가져보아요'),(4,1,33,8,0,40,48000,251,_binary '\0',33,4,0,0,0,17,10,'2024-08-13 20:00:52.019711','2024-08-14 09:02:25.110185','나만의 드림캐쳐 만들기','드림캐처 원데이 클래스에 오셔서 자신만의 특별한 꿈을 담은 드림캐처를 만들어보세요! <br /><br />마음을 차분하게 만들어주는 힐링 시간, 드림캐처 원데이 클래스에서 즐겨보세요!'),(4,2,34,8,0,30,50000,256,_binary '',34,0,0,0,0,18,7,'2024-08-14 08:55:17.941258','2024-08-14 08:57:25.485008','감성을 담은 글라스 페인팅 클래스','? 감성을 담아 나만의 클라스 페인팅 작품을 완성해보세요!<br /><br />이 클래스에서는 유리를 도화지 삼아 글라스에 직접 그림을 그리고 색을 입혀, 세상에 단 하나뿐인 작품을 만드는 과정을 배웁니다. 글라스 페인팅은 초보자도 쉽게 배울 수 있으며, 다양한 기법을 통해 특별한 글라스 작품을 완성할 수 있습니다.<br /><br />부담없이 도전해보세요! 강의에서 만나요 ㅎㅎ ??'),(4,2,35,8,0,30,50000,261,_binary '\0',35,2,0,0,0,18,7,'2024-08-14 08:57:20.161659','2024-08-14 18:58:49.478849','감성을 담은 글라스 페인팅 클래스','? 감성을 담아 나만의 클라스 페인팅 작품을 완성해보세요!<br /><br />이 클래스에서는 유리를 도화지 삼아 글라스에 직접 그림을 그리고 색을 입혀, 세상에 단 하나뿐인 작품을 만드는 과정을 배웁니다. 글라스 페인팅은 초보자도 쉽게 배울 수 있으며, 다양한 기법을 통해 특별한 글라스 작품을 완성할 수 있습니다.<br /><br />부담없이 도전해보세요! 강의에서 만나요 ㅎㅎ ??'),(2,1,36,6,0,30,90000,292,_binary '\0',36,0,0,0,0,10,6,'2024-08-14 10:38:10.050612','2024-08-14 12:24:36.316306','첫 손바느질, 빛 고운 한복이 되다','한땀한땀 내 손으로 바느질하며 한복의 멋스러움을 느껴봐요<br /><br />한복 만들기를 배우면서 일상에 특별함이 생겼어요. 한복 가게에서 맞추면 비싼 한복을 내 손으로 직접 만들 수 있어서 매년 우리 아이에게 한복을 지어 줄 수도 있고, 지인에게도 정말 고급스럽게 선물도 해요.<br /><br />또 한복을 만들어 작게 창업을 시작해서 판매도 하고, 또 좋은 기회에 한복을 가르치는 일도 해보게 되었고요. 자녀가 커서 시집갈 때, 꼭 저의 손으로 한복을 지어 주고 싶기도 하고요.<br /><br />저는 몇 십 년 된 한복 장인이 아닌 아이를 키우는 평범한 주부입니다. 하지만 우연히 취미로 배운 한복이 너무 재미있어서 더 많이 공부하게 되었고 지금은 저에게 있어 큰 부분이 되었어요.<br /><br />이것은 저의 이야기만이 아닐 거예요. 여러분들도 이 클래스를 배우시면 평범했던 일상에 특별함이 찾아올 거예요. 저와 함께 한복의 멋스러움에 푹 빠져봐요.<br />');
/*!40000 ALTER TABLE `dclass` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-16  0:28:08
