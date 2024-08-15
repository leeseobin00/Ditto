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
-- Table structure for table `live_room`
--

DROP TABLE IF EXISTS `live_room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `live_room` (
  `current_count` tinyint DEFAULT NULL,
  `is_finished` bit(1) DEFAULT NULL,
  `lecture_id` int DEFAULT NULL,
  `liveroom_id` int NOT NULL AUTO_INCREMENT,
  `max_count` tinyint DEFAULT NULL,
  `open_time` datetime(6) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `session_id` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`liveroom_id`),
  UNIQUE KEY `UKkyi3irmsx9w4tvjd79c3lkjrp` (`lecture_id`),
  CONSTRAINT `FKlnjq7lrytmvb6tt9h7top3j3e` FOREIGN KEY (`lecture_id`) REFERENCES `lecture` (`lecture_id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `live_room`
--

LOCK TABLES `live_room` WRITE;
/*!40000 ALTER TABLE `live_room` DISABLE KEYS */;
INSERT INTO `live_room` VALUES (0,_binary '',1,1,0,'2024-08-12 10:30:00.201802','김강사의 테스트 8월 12일 라이브 방','ses_FSVr1f9lqS'),(0,_binary '',2,2,0,'2024-08-12 10:30:00.429290','김강사의 테스트 8월 12일 라이브 방','ses_YD5ilBZxWH'),(0,_binary '',3,3,0,'2024-08-12 10:30:00.449419','김강사의 테스트 8월 12일 라이브 방','ses_FDTUsZYK6l'),(0,_binary '',4,4,0,'2024-08-12 10:30:00.469544','김강사의 테스트 8월 12일 라이브 방','ses_WGIXTpH2z7'),(0,_binary '',5,5,0,'2024-08-12 10:30:00.499576','김강사의 테스트 8월 12일 라이브 방','ses_ZNIujLwApD'),(0,_binary '',14,12,0,'2024-08-12 13:45:00.139106','김강사의 테스트 8월 12일 라이브 방','ses_Xb8Vt9vqGD'),(0,_binary '',15,13,0,'2024-08-12 13:45:00.340314','김강사의 테스트 8월 12일 라이브 방','ses_JV5n1XAWlJ'),(0,_binary '',16,14,0,'2024-08-12 13:45:00.357870','김강사의 테스트 8월 12일 라이브 방','ses_JDacPgBaNH'),(0,_binary '',17,15,1,'2024-08-12 14:25:01.633691','김강사의 테스트 8월 12일 라이브 방','ses_YdL7XCaL3Z'),(0,_binary '',22,18,1,'2024-08-12 17:06:00.316517','권강사의 밥 8월 12일 라이브 방','ses_SR7oOipndy'),(0,_binary '',23,19,0,'2024-08-12 20:36:00.422801','권강사의 밥 8월 12일 라이브 방','ses_QurFMxEQzv'),(0,_binary '',25,21,0,'2024-08-12 20:36:00.734802','김강사의 테스트 8월 12일 라이브 방','ses_KGq9wWjPKB'),(0,_binary '',26,22,0,'2024-08-12 22:07:00.260383','권강사의 밥 8월 12일 라이브 방','ses_GbWs8y4Diy'),(0,_binary '',27,23,0,'2024-08-13 14:46:00.140572','규태왕김파도의 비즈발 만들기 8월 13일 라이브 방','ses_DV83oIQvzF'),(0,_binary '',29,24,1,'2024-08-13 15:51:00.178915','비즈쌤의 비즈발 만들기 8월 13일 라이브 방','ses_OPWJhOHxjj'),(0,_binary '',28,25,0,'2024-08-13 16:30:00.193510','비즈쌤의 비즈발 만들기 8월 13일 라이브 방','ses_B567qxeqam'),(0,_binary '',30,26,0,'2024-08-13 17:30:00.196785','비즈쌤의 비즈발 만들기 8월 13일 라이브 방','ses_Yo6LCPatpe'),(0,_binary '',31,27,1,'2024-08-13 18:30:00.184868','요리마스터백쌤의 [노오븐베이커리] 초간단 브라우니 클래스 8월 13일 라이브 방','ses_CG4eIZdHgs'),(0,_binary '',32,28,0,'2024-08-13 18:30:00.305705','SEO의 나만의 향수 만들기 클래스 8월 13일 라이브 방','ses_VWsf0KEXyd'),(0,_binary '',33,29,0,'2024-08-13 19:30:00.341820','SEO의 나만의 향수 만들기 클래스 8월 13일 라이브 방','ses_HP9QNHlXhe'),(0,_binary '\0',34,30,0,'2024-08-13 21:26:00.189779','비즈쌤의 내 공간의 반전 포인트, 썬캐처 만들기 8월 13일 라이브 방','ses_Pc05JUvUky'),(0,_binary '',35,31,0,'2024-08-14 09:13:00.197335','장쌤의 커비 비즈 키링 만들기 8월 14일 라이브 방','ses_HbC0LYXiUU'),(0,_binary '',37,32,0,'2024-08-14 09:40:00.152820','장쌤의 레고 키링 커스텀 클래스 8월 14일 라이브 방','ses_UXyYdRyvB1'),(0,_binary '',36,33,0,'2024-08-14 10:00:00.166642','장쌤의 레고 키링 커스텀 클래스 8월 14일 라이브 방','ses_QgzyrgKDbn'),(0,_binary '',38,34,0,'2024-08-14 10:39:00.156948','한선생의 첫 손바느질, 빛 고운 한복이 되다 8월 14일 라이브 방','ses_RWvNsFikHk'),(0,_binary '',39,35,0,'2024-08-14 11:17:00.195962','박강사의 보글보글 나만의 배쓰밤 만들기 8월 14일 라이브 방','ses_YOCndxk4Gg'),(0,_binary '',40,36,0,'2024-08-14 12:46:00.195047','라탄왕김라탄의 캐릭터 라탄저금통 만들기 8월 14일 라이브 방','ses_Et9g8ACbkQ'),(0,_binary '',48,37,0,'2024-08-14 12:47:00.213564','라탄왕김라탄의 라탄 휴지 케이스 만들기 8월 14일 라이브 방','ses_MyQguUFX0T'),(0,_binary '',41,38,0,'2024-08-14 13:30:00.169800','라탄왕김라탄의 캐릭터 라탄저금통 만들기 8월 14일 라이브 방','ses_WRILAAfYbA'),(0,_binary '',44,39,0,'2024-08-14 13:30:00.272429','라탄왕김라탄의 내가 만드는 라탄소품 미니채반 8월 14일 라이브 방','ses_FLW5XaLK5h'),(0,_binary '',49,40,0,'2024-08-14 13:30:00.286230','라탄왕김라탄의 라탄 휴지 케이스 만들기 8월 14일 라이브 방','ses_HfDVQi2jv3'),(0,_binary '',42,41,0,'2024-08-14 14:30:00.479036','라탄왕김라탄의 캐릭터 라탄저금통 만들기 8월 14일 라이브 방','ses_SgmCYphStV'),(0,_binary '',45,42,0,'2024-08-14 14:30:00.791482','라탄왕김라탄의 내가 만드는 라탄소품 미니채반 8월 14일 라이브 방','ses_Mp5Pmw1WNh'),(0,_binary '',50,43,0,'2024-08-14 14:30:00.821994','라탄왕김라탄의 라탄 휴지 케이스 만들기 8월 14일 라이브 방','ses_GzdsdICDO2'),(0,_binary '',43,44,0,'2024-08-14 15:30:00.180849','라탄왕김라탄의 캐릭터 라탄저금통 만들기 8월 14일 라이브 방','ses_Os5YCutgbJ'),(0,_binary '',46,45,0,'2024-08-14 15:30:00.285374','라탄왕김라탄의 내가 만드는 라탄소품 미니채반 8월 14일 라이브 방','ses_Xw0dS8GTEJ'),(0,_binary '',51,46,0,'2024-08-14 15:30:00.305225','라탄왕김라탄의 라탄 휴지 케이스 만들기 8월 14일 라이브 방','ses_L2JisrSrdU'),(0,_binary '',47,47,0,'2024-08-14 16:30:00.202828','라탄왕김라탄의 내가 만드는 라탄소품 미니채반 8월 14일 라이브 방','ses_C01PDaaG9A'),(0,_binary '',52,48,0,'2024-08-14 16:30:00.326601','라탄왕김라탄의 라탄 휴지 케이스 만들기 8월 14일 라이브 방','ses_D9z6kzrJk5'),(0,_binary '',58,49,0,'2024-08-14 16:44:00.228324','비즈쌤의 비즈발 만들기 8월 14일 라이브 방','ses_DhBY3qakB4'),(0,_binary '',59,50,0,'2024-08-14 17:05:00.215125','비즈쌤의 비즈발 만들기 8월 14일 라이브 방','ses_RbOHox6AMt'),(0,_binary '',60,51,0,'2024-08-14 17:17:00.210215','SEO의 나만의 향수 만들기 클래스 8월 14일 라이브 방','ses_KmMIIgUdjd'),(0,_binary '',61,52,2,'2024-08-14 17:18:00.232045','SEO의 나만의 향수 만들기 클래스 8월 14일 라이브 방','ses_C6VaadkvNh'),(0,_binary '',62,53,0,'2024-08-14 17:26:00.280024','SEO의 선물하기 좋은 감성 무드등 클래스 8월 14일 라이브 방','ses_T1yg8fhDyB'),(0,_binary '\0',63,54,0,'2024-08-14 17:59:00.235714','비즈쌤의 비즈발 만들기 8월 14일 라이브 방','ses_OiP787AiHh'),(0,_binary '\0',64,55,0,'2024-08-14 18:04:00.263216','비즈쌤의 비즈발 만들기 8월 14일 라이브 방','ses_RjSjr7bjC1'),(0,_binary '\0',65,56,0,'2024-08-14 18:04:00.289712','비즈쌤의 비즈발 만들기 8월 14일 라이브 방','ses_IHlzOCo3ur'),(0,_binary '\0',53,57,4,'2024-08-14 18:30:00.245984','비즈쌤의 비즈발 만들기 8월 14일 라이브 방','ses_WDTXg3TKap'),(0,_binary '',54,58,0,'2024-08-15 18:30:00.187358','비즈쌤의 비즈발 만들기 8월 15일 라이브 방','ses_JvQPUKTWws'),(0,_binary '',57,59,1,'2024-08-15 19:30:00.183229','장쌤의 당신의 마음을 담은 테라리움 원데이클래스 8월 15일 라이브 방','ses_JmTJ8Oo52W'),(0,_binary '',66,60,0,'2024-08-15 19:53:00.175394','라탄왕김라탄의 캐릭터 라탄저금통 만들기 8월 15일 라이브 방','ses_HVdGn9DoDC');
/*!40000 ALTER TABLE `live_room` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-16  0:28:07
