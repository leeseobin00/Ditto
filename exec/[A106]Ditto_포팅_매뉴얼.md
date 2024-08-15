# Ditto_포팅_매뉴얼


## 목차

[1. 개발 환경](https://www.notion.so/Ditto_-_-41ec60134c354db0a0d9c14ca4223c16?pvs=21)

[2. 빌드 시 사용되는 환경 변수](https://www.notion.so/Ditto_-_-41ec60134c354db0a0d9c14ca4223c16?pvs=21)

[3. 배포 시 특이사항 기재](https://www.notion.so/Ditto_-_-41ec60134c354db0a0d9c14ca4223c16?pvs=21)

[4. DB 접속 정보](https://www.notion.so/Ditto_-_-41ec60134c354db0a0d9c14ca4223c16?pvs=21)

[5. 외부 서비스 정보](https://www.notion.so/Ditto_-_-41ec60134c354db0a0d9c14ca4223c16?pvs=21)

## 1. 개발 환경

### Infra

- AWS EC2
- ubuntu 20.04
- JVM: OpenJDK 17
- 웹서버: nginx version: nginx/1.18.0
- WAS (Web Application Server): Tomcat

### Backend

- Java: `OpenJDK 17`
- Spring Boot: `3.3.1`
- Spring Dependency Management: `1.1.5`
- Build Tool: `Gradle`
- IntelliJ IDEA: 2024.1.4

- 추가적인 정보
    - Lombok: `1.18.24`
    - DevTools: `3.3.1`
    - JUnit: `5.0.3`
    - JUnit Platform Runner: Latest compatible version
    - WebDriverManager: `2.2.0`
    - Selenium Jupiter: `3.1.0`
    - Google Cloud Speech: `4.41.0`
    - Gson: `2.8.9`
    - JSON Simple: `1.1.1`
    - Spring Batch: `3.3.1`
    - Spring Quartz: `3.3.1`
    - SpringDoc OpenAPI UI: `2.2.0`
    - JJWT API: `0.11.5`
    - JJWT Impl: `0.11.5`
    - JJWT Jackson: `0.11.5`
    - Jakarta Mail API: `2.1.3`
    - WebFlux: `3.3.1`
    - OpenVidU Java Client: `2.30.0`
    - JAVE All Deps: `2.4.6`
    - JAVE Core: `2.4.6`
    - Apache HttpClient: Latest compatible version

### Frontend

- Vite: `^5.3.3`
- React: `^18.3.1`

- 추가적인 정보
    - React DOM: `^18.3.1`
    - React Redux: `^9.1.2`
    - React Router DOM: `^6.24.1`
    - React Scroll: `^1.9.0`
    - React Speech Recognition: `^3.10.0`
    - React Daum Postcode: `^3.1.3`
    - React Icons: `^5.2.1`
    - Styled Components: `^6.1.11`
    - Redux Toolkit: `^2.2.6`
    - Axios: `^1.7.2`
    - js-cookie: `^3.0.5`
    - jwt-decode: `^4.0.0`
    - OpenVidu Browser: `^2.30.0`
    - Quill: `^2.0.2`
    - UUID: `^10.0.0`
    - SweetAlert2: `^11.12.4`
    - @tosspayments/payment-widget-sdk: `^0.11.1`
    - @tosspayments/tosspayments-sdk: `^2.2.4`
    - Regenerator Runtime: `^0.14.1`
    
    DevDependencies
    
    ---
    
    - ESLint: `^8.57.0`
    - ESLint JS: `^9.7.0`
    - ESLint Config Prettier: `^9.1.0`
    - ESLint Plugin Import: `^2.29.1`
    - ESLint Plugin Prettier: `^5.1.3`
    - ESLint Plugin React: `^7.34.4`
    - ESLint Plugin React Hooks: `^4.6.2`
    - ESLint Plugin React Refresh: `^0.4.7`
    - Prettier: `^3.3.3`
    - Globals: `^15.8.0`
    - @types/react: `^18.3.3`
    - @types/react-dom: `^18.3.0`
    - @types/regenerator-runtime: `^0.13.6`
    - @vitejs/plugin-react: `^4.3.1`
    - dotenv: `^16.4.5`
    - @titicaca/eslint-config-triple: `^5.1.1`

### Database

- MySQL : `8.0.38`
- MySQL Workbench: `8.0.CE`

## 2. 빌드 시 사용되는 환경 변수

| DB_PASSWORD | ssafy |
| --- | --- |
| DB_URL | jdbc:mysql://i11a106.p.ssafy.io:3306/ditto |
| DB_USERNAME | test |
| DEVELOPMENT_URL | https://i11a106.p.ssafy.io/ |
| IMG_DIR | /var/image/ |
| PRODUCTION_URL | https://i11a106.p.ssafy.io:5173/ |
| TOSS_CLIENT_KEY | test_ck_5OWRapdA8djBBkmjYKwYVo1zEqZK |
| TOSS_SECRET_KEY | test_sk_DnyRpQWGrNzBm674Y2qlrKwv1M9E |
| OPENAI_API_KEY | sk-svcacct-3J5dL1Fa5pMdrtk6QkZnT3BlbkFJYMc92FtCQKPXoE91LwRD |

## 3. 배포 시 특이사항 기재

### 준비 과정

1. **포트 사용 확인**
현재 사용 중인 모든 포트와 관련된 프로세스를 확인합니다.
    
    ```bash
    sudo netstat -tulnp
    ```
    

### 1. 우분투 시스템 패키지 업데이트

1. **패키지 목록 업데이트**
    
    우분투 시스템의 패키지 목록을 최신 상태로 업데이트합니다. 이 과정은 시스템에 설치된 패키지의 최신 버전을 설치할 수 있도록 합니다.
    
    ```bash
    sudo apt-get update
    ```
    
2. **필수 패키지 설치**
    
    Docker 설치 및 인증서 관리를 위해 필요한 필수 패키지들을 설치합니다.
    
    ```bash
    sudo apt-get install ca-certificates curl
    ```
    
3. **디렉토리 생성**
    
    apt 키링을 저장할 디렉토리를 생성합니다. 이 디렉토리는 Docker의 GPG 키를 저장하는 데 사용됩니다.
    
    ```bash
    sudo install -m 0755 -d /etc/apt/keyrings
    ```
    
    - `m 0755`: 디렉토리의 권한을 `0755`로 설정하여 모든 사용자가 디렉토리에 접근할 수 있도록 합니다.

### 2. Docker의 공식 GPG 키 추가

1. **GPG 키 다운로드 및 저장**
    
    Docker의 공식 GPG 키를 다운로드하여 apt 키링 디렉토리에 저장합니다. 이 GPG 키는 Docker 패키지를 인증하는 데 사용됩니다.
    
    ```bash
    sudo curl -fsSL <https://download.docker.com/linux/ubuntu/gpg> -o /etc/apt/keyrings/docker.asc
    ```
    
2. **GPG 키 파일 권한 설정**
    
    모든 사용자가 GPG 키 파일을 읽을 수 있도록 권한을 설정합니다.
    
    ```bash
    sudo chmod a+r /etc/apt/keyrings/docker.asc
    ```
    

### 3. Docker의 공식 apt 저장소 추가

1. **Docker apt 저장소 추가**
    
    Docker 패키지를 설치하기 위해 Docker의 공식 apt 저장소를 추가합니다. 이 명령어는 우분투 시스템에 Docker의 저장소 주소를 추가하여 Docker 패키지를 설치할 수 있게 합니다.
    
    ```bash
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] <https://download.docker.com/linux/ubuntu> $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    ```
    
2. **패키지 목록 업데이트**
    
    새로 추가된 Docker 저장소를 반영하기 위해 패키지 목록을 업데이트합니다.
    
    ```bash
    sudo apt-get update
    ```
    

### 4. Docker 패키지 설치

1. **Docker 및 관련 패키지 설치**
Docker와 Docker CLI, 컨테이너 런타임, 빌드 및 Compose 플러그인을 설치합니다.
    
    ```bash
    sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
    ```
    

### 5. Docker Compose 설치

1. **Docker Compose 다운로드**
    
    Docker Compose 바이너리를 `/usr/local/bin` 디렉토리에 다운로드합니다. 이 경로는 시스템 전역에서 실행할 수 있도록 설정된 디렉토리입니다.
    
    ```bash
    sudo curl -SL <https://github.com/docker/compose/releases/download/v2.28.1/docker-compose-linux-x86_64> -o /usr/local/bin/docker-compose
    ```
    
2. **Docker Compose 실행 권한 부여**
    
    Docker Compose 파일에 실행 권한을 부여합니다. 이를 통해 명령어로 Docker Compose를 실행할 수 있게 됩니다.
    
    ```bash
    sudo chmod +x /usr/local/bin/docker-compose
    ```
    
3. **Docker Compose 심볼릭 링크 생성**
    
    Docker Compose의 심볼릭 링크를 `/usr/bin` 디렉토리에 생성하여, 명령어로 실행할 수 있도록 설정합니다.
    
    ```bash
    sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
    ```
    
4. **Docker Compose 설치 확인**
    
    Docker Compose가 정상적으로 설치되었는지 확인하기 위해 버전을 출력합니다.
    
    ```bash
    docker-compose -v
    ```
    

### Jenkins 설치 및 실행

1. **Jenkins 컨테이너 실행**
    
    Docker를 사용해 Jenkins를 설치하고 실행합니다. 이 컨테이너는 Jenkins 서버를 실행하며, 여러 마운트된 볼륨과 환경 변수를 사용해 설정됩니다.
    
    ```bash
    docker run -d --name jenkins \\
    -e TZ=Asia/Seoul \\
    -u root \\
    -p 9090:8080 \\
    -v /var/jenkins_home:/var/jenkins_home \\
    -v /var/run/docker.sock:/var/run/docker.sock \\
    -v /usr/bin/docker:/usr/bin/docker \\
    jenkins/jenkins:latest-jdk17
    
    ```
    
2. **Jenkins 컨테이너 실행 확인**
    
    Jenkins 컨테이너가 정상적으로 실행 중인지 확인합니다.
    
    ```bash
    sudo docker ps
    ```
    
    - 실행 중인 모든 Docker 컨테이너의 상태를 확인할 수 있습니다.

### 8. Jenkins 초기 설정

1. **Jenkins 초기 비밀번호 확인**
    
    Jenkins 초기 설정을 위해, Jenkins 컨테이너의 로그에서 초기 관리자 비밀번호를 확인합니다. 이 비밀번호는 Jenkins 웹 인터페이스에 처음으로 로그인할 때 사용됩니다.
    
    ```bash
    sudo docker logs [Jenkins의 ContainerID]
    ```
    
    - `[Jenkins의 ContainerID]`는 실행 중인 Jenkins 컨테이너의 ID입니다.
2. **Jenkins Pipeline 구축**
    - **Credential 설정**: GitLab API Token을 발급받아 Jenkins의 Credential로 등록합니다.
    - **Pipeline 생성**: Jenkins Dashboard에서 새로운 Item을 생성하고, Pipeline 유형으로 설정합니다.
3. **Jenkins Pipeline Script 작성 및 실행**
    
    Jenkins 파이프라인 스크립트를 사용하여 다음 작업들을 자동화합니다:
    
    - Git 리포지토리에서 소스 코드 클론
    - Gradle을 사용하여 빌드
    - Docker 이미지를 빌드 및 실행
    - Docker 컨테이너 로그 확인
    
    ```coffeescript
    pipeline {
        agent any  
        // Jenkins 파이프라인이 실행될 노드를 지정, 'any'는 모든 가용한 에이전트에서 실행 가능
    
        environment {
            // 환경 변수 설정
            DB_URL = 'jdbc:mysql://i11a106.p.ssafy.io:3306/ditto'  
            // 데이터베이스 URL
            DB_USERNAME = 'test'  // 데이터베이스 사용자명
            DB_PASSWORD = 'ssafy'  // 데이터베이스 비밀번호
            IMG_DIR = '/var/image/'  // 이미지 파일이 저장될 디렉토리 경로
            DEVELOPMENT_URL = 'https://i11a106.p.ssafy.io'  
            PRODUCTION_URL = 'https://i11a106.p.ssafy.io:5173'  
            TOSS_CLIENT_KEY = 'test_ck_5OWRapdA8djBBkmjYKwYVo1zEqZK'  
            // TOSS API 클라이언트 키
            TOSS_SECRET_KEY = 'test_sk_DnyRpQWGrNzBm674Y2qlrKwv1M9E'  
            // TOSS API 시크릿 키
            OPENAI_API_KEY = 'sk-svcacct-3J5dL1Fa5pMdrtk6QkZnT3BlbkFJYMc92FtCQKPXoE91LwRD'  
            // OpenAI API 키
        }
    
        stages {
            stage('Git Clone') {  // 첫 번째 단계: Git 저장소에서 소스 코드 클론
                steps {
                    git branch: 'BE-develop',  
                    // 'BE-develop' 브랜치를 체크아웃
                    credentialsId: 'jenkins',  
                    // Jenkins에 저장된 자격 증명을 사용하여 Git 저장소에 접근
                    url: 'https://lab.ssafy.com/s11-webmobile1-sub2/S11P12A106.git'  
                    // 소스 코드 저장소 URL
                }
            }
    
            stage('Build') {  // 두 번째 단계: 애플리케이션 빌드
                steps {
                    dir('back') {  // 'back' 디렉토리로 이동하여 명령어 실행
                        sh '''
                        echo build start  
                        // 빌드 시작 메시지 출력
                        chmod +x ./gradlew  
                        // Gradle Wrapper에 실행 권한 부여
                        ./gradlew clean bootJar  
                        // Gradle 명령어로 프로젝트 클린 및 Jar 파일 생성
                        '''
                    }
                }
            }
    
            stage('Build Docker image') {  // 세 번째 단계: Docker 이미지를 빌드
                steps {
                    script {
                        docker.build("local/spring-project:latest", "back/")  
                        // 'back/' 디렉토리에서 Docker 이미지를 빌드하고 'local/spring-project:latest'로 태그 지정
                    }
                }
            }
    
            stage('Run Docker container') {  // 네 번째 단계: Docker 컨테이너 실행
                steps {
                    script {
                        sh '''
                        echo "Stopping and removing existing Docker container if exists..."  
                        // 기존 Docker 컨테이너가 있을 경우 중지 및 제거
                        docker stop spring-project || true  
                        // 'spring-project' 컨테이너 중지 (존재하지 않으면 오류 무시)
                        docker rm spring-project || true  
                        // 'spring-project' 컨테이너 제거 (존재하지 않으면 오류 무시)
                        
                        echo "Running Docker container..."  // 새 Docker 컨테이너 실행 메시지 출력
                        docker run -d --name spring-project -p 8080:8080 \  
                        // 'spring-project'라는 이름으로 컨테이너를 백그라운드에서 실행, 포트 8080을 호스트와 매핑
                        -e DB_URL=$DB_URL \  
                        // DB_URL 환경 변수 전달
                        -e DB_USERNAME=$DB_USERNAME \  
                        // DB_USERNAME 환경 변수 전달
                        -e DB_PASSWORD=$DB_PASSWORD \  
                        // DB_PASSWORD 환경 변수 전달
                        -e IMG_DIR=$IMG_DIR \  
                        // IMG_DIR 환경 변수 전달
                        -e DEVELOPMENT_URL=${DEVELOPMENT_URL} \  
                        // DEVELOPMENT_URL 환경 변수 전달
                        -e PRODUCTION_URL=${PRODUCTION_URL} \  
                        // PRODUCTION_URL 환경 변수 전달
                        -e OPENAI_API_KEY=${OPENAI_API_KEY} \  
                        // OPENAI_API_KEY 환경 변수 전달
                        -e TOSS_CLIENT_KEY=${TOSS_CLIENT_KEY} \  
                        // TOSS_CLIENT_KEY 환경 변수 전달
                        -e TOSS_SECRET_KEY=${TOSS_SECRET_KEY} \  
                        // TOSS_SECRET_KEY 환경 변수 전달
                        -e TZ=Asia/Seoul \  
                        // 컨테이너의 시간대를 서울로 설정
                        -v file-images:$IMG_DIR \  
                        // 호스트의 'file-images' 디렉토리를 컨테이너의 IMG_DIR로 마운트
                        local/spring-project:latest  
                        // 빌드된 Docker 이미지 사용
                        '''
                    }
                }
            }
    
            stage('Check Docker Logs') {  // 다섯 번째 단계: Docker 로그 확인
                steps {
                    script {
                        sh '''
                        echo "Checking Docker logs..."  
                        // Docker 로그 확인 메시지 출력
                        sleep 10  
                        // 애플리케이션이 완전히 시작될 시간을 주기 위해 10초 대기
                        docker logs spring-project  
                        // 'spring-project' 컨테이너의 로그 출력
                        '''
                    }
                }
            }
        }
        post {
            always {
                cleanWs()  // 파이프라인 실행 후 항상 작업 영역 정리
            }
        }
    }
    
    ```
    

### Front-end 설정

1. **Git Clone**
    
    프로젝트의소스 코드를 로컬 환경으로 클론합니다.
    
    ```bash
    git clone <repository 주소>
    ```
    
2. **폴더 이동**
    
    클론한 프로젝트의 `front` 디렉토리로 이동합니다.
    
    ```bash
    cd front
    ```
    
3. **브랜치 변경 및 코드 최신화**
    
    작업할 브랜치로 이동한 후, 최신 코드를 받아옵니다.
    
    ```bash
    git checkout <branch 이름>
    git pull
    ```
    
4. **프로덕션 빌드 실행**
    
    프론트엔드 애플리케이션을 빌드하여 배포 가능한 상태로 만듭니다.
    
    ```bash
    npm run build
    ```
    
5. **Nginx 설정 파일 문법 검사**
    
    Nginx 설정 파일의 문법이 올바른지 확인합니다.
    
    ```bash
    sudo nginx -t
    ```
    
6. **Nginx 재시작**
    
    Nginx 설정이 올바르다면 서버를 재시작하여 변경 사항을 반영합니다.
    
    ```bash
    sudo systemctl restart nginx
    ```
    

### Certbot(SSL) 설치

1. **Certbot 설치**
    
    Certbot을 사용해 SSL 인증서를 발급받기 위해 Certbot 패키지를 설치합니다.
    
    ```bash
    sudo snap install --classic certbot
    ```
    
2. **Certbot 인증서 발급 과정 수행**
    
    도메인 소유권 확인을 위해 수동 모드로 SSL 인증서를 발급받습니다.
    
    ```bash
    sudo certbot certonly --manual
    ```
    
    - 도메인 이름을 입력하고, IP 로그 동의 여부를 선택합니다.
3. **도전 파일 생성 및 Nginx 설정 확인**
    
    도전 파일을 생성하고, 이를 제공할 수 있도록 Nginx 설정을 확인하여 SSL 인증서를 적용합니다.
    
4. **Nginx 재시작**
    
    도전 파일 설정이 완료되면 Nginx를 재시작하여 설정을 반영합니다.
    
    ```bash
    sudo nginx -t
    sudo systemctl reload nginx
    ```
    

### OpenVidu 설치 및 설정

1. **OpenVidu 설치**
    
    OpenVidu 플랫폼을 설치하기 위해 `/opt` 디렉토리로 이동하여 설치 스크립트를 다운로드하고 실행합니다.
    
    ```bash
    cd /opt
    curl <https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_openvidu_latest.sh> | bash
    ```
    
2. **환경 설정 파일 수정**
    
    `.env` 파일에서 OpenVidu 플랫폼의 도메인 또는 공용 IP 주소, OpenVidu Secret 등을 설정합니다.
    
    - `DOMAIN_OR_PUBLIC_IP`: OpenVidu 서버에 IP를 입력합니다.
    - `OPENVIDU_SECRET`: OpenVidu 플랫폼에 접근하기 위한 비밀번호를 설정합니다.
    
    ```jsx
    # Documentation: https://docs.openvidu.io/en/stable/reference-docs/openvidu-config/
    
    # NOTE: This file doesn't need to quote assignment values, like most shells do.
    # All values are stored as-is, even if they contain spaces, so don't quote them.
    
    # Domain name. If you do not have one, the public IP of the machine.
    # For example: 198.51.100.1, or openvidu.example.com
    DOMAIN_OR_PUBLIC_IP=i11a106.p.ssafy.io
    
    # OpenVidu SECRET used for apps to connect to OpenVidu server and users to access to OpenVidu Dashboard
    OPENVIDU_SECRET=MY_SECRET
    
    # Certificate type:
    # - selfsigned:  Self signed certificate. Not recommended for production use.
    #                Users will see an ERROR when connected to web page.
    # - owncert:     Valid certificate purchased in a Internet services company.
    #                Please put the certificates files inside folder ./owncert
    #                with names certificate.key and certificate.cert
    # - letsencrypt: Generate a new certificate using letsencrypt. Please set the
    #                required contact email for Let's Encrypt in LETSENCRYPT_EMAIL
    #                variable.
    CERTIFICATE_TYPE=selfsigned
    
    # If CERTIFICATE_TYPE=letsencrypt, you need to configure a valid email for notifications
    LETSENCRYPT_EMAIL=bommy00@naver.com
    
    # Proxy configuration
    # If you want to change the ports on which openvidu listens, uncomment the following lines
    
    # Allows any request to http://DOMAIN_OR_PUBLIC_IP:HTTP_PORT/ to be automatically
    # redirected to https://DOMAIN_OR_PUBLIC_IP:HTTPS_PORT/.
    # WARNING: the default port 80 cannot be changed during the first boot
    # if you have chosen to deploy with the option CERTIFICATE_TYPE=letsencrypt
    HTTP_PORT=4442
    
    # Changes the port of all services exposed by OpenVidu.
    # SDKs, REST clients and browsers will have to connect to this port
    HTTPS_PORT=4443               
    ```
    

### Jenkins SSL 적용

1. **Jenkins 컨테이너 재실행**
SSL 인증서를 적용하기 위해 Jenkins 컨테이너를 중지하고, 새 설정으로 재실행합니다.
    
    ```bash
    docker stop jenkins
    docker rm jenkins
    
    docker run -d --name jenkins \\
    -u root \\
    -p 9090:8080 \\
    -p 8443:8443 \\
    -v /var/jenkins_home:/var/jenkins_home \\
    -v /var/run/docker.sock:/var/run/docker.sock \\
    -v /usr/bin/docker:/usr/bin/docker \\
    -v /etc/letsencrypt/live/i11a106.p.ssafy.io:/etc/letsencrypt/live/i11a106.p.ssafy.io \\
    -e JENKINS_OPTS="--httpsPort=8443 --httpsKeyStore=/etc/letsencrypt/live/i11a106.p.ssafy.io/spring_key.p12 --httpsKeyStorePassword=ssafyditto!" \\
    -e CASC_JENKINS_CONFIG=/var/jenkins_home/casc_configs/jenkins.yaml \\
    -e TZ=Asia/Seoul \\
    jenkins/jenkins:latest-jdk17
    ```
    

## 4. DB 접속 정보

| DB_URL | jdbc:mysql://i11a106.p.ssafy.io:3306/ditto |
| --- | --- |
| DB_USERNAME | test |
| DB_PASSWORD | ssafy |

## 5. 외부 서비스 정보

### Gmail SMTP

1. Google 계정에서 2단계 인증을 한 이후 앱 비밀번호 발급받기
2. Gmail에 들어가서 설정 모두 보기 누르기
3. [**전달 및 POP/IMAP](https://mail.google.com/mail/u/0/?tab=rm&ogbl#settings/fwdandpop)** 로 들어가서 필요한 설정 하기
4. build.gradle 에 추가
    
    ```java
    implementation group: 'jakarta.mail', name: 'jakarta.mail-api', version: '2.1.3'
    ```
    
5. [application.properties](http://application.properties) 에 앱 비밀번호 등을 입력
    
    ```java
    # Mail
    spring.mail.host=smtp.gmail.com
    spring.mail.port=587
    spring.mail.username=dittoa106@gmail.com
    spring.mail.password=**************** // 비밀번호
    spring.mail.properties.mail.debug=true
    spring.mail.properties.mail.smtp.auth=true
    spring.mail.properties.mail.smtp.timeout=50000
    spring.mail.properties.mail.smtp.starttls.enable=true
    ```
    

### 카카오 회원가입/로그인

1. Kakao developers 회원가입하기
2. 내 애플리케이션에 애플리케이션 추가하기
3. 카카오 로그인 0n 설정, 동의 항목 설정(email을 받아와야하기 때문에biz 앱으로 등록하야함.)
4. Redirect URI 설정
5. 카카오 로그인을 누를 시 카카오에 인가코드를 받아옴.
6. 카카오에서 받아온 인가코드를 다시 카카오로 보내서 accessToken과 refreshToken을 받아옴.
7. 카카오에서 받은 accessToken을 다시 카카오로 보내서 사용자정보(Ditto에서는 email, 닉네임)를 받아옴
8. 사용자정보를 DB에 조회해서 중복사용자가 없으면 회원가입처리 중복사용자가 있으면 본인이므로 로그인처리

### Toss 결제 서비스

1. Toss 결제 서비스 가입 및 시크릿 키 발급
2. Spring 프로젝트에 Toss 시크릿 키 적용하기 
    
    ```jsx
    payment.toss.test_client_api_key=${TOSS_CLIENT_KEY}
    payment.toss.test_secret_api_key=${TOSS_SECRET_KEY}
    ```
    

### STT

1. 프로젝트 디렉토리로 이동
2. react-speech-recognition 패키지 설치
    
    ```bash
    npm install react-speech-recognition
    ```
    
3. package.json 파일에서 react-speech-recognition이 dependencies에 추가되었는지 확인
4. 프로젝트의 필요한 파일에서 import하여 SpeechRecognition 기능 구현
    ㄴ
    ```jsx
    import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
    ```
    

### OpenAI API

1. OpenAI Platform 회원가입
2. 프로젝트를 위한 API Key 발급
3. [application.properties](http://application.properties) 에 API 키 및 모델 정보 작성
    
    ```java
    # openai
    openai.api-key=${OPENAI_API_KEY}
    openai.model=gpt-4o
    ai.base.url=https://api.openai.com/v1
    ```
    
4. 프론트엔드에서 STT로 전달받은 텍스트를 받아 ChatGPT API를 활용한 요약 프롬프트 생성 및 전달
5. 요약된 내용을 해당 강의 단계의 요약본으로 저장