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
-- Table structure for table `learning`
--

DROP TABLE IF EXISTS `learning`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `learning` (
  `class_id` int DEFAULT NULL,
  `learning_id` int NOT NULL AUTO_INCREMENT,
  `lecture_id` int DEFAULT NULL,
  `liveroom_id` int DEFAULT NULL,
  `student_id` int NOT NULL,
  `teacher_id` int NOT NULL,
  PRIMARY KEY (`learning_id`),
  KEY `FKo8cea5bdk0vobyqyiv5986ijd` (`class_id`),
  KEY `FKmr7vxlmf4rldm7q3llyd0c6yv` (`lecture_id`),
  KEY `FKq5uoh3ycadxhmug3ge0awjm4u` (`liveroom_id`),
  KEY `FK1ua00lb5k9pwl8isd6mord4gt` (`student_id`),
  KEY `FK1te0sg7hlbpn20x6t6ua4f90p` (`teacher_id`),
  CONSTRAINT `FK1te0sg7hlbpn20x6t6ua4f90p` FOREIGN KEY (`teacher_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FK1ua00lb5k9pwl8isd6mord4gt` FOREIGN KEY (`student_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FKmr7vxlmf4rldm7q3llyd0c6yv` FOREIGN KEY (`lecture_id`) REFERENCES `lecture` (`lecture_id`),
  CONSTRAINT `FKo8cea5bdk0vobyqyiv5986ijd` FOREIGN KEY (`class_id`) REFERENCES `dclass` (`class_id`),
  CONSTRAINT `FKq5uoh3ycadxhmug3ge0awjm4u` FOREIGN KEY (`liveroom_id`) REFERENCES `live_room` (`liveroom_id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `learning`
--

LOCK TABLES `learning` WRITE;
/*!40000 ALTER TABLE `learning` DISABLE KEYS */;
INSERT INTO `learning` VALUES (1,1,1,NULL,13,4),(1,7,14,NULL,13,4),(1,8,15,NULL,13,4),(1,10,17,NULL,13,4),(4,11,19,NULL,15,23),(4,15,22,NULL,13,23),(4,16,22,NULL,29,23),(4,17,22,NULL,20,23),(4,18,22,NULL,20,23),(4,19,26,NULL,13,23),(14,20,27,NULL,30,10),(14,21,27,NULL,61,10),(14,22,27,NULL,86,10),(14,23,27,NULL,62,10),(14,24,29,NULL,86,10),(14,25,29,NULL,30,10),(14,26,29,NULL,62,10),(19,27,31,NULL,30,25),(32,29,34,NULL,81,10),(11,30,35,NULL,42,11),(11,31,35,NULL,62,11),(11,32,35,NULL,70,11),(11,33,35,NULL,76,11),(28,34,39,NULL,14,5),(9,35,48,NULL,90,4),(14,36,53,NULL,65,10),(14,37,53,NULL,66,10),(14,38,53,NULL,67,10),(14,39,53,NULL,30,10),(29,40,57,NULL,30,11),(14,41,58,NULL,82,10),(14,42,58,NULL,62,10),(14,43,59,NULL,22,10),(14,44,59,NULL,62,10),(12,45,61,NULL,38,12),(12,46,61,NULL,61,12),(31,47,62,NULL,62,12),(31,48,62,NULL,38,12),(14,49,63,NULL,62,10),(14,50,64,NULL,62,10);
/*!40000 ALTER TABLE `learning` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-16  0:28:18
