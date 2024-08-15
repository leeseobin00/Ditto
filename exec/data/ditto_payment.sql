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
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment` (
  `is_canceled` bit(1) DEFAULT NULL,
  `is_pay_success` bit(1) DEFAULT NULL,
  `lecture_id` int DEFAULT NULL,
  `payment_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `pay_amount` bigint NOT NULL,
  `pay_cancel_time` datetime(6) DEFAULT NULL,
  `pay_time` datetime(6) DEFAULT NULL,
  `cancel_reason` varchar(255) DEFAULT NULL,
  `fail_reason` varchar(255) DEFAULT NULL,
  `order_id` varchar(255) NOT NULL,
  `pay_name` varchar(255) NOT NULL,
  `payment_key` varchar(255) DEFAULT NULL,
  `pay_type` enum('CARD','CASH','POINT') NOT NULL,
  PRIMARY KEY (`payment_id`),
  KEY `FK1igqa193mhjr912q4kcnsyoqu` (`lecture_id`),
  KEY `FK4spfnm9si9dowsatcqs5or42i` (`user_id`),
  CONSTRAINT `FK1igqa193mhjr912q4kcnsyoqu` FOREIGN KEY (`lecture_id`) REFERENCES `lecture` (`lecture_id`),
  CONSTRAINT `FK4spfnm9si9dowsatcqs5or42i` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment`
--

LOCK TABLES `payment` WRITE;
/*!40000 ALTER TABLE `payment` DISABLE KEYS */;
INSERT INTO `payment` VALUES (_binary '\0',_binary '',1,1,13,4234,NULL,'2024-08-12 10:31:22.000000',NULL,NULL,'7bf9b4e0-6ce8-462f-bd5e-679e3bad20c6','íì¤í¸','tviva20240812103103o3uN1','CARD'),(_binary '',_binary '',3,2,13,4234,'2024-08-12 11:02:38.144821','2024-08-12 10:31:48.000000','사용자 요청에 의한 취소',NULL,'5dadfeda-21d7-437d-84f6-632884a0d085','íì¤í¸','tviva20240812103131k1J93','CARD'),(_binary '',_binary '',4,3,13,4234,'2024-08-12 10:36:09.319733','2024-08-12 10:32:16.000000','사용자 요청에 의한 취소',NULL,'43ee14a7-316c-43b1-a28c-21b552583625','íì¤í¸','tviva20240812103201jhx82','CARD'),(_binary '',_binary '',5,4,13,4234,'2024-08-12 10:49:39.808488','2024-08-12 10:32:45.000000','사용자 요청에 의한 취소',NULL,'262ffd77-189e-4d1f-86ba-53824775c634','íì¤í¸','tviva20240812103224jhAA6','CARD'),(_binary '\0',_binary '',14,7,13,4234,NULL,'2024-08-12 13:46:44.000000',NULL,NULL,'41d3e72d-a49f-4ccb-a414-13feff3ffb71','íì¤í¸','tviva20240812134628dNyC2','CARD'),(_binary '\0',_binary '',15,8,13,4234,NULL,'2024-08-12 13:47:12.000000',NULL,NULL,'13d87998-54f0-466b-93db-2fad8bd617c8','íì¤í¸','tviva20240812134656ikVU0','CARD'),(_binary '',_binary '',16,9,13,4234,'2024-08-12 13:52:07.553811','2024-08-12 13:47:43.000000','사용자 요청에 의한 취소',NULL,'29be9445-486b-47d4-8ef2-048124f8fd7f','íì¤í¸','tviva20240812134730dNIl5','CARD'),(_binary '\0',_binary '',17,10,13,4234,NULL,'2024-08-12 13:48:10.000000',NULL,NULL,'aedb1f2e-6866-4242-a8d0-33b6bab6d203','íì¤í¸','tviva202408121347568uUV9','CARD'),(_binary '\0',_binary '',19,11,15,23000,NULL,'2024-08-12 14:17:46.000000',NULL,NULL,'e5835137-4722-48c2-8e33-40db47b05472','ë°¥','tviva202408121417283Jlu2','CARD'),(_binary '\0',_binary '',22,15,13,23000,NULL,'2024-08-12 17:05:58.000000',NULL,NULL,'91bc725c-7f70-488b-9305-c9d5651056ad','ë°¥','tviva2024081217054138H31','CARD'),(_binary '\0',_binary '',22,16,29,23000,NULL,'2024-08-12 17:06:20.000000',NULL,NULL,'8f3c0950-dbb8-42f8-b2e3-4e289d0d0054','ë°¥','tviva20240812170603gnvT9','CARD'),(_binary '\0',_binary '',22,17,20,23000,NULL,'2024-08-12 17:06:53.000000',NULL,NULL,'313ac0bc-9e38-4913-b63b-ab7e8da09768','ë°¥','tviva20240812170636Xngn7','CARD'),(_binary '\0',_binary '',22,18,20,23000,NULL,'2024-08-12 17:08:07.000000',NULL,NULL,'d938552a-c7f9-4562-a4e8-3d1991a4e3fb','ë°¥','tviva20240812170743391V5','CARD'),(_binary '\0',_binary '',26,19,13,23000,NULL,'2024-08-12 22:08:16.000000',NULL,NULL,'db4c87d0-f1f5-4a38-8e4e-7f3f22e55856','ë°¥','tviva202408122207534kuO0','CARD'),(_binary '\0',_binary '',27,20,30,27000,NULL,'2024-08-13 14:46:44.000000',NULL,NULL,'f8caa4ba-f3b9-4a53-b69b-a98a2fb2f43f','ë¹ì¦ë° ë§ë¤ê¸°','tviva20240813144622gOu88','CARD'),(_binary '\0',_binary '',27,21,61,27000,NULL,'2024-08-13 14:48:06.000000',NULL,NULL,'581a9456-ee3f-40f9-9acc-81f64c63b239','ë¹ì¦ë° ë§ë¤ê¸°','tviva202408131447338wYo2','CARD'),(_binary '\0',_binary '',27,22,86,27000,NULL,'2024-08-13 14:52:51.000000',NULL,NULL,'4fc77216-8aa8-4a7e-a5ac-041ac7f6a7cc','ë¹ì¦ë° ë§ë¤ê¸°','tviva202408131452218xGb7','CARD'),(_binary '\0',_binary '',27,23,62,27000,NULL,'2024-08-13 14:57:01.000000',NULL,NULL,'16d51277-c931-4372-8b58-fa10b9111d92','ë¹ì¦ë° ë§ë¤ê¸°','tviva20240813145626gPWf5','CARD'),(_binary '\0',_binary '',29,24,86,27000,NULL,'2024-08-13 15:50:59.000000',NULL,NULL,'96bfc1b0-5779-4201-aab2-78f8d730bea9','ë¹ì¦ë° ë§ë¤ê¸°','tviva2024081315504148YQ4','CARD'),(_binary '\0',_binary '',29,25,30,27000,NULL,'2024-08-13 15:51:07.000000',NULL,NULL,'cabadebf-fd72-4b59-9c95-e35878c2bbf3','ë¹ì¦ë° ë§ë¤ê¸°','tviva2024081315504548Zz9','CARD'),(_binary '\0',_binary '',29,26,62,27000,NULL,'2024-08-13 15:51:09.000000',NULL,NULL,'476bb4a4-f177-47b7-a02a-2f23812bd467','ë¹ì¦ë° ë§ë¤ê¸°','tviva2024081315503548Y35','CARD'),(_binary '\0',_binary '',31,27,30,13000,NULL,'2024-08-13 18:15:57.000000',NULL,NULL,'17f77362-a5e2-47bd-9baf-86b29ffb8216','[ë¸ì¤ë¸ë² ì´ì»¤ë¦¬] ì´ê°ë¨ ë¸ë¼ì°ë í´ëì¤','tviva20240813181539bHV06','CARD'),(_binary '',_binary '',33,28,30,23000,'2024-08-13 18:34:06.972931','2024-08-13 18:21:01.000000','사용자 요청에 의한 취소',NULL,'dc44ca1f-c860-403e-992c-1a413a14ddcb','ëë§ì í¥ì ë§ë¤ê¸° í´ëì¤','tviva20240813182042bIHu2','CARD'),(_binary '\0',_binary '',34,29,81,31000,NULL,'2024-08-13 21:27:55.000000',NULL,NULL,'29985bcf-66e4-4c40-aad2-ac73a0c9e61b','ë´ ê³µê°ì ë°ì  í¬ì¸í¸, ì¬ìºì² ë§ë¤ê¸°','tviva20240813212719XU9Q4','CARD'),(_binary '\0',_binary '',35,30,42,28000,NULL,'2024-08-14 09:13:49.000000',NULL,NULL,'2aaef023-0bd5-469a-8154-2760807453e4','ì»¤ë¹ ë¹ì¦ í¤ë§ ë§ë¤ê¸°','tviva20240814091325biWM6','CARD'),(_binary '\0',_binary '',35,31,62,28000,NULL,'2024-08-14 09:14:43.000000',NULL,NULL,'d85d4b62-6be1-4ada-b0ca-bf7b0ef3bff2','ì»¤ë¹ ë¹ì¦ í¤ë§ ë§ë¤ê¸°','tviva202408140914278CP82','CARD'),(_binary '\0',_binary '',35,32,70,28000,NULL,'2024-08-14 09:16:51.000000',NULL,NULL,'a9ae4dfe-c8a0-42ff-8f38-668c7ba45263','ì»¤ë¹ ë¹ì¦ í¤ë§ ë§ë¤ê¸°','tviva202408140916358D7r7','CARD'),(_binary '\0',_binary '',35,33,76,28000,NULL,'2024-08-14 09:18:18.000000',NULL,NULL,'aa27b7ee-c3a0-4e6a-879c-de2e263cddb2','ì»¤ë¹ ë¹ì¦ í¤ë§ ë§ë¤ê¸°','tviva202408140918058Dk40','CARD'),(_binary '\0',_binary '',39,34,14,41000,NULL,'2024-08-14 11:17:57.000000',NULL,NULL,'27c456e1-7063-4f52-aa07-94553da4b5c0','ë³´ê¸ë³´ê¸ ëë§ì ë°°ì°ë°¤ ë§ë¤ê¸°','tviva202408141117318Wp02','CARD'),(_binary '\0',_binary '',48,35,90,43000,NULL,'2024-08-14 12:53:16.000000',NULL,NULL,'1cc0ea00-c5cf-419e-9d70-915cc074ba64','ë¼í í´ì§ ì¼ì´ì¤ ë§ë¤ê¸°','tviva20240814125259XDiJ7','CARD'),(_binary '\0',_binary '',53,36,65,27000,NULL,'2024-08-14 14:56:08.000000',NULL,NULL,'12abbb6b-59d9-471d-8613-de4a1b17fabb','ë¹ì¦ë° ë§ë¤ê¸°','tviva202408141455513G2e6','CARD'),(_binary '\0',_binary '',53,37,66,27000,NULL,'2024-08-14 14:57:17.000000',NULL,NULL,'260ab09a-8fc1-488f-8ae2-2a0b5a7098de','ë¹ì¦ë° ë§ë¤ê¸°','tviva20240814145643XWfX1','CARD'),(_binary '\0',_binary '',53,38,67,27000,NULL,'2024-08-14 14:58:53.000000',NULL,NULL,'d76ed950-1fc9-48a0-bac1-60f4c949dac2','ë¹ì¦ë° ë§ë¤ê¸°','tviva20240814145822XWuW0','CARD'),(_binary '\0',_binary '',53,39,30,27000,NULL,'2024-08-14 15:20:30.000000',NULL,NULL,'7edfb30d-42f8-4572-a535-711b9028f6f6','ë¹ì¦ë° ë§ë¤ê¸°','tviva20240814151821beUn1','CARD'),(_binary '\0',_binary '',57,40,30,38000,NULL,'2024-08-14 15:48:55.000000',NULL,NULL,'abfb3dba-f7ad-49cc-b338-4d106c2c5f21','ë¹ì ì ë§ìì ë´ì íë¼ë¦¬ì ìë°ì´í´ëì¤','tviva20240814154833gVuJ3','CARD'),(_binary '\0',_binary '',58,41,82,27000,NULL,'2024-08-14 16:44:45.000000',NULL,NULL,'d1038317-b196-4c53-8307-d11f3b7b0aa9','ë¹ì¦ë° ë§ë¤ê¸°','tviva202408141644274eYV3','CARD'),(_binary '\0',_binary '',58,42,62,27000,NULL,'2024-08-14 16:44:55.000000',NULL,NULL,'cca005a4-a307-4210-acae-94305dc6b8c2','ë¹ì¦ë° ë§ë¤ê¸°','tviva20240814164432g46b9','CARD'),(_binary '\0',_binary '',59,43,22,27000,NULL,'2024-08-14 17:05:07.000000',NULL,NULL,'b2ba44c5-cb20-48c0-924a-808d143f8c70','ë¹ì¦ë° ë§ë¤ê¸°','tviva202408141704483Zyn5','CARD'),(_binary '\0',_binary '',59,44,62,27000,NULL,'2024-08-14 17:05:16.000000',NULL,NULL,'eada2672-9023-41a8-b41e-9826596e49c5','ë¹ì¦ë° ë§ë¤ê¸°','tviva202408141705003ZAd9','CARD'),(_binary '\0',_binary '',61,45,38,23000,NULL,'2024-08-14 17:17:44.000000',NULL,NULL,'9eaedbb3-9019-4b4f-a6be-75c50ccdcd86','ëë§ì í¥ì ë§ë¤ê¸° í´ëì¤','tviva20240814171729bxoR3','CARD'),(_binary '\0',_binary '',61,46,61,23000,NULL,'2024-08-14 17:17:59.000000',NULL,NULL,'28b224f7-6631-414e-97f1-8c2ad9885cf4','ëë§ì í¥ì ë§ë¤ê¸° í´ëì¤','tviva2024081417173331QV5','CARD'),(_binary '\0',_binary '',62,47,62,23000,NULL,'2024-08-14 17:26:01.000000',NULL,NULL,'e7fe9ce9-6f17-4f0d-a149-81a8e75516a8','ì ë¬¼íê¸° ì¢ì ê°ì± ë¬´ëë± í´ëì¤','tviva20240814172545gb0l5','CARD'),(_binary '\0',_binary '',62,48,38,23000,NULL,'2024-08-14 17:26:03.000000',NULL,NULL,'96eba58d-b9de-4a7c-aacf-96f2e7aeacad','ì ë¬¼íê¸° ì¢ì ê°ì± ë¬´ëë± í´ëì¤','tviva20240814172547byNx7','CARD'),(_binary '\0',_binary '',63,49,62,27000,NULL,'2024-08-14 18:02:07.000000',NULL,NULL,'5396f4fc-4941-4fcf-9f3c-1bb4816eb7a1','ë¹ì¦ë° ë§ë¤ê¸°','tviva2024081418014239lR1','CARD'),(_binary '\0',_binary '',64,50,62,27000,NULL,'2024-08-14 18:04:19.000000',NULL,NULL,'01d1594f-b57b-4da3-b5ad-318fc1c7b00d','ë¹ì¦ë° ë§ë¤ê¸°','tviva2024081418040739Lt9','CARD'),(_binary '',_binary '',66,51,105,48000,'2024-08-15 19:58:54.905621','2024-08-15 19:54:42.000000','사용자 요청에 의한 취소',NULL,'d5941914-99be-48b2-99f7-0f5014a18365','ìºë¦­í° ë¼íì ê¸íµ ë§ë¤ê¸°','tviva20240815195335bGyg2','CARD');
/*!40000 ALTER TABLE `payment` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-16  0:28:11
