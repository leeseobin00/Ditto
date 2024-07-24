# 베이스 이미지로 JDK 17을 사용
FROM openjdk:17-jdk-alpine

# 작업 디렉토리 설정
WORKDIR /app

# Gradle 빌드 실행
COPY build.gradle settings.gradle ./
COPY src ./src
RUN ./gradlew build -x test

# JAR 파일 실행
COPY build/libs/*.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
