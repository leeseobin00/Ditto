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
-- Table structure for table `refund`
--

DROP TABLE IF EXISTS `refund`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `refund` (
  `refund_id` int NOT NULL AUTO_INCREMENT,
  `refund` varchar(3000) DEFAULT NULL,
  PRIMARY KEY (`refund_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `refund`
--

LOCK TABLES `refund` WRITE;
/*!40000 ALTER TABLE `refund` DISABLE KEYS */;
INSERT INTO `refund` VALUES (1,'단순 변심, 착오 구매에 따른 교환/반품은 상품을 공급받은 날부터 7일 이내에 가능합니다. (배송비 고객 부담)\n단, 일부 제품의 경우 포장을 개봉하였거나 포장이 훼손되어 상품가치가 상실된 경우에는 교환 및 반품이 불가능합니다. (상품 확인을 위하여 포장 훼손한 경우는 제외)\n공급 받으신 상품 내용이 표시, 광고내용과 다르거나 다르게 이행된 경우에는 그 상품을 공급받은 날부터 3개월 이내, 그 사실을 안 날 또는 알 수 있었던 날부터 30일 이내 청약철회가 가능합니다. (배송비 회사 부담)\n교환 및 반품 신청에는 사유에 따라 배송비 3,000~6,000원이 부과됩니다. 이 때 무료배송 혜택을 받은 주문일 경우 왕복 금액을, 배송비를 부담하신 경우 편도 금액을 산정하여 환불 금액에서 차감될 수 있습니다.\n물품 하자에 의한 반송을 제외하고 고객변심에 의한 반품, 교환인 경우 배송비는 고객 부담이며(교환 시 6,000원 / 반품 시 3,000원), 접수 완료일로부터 평일 기준 2~3일 내에 수거가 이루어집니다.\n구매수량 단위로 배송비가 부과된 상품은 교환 및 반품을 희망하실 경우 주문시와 동일하게 구매수량 단위로 회수비를 부과합니다.\n반품 시, 상품대금 환불은 상품 회수 및 청약철회가 확정된 날로부터 3영업일 이내 진행되며, 기한을 초과한 경우 지연 기간에 대하여 「전자상거래 등에서의 소비자보호에 관한 법률 시행령」 에서 정하는 이율을 곱하여 산정한 지연이자를 지급합니다.\n주문취소는 [마이페이지 > 주문/배송조회] 교환/반품은 [마이페이지 > 반품/교환/환불] 또는 고객센터를 통해 신청하실 수 있습니다.\n소비자에게 책임이 있는 사유로 재화등이 멸실되거나 훼손된 경우(재화의 내용을 확인하기 위하여 포장을 훼손한 경우는 제외)\n소비자의 사용 또는 일부 소비로 재화등의 가치가 현저히 감소한 경우\n시간이 지나 다시 판매하기 곤란할 정도로 재화등의 가치가 현저히 감소한 경우\n복제가 가능한 재화등의 포장을 훼손한 경우\n소비자의 주문에 따라 개별적으로 생산되는 재화등 또는 이와 유사한 재화등에 대하여 청약철회등을 인정하는 경우 통신판매업자에게 회복할 수 없는 중대한 피해가 예상되는 경우로서 사전에 해당 거래에 대하여 별도로 그 사실을 고지하고 소비자의 서면(전자문서 포함)에 의한 동의를 받은 경우');
/*!40000 ALTER TABLE `refund` ENABLE KEYS */;
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
