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
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review` (
  `class_id` int DEFAULT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `lecture_id` int DEFAULT NULL,
  `rating` tinyint DEFAULT NULL,
  `review_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `modified_date` datetime(6) DEFAULT NULL,
  `review_content` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`review_id`),
  KEY `FKrfyp6rfnp6e6r2mgv6y1ahgin` (`class_id`),
  KEY `FKriucnk3m7hsvjnwtdxxoqp5l8` (`lecture_id`),
  KEY `FKiyf57dy48lyiftdrf7y87rnxi` (`user_id`),
  CONSTRAINT `FKiyf57dy48lyiftdrf7y87rnxi` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FKrfyp6rfnp6e6r2mgv6y1ahgin` FOREIGN KEY (`class_id`) REFERENCES `dclass` (`class_id`),
  CONSTRAINT `FKriucnk3m7hsvjnwtdxxoqp5l8` FOREIGN KEY (`lecture_id`) REFERENCES `lecture` (`lecture_id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
INSERT INTO `review` VALUES (1,_binary '',1,5,1,13,'2024-08-12 13:12:21.078011','2024-08-12 13:21:29.840108','너무 좋아요!'),(1,_binary '',1,5,2,13,'2024-08-12 13:12:25.701352','2024-08-12 13:12:35.618481','너무 좋아요!'),(1,_binary '',17,4,3,13,'2024-08-12 17:51:44.141613','2024-08-12 18:26:21.050377','좋아요 '),(1,_binary '\0',15,5,4,13,'2024-08-12 18:26:35.352943','2024-08-12 18:26:35.352943','좋아요 '),(4,_binary '',22,5,5,13,'2024-08-12 18:42:51.186989','2024-08-12 23:39:28.327368','좋아요~~'),(1,_binary '\0',1,5,7,13,'2024-08-12 18:46:35.414376','2024-08-12 18:46:35.414376','ㅇㅇㅇㅇ'),(1,_binary '',17,3,8,13,'2024-08-12 18:52:14.231956','2024-08-12 20:22:30.208246','왜안돼'),(1,_binary '',14,0,9,13,'2024-08-12 20:24:14.506781','2024-08-12 20:24:39.694698','재밌다'),(4,_binary '\0',26,5,10,13,'2024-08-13 00:13:10.609546','2024-08-13 00:13:10.609546','밥 굳'),(1,_binary '',17,5,11,13,'2024-08-13 08:46:54.161767','2024-08-13 08:46:54.161767','1234'),(14,_binary '\0',27,5,12,30,'2024-08-13 17:25:55.916293','2024-08-13 17:28:41.276135','강의 중 강사님께 궁금한점을 여쭈어봤는데 친절하게 답변해주셨고 비즈발이 너무 이쁩니다.'),(14,_binary '\0',27,5,13,62,'2024-08-13 17:31:05.848688','2024-08-14 09:12:20.644824','강의 내용이 너무 빨라요... 요약본 보고 일단 복습해볼게요!'),(14,_binary '\0',29,4,14,30,'2024-08-13 18:34:35.015692','2024-08-13 18:35:03.763380','강사님은 친절한데 비즈의 구성이 별로 알차지 않았어요.'),(19,_binary '\0',31,5,15,30,'2024-08-14 09:12:00.768193','2024-08-14 09:12:00.768193','백쌤 덕분에 재미있는 경험 했습니다!'),(32,_binary '\0',34,5,16,81,'2024-08-14 09:17:10.923862','2024-08-14 09:17:10.923862','수업을 듣고 만든 썬캐처가 제 공간에 색다른 반전이 되었어요! 완전 럭키비키자나!'),(14,_binary '\0',27,5,17,86,'2024-08-14 12:48:52.095271','2024-08-14 12:48:52.095271','너무 좋았습니다~ 감사합니다!!');
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-16  0:28:17
