# 소프트웨어 개발의 모든 것 (All Of Software Everything)

* 이 책을 읽으며 메모한 내용을 기록해 본다.



## 개발자의 개발 프로세스

* SRS(Software Requirement Specification)를 작성한다.
* SRS를 작성하면서 모든 관련자와 철저히 리뷰한다.
* 프로젝트 관리자는 개발자들과 함께 1, 2일 단위의 상세 일정을 작성한다.
* 테스트팀은 SRS를 보고 테스트 Suite를 만들기 시작한다.
* 개발 리더들은 화이트보드나 종이를 펼쳐놓고 아키텍처에 대한 토론을 한다.
* 구현 시 모든 소스코드는 리뷰한다.
* 개발자는 매일 스스로 일정을 업데이트한다.
* 소스코드 작성은 일일빌드가 깨지지 않으면서 이루어진다.
* 소소코드관리시스템과 버그관리시스템을 효과적으로 사용한다.
* 알파, 베타 단계 별로 모든 프로젝트 관련자들이 유기적으로 움직인다.
* 일정에 맞춰 완성도 있는 품질의 제품을 출시한다.

## 프로젝트 관리 Tip
* 조엘 소폴스키도 엑셀을 이용한 일정 관리를 선호한다고 말하고 있다.
* 프로젝트 관리 항목
  * Org Est : 초기에 산정한 소요시간
  * Cur Est : 변경되어 재 산정된 소요 시간
  * Elapsed : 지금까지 투입한 시간
  * Remain : 완료하기 위해사 추가로 투입해야 하는 시간 (Remain = Cur Est - Elapsed)
  * Status : 미할당, 취소, 해결 중, 완료
* 엑셀은 문서 공유 기능이 있어서 파일서버에 문서를 넣어 두고 동시에 여러 사람이 편집해도 손쉽게 통합할 수 있다.

## 문서 작성 기술
* 자신만 읽을 수 있는 문서는 문서로의 가치가 없다.
* 조엘 스폴스키는 소프트웨어 개발자 채용 시 글을 잘 쓰는 사람을 뽑는다고 했다. 문법 오류가 있는 이력서를 써 보내는 사람은 자신의 회사에 절대 입사하지 못할 거라고 했다. 
* 스프트웨어 개발자들은 좋은 글을 많이 씀으로써 서로간 대화의 기술을 늘릴 수 있다. 의사소통은 소트트웨어 개발에서 가장 간과되고 있는 기술이다.
* 문서를 작성하는 것은 남이 읽기 위한 것이다. 내가 읽기 위한 것이 아니다.
* 문서 작성의 핵심사항
  * 읽는 사람의 눈 높이에 맞춰서 작성한다.
  * 필요를 충족시킬 수 작성해야 하며, 필요 없는 내용은 쓰지 않는다.
  * 사실과 의견을 확실히 구별한다.
  * 쉬운 표현을 사용한다.
  * 화면 꾸미기에 보다는 내용을 명확하게 잘 전달하는데 주력한다.

## 사내 세미나
* 개발자들의 지식을 서로 공유하고 사기를 고취시키는 좋은 방법이다.
* 개발자들은 남에게 지식을 전파할 때 묘한 만족감을 느낀다.
* 회사에서 본인의 존재감에 더욱 확신을 가지며, 우월감도 느끼게 된다.
* 세미나를 준비하면서 자신이 알고 있던 지식을 좀 더 체계적으로 정리하고 모르던 부분도 알게 된다.
* 세미나 자료를 정리하면서 문서를 작성하는 기술도 향상되게 된다.
* 세미나 발표를 하면서 발표 능력도 향상되게 된다.

