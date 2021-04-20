# UUID

UUID(Universally Unique Identifier)는 소프트웨어 구축에 쓰이는 식별자 표준으로, 분산 컴퓨팅 환경의 일부로 표준화 되었다.



## UUID의 필요성

* 네트워크 상에서 서로 모르는 개체들을 식별하고 구별하기 위해서는 각각의 고유한 이름이 필요하다. 
* 같은 이름을 갖는 개체가 존재한다면 구별이 불가능해지기 때문이다. 
* 고유성을 완벽하게 보장하려면 중앙관리시스템이 일련번호를 부여해 주면 간단하지만 동시다발적이고 독립적으로 개발되고 있는 시스템들의 경우 중앙관리시스템이 불가능하다.
* 각자 스스로가 이름을 짓도록 하되 고유성을 충족할 수 있는 방법이 필요했다.
* 이를 위해서 탄생한 것이 UUID이며 국제기구에서 표준으로 정하고 있다.



## UUID 정의

* UUID는 16바이트(128비트)의 수다.
* 표준 형식 UUID는 32개의 십육진수로 표현되며, 총 36개 문자(32개 문자와 4개의 하이픈)로 된 8-4-4-4-12라는 5개의 그룹을 하이픈으로 구분한다.

##### ※ UUID 예시
```
72e2a789-5fc8-4ff6-b824-d7b731a12285
```



## UUID 버전

* 버전 1 (MAC 주소)
* 버전 2 (DCE 보안)
* 버전 3 (MD5 해시)
* 버전 4 (랜덤)
* 버전 5 (SHA-1 해시)



## JAVA UUID 생성 예제 코드

```java
package com.ucanon.util.test;

import java.util.UUID;

public class UUIDTest {

	public static void main(String[] args) {
		UUID uuid1 = UUID.randomUUID();
		System.out.println(String.format("UUID1 = %s", uuid1));
	}
}

// Output >> 
// UUID1 = 06ccf73b-2bde-4e41-8cba-e0e10e3b1c97
```



## Reference

>* [https://ko.wikipedia.org/wiki/범용_고유_식별자](https://ko.wikipedia.org/wiki/%EB%B2%94%EC%9A%A9_%EA%B3%A0%EC%9C%A0_%EC%8B%9D%EB%B3%84%EC%9E%90)

