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
-- Table structure for table `kit`
--

DROP TABLE IF EXISTS `kit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kit` (
  `file_id` int DEFAULT NULL,
  `kit_id` int NOT NULL AUTO_INCREMENT,
  `kit_explanation` varchar(255) DEFAULT NULL,
  `kit_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`kit_id`),
  KEY `FKppi2vvobdq19ssk2enj9it9i` (`file_id`),
  CONSTRAINT `FKppi2vvobdq19ssk2enj9it9i` FOREIGN KEY (`file_id`) REFERENCES `file` (`file_id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kit`
--

LOCK TABLES `kit` WRITE;
/*!40000 ALTER TABLE `kit` DISABLE KEYS */;
INSERT INTO `kit` VALUES (3,1,'ㅌㅅㅌ','ㅌㅅㅌ'),(5,2,'밀가루','KIT'),(7,3,'fdsafs','ddsaf'),(11,4,'쌀','KIT'),(14,5,'뜨개질 키트','뜨개질 키트'),(19,6,'라탄, 환심,가위,송곳 모두 포함되어 구성된 키트입니다.','라탄 미니채반 키트'),(28,7,'수업재료(가위, 송곳,줄자, 분무기, 환심, 수업자료,합판) 모두 포함된 가격입니다.','라탄 캐릭터 저금통 키트'),(30,8,'수업재료(가위, 송곳,줄자, 분무기, 환심, 수업자료,합판) 모두 포함된 가격입니다.','라탄 캐릭터 저금통 키트'),(35,9,'수업시 필요한 환심, 합판, 가위, 송곳 함께 포함','라탄 휴지케이스 만들기 키트'),(40,10,'앙금, 식용 색소, 케이크 시트, 버터크림, 파이핑 백, 팁이 포함되어 있습니다.\n','앙금 플라워 케이크 키트'),(48,11,'커비 펜던트, 과일비즈, 6mm 색깔비즈, 6mm 투명비즈,\n\n키링고리(D고리), 6mm 오링 2개, 2mm 누름볼 3개 이상, 올챙이캡 1개,\n\n우레탄줄, 6mm 꽃비즈 1개(필수X) ','커비 비즈키링'),(74,12,'향수 베이스, 프래그런스 오일, 향수 공병, 시향지, 스티커','향수 키트'),(94,13,'에센셜 오일, 왁스, 비즈','방향제 키트'),(100,14,'비즈발 (10색 * 50개)\n\n족자봉, 클립','비즈발 키트'),(118,15,'도구 : 핫플레이트, 저울, 온도계, 비커\n\n재료 : 컨테이너용 왁스(네이쳐왁스), 향료, 염료, 심지, 심지 탭, 심지 탭 스티커, 용기, 나무젓가락','커스텀 캔들 키트'),(153,16,'연습용 가죽\n트레이 재료\n지퍼클러치 재료 : 가죽, 패턴, 연습용 지퍼, 실전용 지퍼, 슬라이더, 상하도메 2세트, 지퍼탭, 린카블레 린넨실, 페니체 엣지페인트\n토트백 재료 : 가죽, 패턴, 린카블레 린넨실, 페니체 엣지페인트\n미니 스퀘어백 재료: 가죽, 패턴, 락장식, 터널장식 2개, 린카블레 린넨실, 페니체 엣지페인트\n버클 스트랩 재료 : 재단된 가죽, 버클\n웨빙 스트랩 재료','가죽과 부자재'),(167,17,'모시 원단\n\n낚싯줄\n\n비즈 ( 취향껏 )\n\n동판( 선택 )\n\n실과 바늘 그리고 가위','모시 비즈 모빌 키트'),(173,18,'연습용 가죽, 트레이 재료, 지퍼클러치 재료 : 가죽, 패턴, 연습용 지퍼, 실전용 지퍼, 슬라이더, 상하도메 2세트, 지퍼탭, 린카블레 린넨실, 페니체 엣지페인트, 토트백 재료 : 가죽, 패턴, 린카블레 린넨실, 페니체 엣지페인트, 미니 스퀘어백 재료: 가죽, 패턴, 락장식, 터널장식 2개, 린카블레 린넨실, 페니체 엣지페인트, 버클 스트랩 재료 : 재단된 가죽, 버클, 웨빙 스트랩 재료','가죽과 부자재'),(182,19,'계란\n설탕\n핫초코가루\n데코용 딸기','브라우니 재료'),(189,20,'재료\n식빵\n치즈\n슬라이스햄\n계란\n빵가루\n파슬리가루\n\n딸기잼\n머스타드소스\n슈가파우더','몬테크리스토 재료'),(194,21,'면사, 마닐라 로프, 나일론 끈(가위 불포함)','마크라메 키트'),(199,22,'블럭, 호환 피규어, 부자재','레고 키링'),(205,23,'딸기\n찹쌀가루\n설탕 / 소금\n뜨거운 물\n팥앙금\n옥수수전분가루','딸기 앙금 모찌 재료'),(212,24,'비누베이스, 베이킹소다','제로웨이스트 비누 키트'),(216,25,'캔들 틀, 왁스, 심지, 꽃','플라워 캔들 키트'),(221,26,'속파우치, 목봉, 투톤 우동끈','투톤 마크라메 네트백 키트'),(226,27,'코바늘, 돗바늘은 별도로 준비하셔야합니다.','실'),(231,28,'배쓰밤 500g & 배쓰솔트 300g','배쓰밤 키트'),(234,29,'마사토, 숯\n흙과 돌, 유목\n이끼 후마타 고사리\n모래 자갈\n피규어','테라리움 키트'),(239,30,'양말을 만들때 발생되는 짜투리 천을 이용한 공예 입니다.\n양말목의 색은 항상 다릅니다.(랜덤색상)','양말목 키트'),(243,31,'아크릴 전체 사이즈 :17*02*21(cm)/ 받침대 사이즈 : 17*02*21(cm)/판넬 사이즈 : 13.6*0.5*19(cm)','아크릴 무드등 키트'),(248,32,'다양한 스팽글과 비즈를 사이즈와 컬러','비즈, 스팽글 재료 키트'),(252,33,'링, 비즈, 끈','드림캐쳐 키트'),(257,34,'4색 안료 : RED / CYAN BLUE / YELLOW / GREEN, 펜촉 + 펜대, 스패츌라, 나이프, 파레트, 에탄올, 펜 전용 오일, 면봉 2종\n\n(안료와 오일은 공병의 1/3 정도 담겨 발송 됩니다.)','글라스 페인팅 키트'),(262,35,'4색 안료 : RED / CYAN BLUE / YELLOW / GREEN, 펜촉 + 펜대, 스패츌라, 나이프, 파레트, 에탄올, 펜 전용 오일, 면봉 2종 (안료와 오일은 공병의 1/3 정도 담겨 발송 됩니다.)','글라스 페인팅 키트'),(293,36,'패턴과 원단, 한복부자재와 함께 바느질 기본 도구까지 모두 들어 있습니다.','올인원 키트');
/*!40000 ALTER TABLE `kit` ENABLE KEYS */;
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