## 외부 컨퍼런스(Conference)
* 회사의 기술 리더들은 외부 컨퍼런스 꾸준히 참석해서 지속적을 업계 동향을 읽고 미래를 예측해야 한다.
* 단순하게 지식을 얻는 것이 아닌, 비즈니스 관점에서 좀 더 넓은 시각으로 봐야 한다.
* 컨퍼런스에 참석해서 같은 회사 동료들 끼리만 어울리고 돌아오는 것은 반쪽짜리 참가에 지나지 않는다.
* 컨퍼런츠 주최측 사람들과 적극적으로 접촉하고, 같은 참석자들 중에서 추후 비니지스 이슈가 있을 수 있는 사람들과 적극적으로 사귀어 두는게 좋다. 
* 컨포런스를 얼마나 효율적으로 참석했는가의 평가를 받아 온 명함의 수로 측정할 수도 있다.

## 인재보유
* 적절한 연봉
* 좋은 인적 구성 및 인간 관계
* 좋은 선배로부터 배울 수 있는 환경
* 성장감을 느낄 수 있는 좋은 프로젝트에 참여
* 회사에 기여할 수 있는 중요한 프로젝트에 참여

## 코딩 전문가가 아닌 소프트웨어 전문가의 육성
* 요구사항 (Software Requirements)
* 설계 (Software Design)
* 구축 (Software Construction)
* 테스트 (Software Testing)
* 유지보수 (Software Maintenance)
* 향상관리 (Software Configuration Management)
* 공학관리 (Software Engineering Management)
* 프로세스 (Software Engineering Process)
* 공학도구와 방법론 (Software Engineering Tools and Methods)
* 품질 (Software Quality)

## Code Review
* 너무 많은 개발자가 참여하면 안 된다.
* 검토 시에 상대방을 비난하는 투로 말하면 안 된다.
* 스타일에 대해서 자기 주장을 강요하지 않는 것이 좋다.
* 코드 리뷰는 진행자가 전체적인 진행을 조정해야 한다.
  * 코드 리뷰가 이상한 방향으로 흘러가지 않고, 주어진 시간에 리뷰를 마치도록 컨트롤 해야 한다.
* 가능하면 코드 리뷰 전에 코드를 읽어보고 들어오는 것이 좋다.
* Syntax를 코드 리뷰 시간에 의논하는 것은 시간낭비다.

## 코드 리뷰 체크 리스트 예제
* 리뷰자가 리뷰하고 있는 소스코드를 이해하고 있는가?
* 소스코드가 회사의 코딩 표준을 준수하고 있는가?
* 함수의 모든 파라미터가 입력용 또는 출력용인지 명시되어 있는가?
* 모든 복잡한 알고리즘에 대해서 설명이 있는가?
* 주석 처리되어 사용되지 않는 소스코드에 대한 주석 처리를 한 이유가 설명되어 있는가?
* 정상적인 값이나 범위를 확인하기 위해서 모든 데이터에 대해서 Assertion을 사용하고 있는가?
* 함수에서 리턴으로 나가는 모든 곳에서 모든 에러를 적절히 처리하고 있는가?
* 모든 Exception을 제대로 처리하고 있는가?
* 할당된 메모리를 모두 해제하고 있는가?
* 모든 전역 변수가 Thread-Safe한가?
* 동시에 여러 쓰레드에서 액세스되는 모든 객체가 Thread-Safe한가?
* 모든 Lock은 얻어진 순서대로 해제하고 있는가?
* 무한 루프가 될만한 소스 코드는 업슨ㄴ가?
* 소스코드가 속도, 메모리 사용에 무리는 없는가?
* 모든 배열의 인덱스가 배열의 크기를 넘어서 참조하지 않는가?
* 모든 변수를 사용하기 전에 초기화하고 있는가?
* 이미 존재하는 API를 사용해서 대체할 수 있는 부분이 있는가?

## 인재활용 (개발자의 지식 및 경험)
* 소프트웨어 개발 경력
* 운영체제 관련
  * 운영체제 사용 경험
  * 운영체제 Technology 지식
  * Embedded System 경험
  * 스마트폰 플랫폼 경험
* Web 관련
  * Web Application Server 경험
  * 웹 관련 기술에 관한 지식과 경험
* Architecure Design 관련
  * 소프트웨어 디자인 도구에 관한 지식과 경험
