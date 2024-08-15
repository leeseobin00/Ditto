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
-- Table structure for table `question`
--

DROP TABLE IF EXISTS `question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `question` (
  `class_id` int DEFAULT NULL,
  `is_answered` bit(1) DEFAULT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `question_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `modified_date` datetime(6) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`question_id`),
  KEY `FK6lku7dalp3ru1qfyp7wnr9jc0` (`class_id`),
  KEY `FK4ekrlbqiybwk8abhgclfjwnmc` (`user_id`),
  CONSTRAINT `FK4ekrlbqiybwk8abhgclfjwnmc` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FK6lku7dalp3ru1qfyp7wnr9jc0` FOREIGN KEY (`class_id`) REFERENCES `dclass` (`class_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `question`
--

LOCK TABLES `question` WRITE;
/*!40000 ALTER TABLE `question` DISABLE KEYS */;
INSERT INTO `question` VALUES (1,_binary '\0',_binary '\0',1,13,'2024-08-13 08:52:46.320261','2024-08-13 08:52:46.320261','ㅇㅇ','재밌나여?'),(11,_binary '\0',_binary '',2,30,'2024-08-13 13:04:49.527238','2024-08-14 09:09:02.807238','귀네가 너무 커엽네요','키트만 따로 살 수 있나요?'),(14,_binary '',_binary '\0',3,62,'2024-08-13 16:10:53.170614','2024-08-13 17:00:45.786218','강의를 너무 듣고 싶은데 주말밖에 시간이 안 나네요..ㅜㅜ 주말 강의도 만들어주시면 감사하겠습니다.','주말 강의는 없을까요?'),(11,_binary '',_binary '\0',4,73,'2024-08-14 09:29:46.621755','2024-08-14 09:50:57.906360','제가 손이 커서 섬세한 작업이 조금 힘든데 잘 따라가지 못할까봐 걱정이네요.','손이 큰 사람도 할 수 있을까요?'),(17,_binary '',_binary '\0',5,73,'2024-08-14 09:37:54.232117','2024-08-14 09:55:05.475095','균형을 맞추기 쉽지 않을 것 같은데요','모빌의 균형이 맞지 않으면 어떻게하죠?'),(27,_binary '\0',_binary '',6,73,'2024-08-14 10:20:22.738913','2024-08-14 10:21:16.996008','문의문의문의','안녕하세요 문의 드립니다'),(36,_binary '\0',_binary '\0',7,90,'2024-08-14 12:24:58.619043','2024-08-14 12:24:58.619043','안녕하세요! 수강 난이도와 초보도 가능한지 문의드립니다 :)','초보도 등록 가능한가요?'),(11,_binary '\0',_binary '\0',8,90,'2024-08-14 12:26:53.056392','2024-08-14 12:26:53.056392','안녕하세요! 강의 난이도가 궁금합니다! \n초보도 등록 가능한가요?','초보도 등록 가능한지 문의드립니다.'),(14,_binary '\0',_binary '\0',9,86,'2024-08-14 12:49:16.804299','2024-08-14 12:49:16.804299','재수강도 가능한지 문의드립니다.\n강의 내용이 모두 동일한가요?','재수강도 가능한가요?'),(32,_binary '\0',_binary '\0',10,73,'2024-08-14 19:10:08.251726','2024-08-14 19:10:08.251726','문의합니다.','문의 드립니다');
/*!40000 ALTER TABLE `question` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-16  0:28:13
