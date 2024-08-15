# 베이스 이미지로 JDK 17을 사용
FROM openjdk:17-jdk-alpine

# 작업 디렉토리 설정
WORKDIR /app

# Gradle Wrapper 스크립트와 설정 파일 복사
COPY gradlew .
COPY gradle ./gradle
COPY build.gradle settings.gradle ./

# 실행 권한 설정
RUN chmod +x gradlew

# 소스 코드 복사
COPY src ./src

# Gradle 빌드 실행
RUN ./gradlew build -x test

# JAR 파일 실행
COPY build/libs/*.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
