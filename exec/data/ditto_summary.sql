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
-- Table structure for table `summary`
--

DROP TABLE IF EXISTS `summary`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `summary` (
  `lecture_id` int DEFAULT NULL,
  `step_id` int DEFAULT NULL,
  `summary_id` int NOT NULL AUTO_INCREMENT,
  `summary_content` varchar(2000) DEFAULT NULL,
  PRIMARY KEY (`summary_id`),
  KEY `FKiklnckewrol5bydpqlp2cf9bc` (`lecture_id`),
  KEY `FKd2ersp54hovr7a0gplc25g5py` (`step_id`),
  CONSTRAINT `FKd2ersp54hovr7a0gplc25g5py` FOREIGN KEY (`step_id`) REFERENCES `step` (`step_id`),
  CONSTRAINT `FKiklnckewrol5bydpqlp2cf9bc` FOREIGN KEY (`lecture_id`) REFERENCES `lecture` (`lecture_id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `summary`
--

LOCK TABLES `summary` WRITE;
/*!40000 ALTER TABLE `summary` DISABLE KEYS */;
INSERT INTO `summary` VALUES (29,31,15,'안녕하세요. 오늘은 비즈발 만들기를 진행합니다. 첫 번째 단계는 도안을 고르는 것으로, 비즈발의 사이즈를 결정 후 해당 사이즈에 맞는 도안을 신중히 선택해야 합니다. 다양한 도안이 있으니 원하는 스타일에 맞춰 선택하고 작업을 시작하세요.'),(29,32,16,'다음 단계는 비즈를 정리하고 구성하는 것입니다. 선택한 도안에 따라 필요한 비즈를 준비해주세요. 각자 받은 키트를 확인하고 비즈 개수와 클립에 잘 끼워지는지 점검한 후 상태를 표시해주세요. 모든 수강생이 완료하면 다음 단계로 진행하겠습니다.'),(29,33,17,'다음 단계는 커스텀 단계입니다. 비즈를 실에 꿰어 순서대로 끼워주세요. 꿰는 과정에서 도안의 순서와 일치하도록 정확성을 유지하는 것이 중요합니다. 각자 5분의 시간을 갖고 한번 진행해 보세요. 완료된 수강생은 비즈의 모습과 함께 상태 표시를 해주세요. 이상으로 오늘의 수업을 마치겠습니다. 감사합니다.'),(27,31,18,'안녕하세요, 오늘 비즈발 만들기 수업에 오신 것을 환영합니다. 첫 번째 단계는 도안을 선택하는 것입니다. 먼저, 만들고자 하는 비즈발의 크기와 스타일을 결정하세요. 다양한 도안이 준비되어 있으니, 본인의 취향과 만들고자 하는 비즈발의 크기에 맞는 도안을 신중하게 선택해 주세요. 선택한 도안이 오늘 작업에 잘 맞는지 확인한 후, 본격적인 제작을 시작하겠습니다.'),(27,32,19,'비즈를 정리하고 준비하는 단계입니다. 선택한 도안을 바탕으로 필요한 비즈를 준비해주세요. 각자 받은 키트에 들어있는 비즈의 색상과 개수를 확인하고, 도안에 맞게 정리하세요. 비즈가 클립에 잘 끼워지는지, 손상된 부분은 없는지 점검한 후 상태를 표시해 주세요.'),(27,33,20,'커스텀하는 단계입니다. 준비한 비즈를 실에 하나씩 꿰어 주세요. 이때, 도안의 순서에 맞게 비즈를 정확하게 배열하는 것이 중요합니다. 중간에 실수하지 않도록 주의하면서 작업하세요.'),(35,20,25,'안녕하세요 좋은 하루입니다. 우선, 우레탄줄 두 개에 각각 누름볼을 하나씩 끼워주세요. 누름볼을 줄에 고정할 위치를 정한 후, 납작하게 눌러 단단히 고정합니다. 누름볼이 확실히 고정되었는지 확인하세요.'),(35,21,26,'이제 비즈를 줄에 끼워 디자인을 구성해보세요. 현재는 마감 전 단계로, 원하는 대로 디자인을 자유롭게 변경할 수 있는 시간이 주어집니다. 비즈의 배열을 신중하게 고려하며, 마음에 드는 패턴을 완성해보세요.'),(35,22,27,'비즈를 원하는 대로 배열했다면, 꽃비즈 또는 올챙이캡을 사용하여 우레탄줄 두 개를 한꺼번에 통과시켜 마감합니다. 이 단계는 비즈의 배열을 고정하고, 전체 작품의 완성도를 높여줍니다.'),(35,23,28,'마지막으로, 올챙이캡 밖으로 튀어나온 줄을 잘라 깔끔하게 정리해줍니다. 그런 다음, 집게를 이용해 캡을 단단히 닫아 마무리하세요. 이로써 비즈발이 완성됩니다. 줄이 느슨하지 않도록 확인하는 것도 잊지 마세요. 이상으로 오늘 강의를 마무리하겠습니다.'),(53,3,29,'\'{\"originText\":\"\"}\''),(62,93,30,'\'{\"originText\":\"\"}\''),(62,94,31,'커스텀 하기 커스'),(62,95,32,'이'),(66,11,33,'\"오 빠른데 이제 됐다. 저거 몇 번째 스타일인지 다 뜨고, 타이머도 안 들려. 소리 안 켜 놨는데.\"'),(66,12,34,'여기 요약된 건가요 생각보다 정확하고'),(66,13,35,'안 했는데');
/*!40000 ALTER TABLE `summary` ENABLE KEYS */;
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