* Programming 관련
  * Object Oriented Tehnology 지식과 겅험
  * 통합 개발 도구(IDE)의 사용 경험
  * Programming Lanaguges의 지식과 경험
  * Distributed Programming 경험
  * java에 관한 지식과 경험
  * Java Framework
  * XML 관련 지식과 경험
  * User Interface  Programming
  * Email 관련 지술 지식
  * Network 관련 기술 지식
  * Security 관련 기술 지식
* 개발 전반
  * 개발방법론에 의한 프로젝트 수행 경험
  * Progect Management 관련 지식과 경험
  * 테스트에 관한 지식
  * 표준화에 대한 지식
  * 웹 디자인 도구의 사용 경험
  * Database 지식 및 경험
  * Protocols에 관한 지식 깊이
  * 국체화(i18n)와 지역화(L10n)의 경험과 지식
  * e-Businness 제품 구축과 사용 경험
  * Packaging 경험
  * 문서 이해와 작성 경험
* 기반 시스템 관련
  * 소스코드관리시스템 사용 경험 및 지식
  * 버그관리시스템의 사용 경험 및 지식
  * 빌드/릴리즈의 경험 및 지식

## 소프트웨어 릴리즈 단계
* Pre-alpha : 개발 단계
* Alpha1, Alpha2 : 테스트팀의 공식적인 테스트가 시작되는 단계
* Beta1, Beta2, Beta3 : 사용자 평가 및 외부 테스트를 위한 만들어진 버전. 작업 버그들만 남아 있는 상태.
* RC Test (Release Candidate) : 출시를 위해서 만들어진 버전. FCS(First Customer Shpiment), 감마(Gamma), 델타(Delta)라고 부르기도 함
* GA (General Availablity) : RTM(Release to Manufacturing)를 부르기도 함. 테스트를 통과하여 출시할 수 있는 버전.

## 일일회의
* 일일회의는 10~20분은 넘지 말아야 한다.
* 모든 이슈를 다루려고 하지 말고 중요한 이슈에 대한 논의만 한다.
* 일일회의는 이슈를 해결하는 시간이 아니라며 단순히 공유만 하는 시간이다.
* 공식적인 일일회는 숨기기 쉬운 이슈를 밖으로 끌어내는 중요한 역할을 한다.    

# SRS Template 소개
* Introduction (소개)
  * Purpose (목표)
  * Product Scope (범위)
  * Document Convention (문서규칙)
  * Terms and Abbreivations (정의 및 약어)
  * Related Documents (관련 문서)
  * Intended Audience and Reading Suggestions (대상 및 읽는 방법)
  * Project Output (프로젝트 산출물)
* Overall Description (전체설명)
  * Product Perspective (제품 조망)
  * Overall System Cofiguration (전체 시스템 구성)
  * Overall Operation (전체 동작 방식)
  * Product Functions (제품 주요 기능)
  * User Classes and Characteristics (사용자 계층과 특징)
  * Assumptions and Dependencies (가정과 종속 관계
  * Apportioning and Requirements (단계별 요구사항)
  * Backward Compatibility (하위 호환성)
* Evironment (환경)
  * Operaiton Environment (운영 환경)
  * Product Installation and Configuration (제품 설치 및 설정)
  * Distribution Environment (배포 환경)
  * Development Environment (개발 환경)
  * Test Environment (테스트 환경)
  * Configuration Management (형상 관리)
  * Bugtrack System (버그 트래킹)
  * Other Enviroment (기타 환경)
* External Interface Requirement (외부 인터페이스 요구사항)
  * System Interface
  * User Interface
  * Hardware Interface
  * Software Interface
  * Communication Interface
  * Other Interface
* Performance Requirement (성능 요구사항)
  * Throughput (작업처리량)
  * Concurrent Session (동시 세션)
  * Response Time (대응 시간)
  * Performance Dependency (성능 종속 관계)
  * Other Performacne Requirement (기타 성능 요구사항)
* Non-Functional Requirement (기능 이외의 요구사항)
* Functional Requirement (기능 요구사항)