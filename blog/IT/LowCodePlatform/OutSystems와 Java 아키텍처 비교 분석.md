# OutSystems와 Java 아키텍처 비교 분석

## OutSystems의 "Screen"과 "Controller" 역할 비교
OutSystems의 Screen Actions는 단순히 UI 상의 이벤트를 처리하는 데 사용되며, Java의 @Controller는 HTTP 요청 라우팅 및 데이터 변환 등 더 광범위한 역할을 수행합니다. 

OutSystems는 UI 이벤트는 Screen Actions로, REST API 요청은 별도의 API 모듈로 처리하여 관심사를 분리합니다. 이러한 구조적 차이로 인해 OutSystems의 Screen Actions와 Java의 Controller는 완전히 동일한 수준의 역할을 수행하지 않습니다.

## Service와 Process/Server Actions 비교
OutSystems의 비즈니스 로직 처리는 다음과 같이 구분됩니다:
- Server Actions: 재사용 가능한 단위 기능을 캡슐화하여 제공
- Processes: 장기 실행 워크플로우 관리에 특화된 기능 제공

Java의 @Service는 비즈니스 로직 캡슐화에 초점을 맞추는 반면, OutSystems는 목적에 따라 Server Actions와 Processes로 역할을 명확히 구분합니다. Server Actions는 일반적인 비즈니스 로직을, Processes는 장기 실행이 필요한 복잡한 워크플로우를 담당합니다.

## Repository와 Aggregate/Advanced Query 비교
OutSystems의 데이터 접근 계층은 다음과 같은 특징을 가집니다:
- Entity Framework를 통한 자동 CRUD 기능 제공 (Java Repository의 기본 CRUD 메서드와 유사)
- Aggregate를 통한 시각적 SQL 쿼리 디자인
- Advanced Query를 통한 직접적인 SQL 작성 가능

Java의 @Repository는 JPA/Hibernate와 함께 ORM으로 동작하며, 더 세밀한 데이터 접근 제어를 제공합니다. OutSystems의 Aggregate는 데이터 조회를 간단히 처리할 수 있지만, ORM과 같은 상세한 데이터 매핑 기능은 제공하지 않습니다.

## 수정된 요약 표
| **Controller (UI & 요청 처리)** | **Java 개발** | **OutSystems** |
|----------------------------------|----------------|-----------------|
| @Controller 사용                 | Screen (UI) 및 Screen Actions 활용 | 사용자 요청 처리 및 데이터 반환 |
| REST API 처리                    | @RestController | 별도 API 모듈 |
| 이벤트 처리                      | Handler 메서드  | Screen Actions |

| **Service (비즈니스 로직)**     | **Java 개발** | **OutSystems** |
|----------------------------------|----------------|-----------------|
| @Service에서 로직 처리          | Server Actions(비즈니스 로직 처리) | 복잡한 로직 캡슐화 |
| 장기 실행 프로세스               | Background Jobs | Process Flow |

| **Repository (데이터 접근 계층)**| **Java 개발** | **OutSystems** |
|----------------------------------|----------------|-----------------|
| @Repository를 사용하여 DB 접근   | Entity와 Aggregate를 통해 DB 접근 | 기본 CRUD 자동 생성 |
| ORM 사용                         | JPA/Hibernate  | Entity Framework |
| 복잡한 쿼리                      | JPQL/SQL      | Aggregate/Advanced Query |

## 결론: 주요 차이점과 유사점
### ✅ 유사점:
- 계층적 아키텍처: Controller → Service → Repository 순으로 데이터 흐름 관리
- 비즈니스 로직의 분리 및 재사용 가능
- 기본적인 CRUD 작업의 자동화 지원

### ✅ 차이점:
- OutSystems는 시각적 도구를 통해 간단한 프로세스와 빠른 개발 지원
- Java는 코드 기반으로 더 세밀한 제어와 확장성 제공
- 배포 및 버전 관리:
  - OutSystems: 자동화된 배포 파이프라인과 버전 관리 시스템 내장
  - Java: Jenkins, Git 등 외부 도구를 통한 CI/CD 구성 필요

이러한 차이를 이해하고 활용하면 각 플랫폼의 장점을 최대한 활용할 수 있습니다.