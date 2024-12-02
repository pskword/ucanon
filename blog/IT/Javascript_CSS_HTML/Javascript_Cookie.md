# Javascript Cookie

쿠키는 사용자의 컴퓨터에 작은 텍스트 파일로 저장되는 데이터로, 웹 페이지에서 사용자의 정보를 저장하고 서버와 데이터를 주고받을 때 사용됩니다. 쿠키는 주로 사용자의 로그인 정보, 방문 기록 등을 저장하는 데 활용됩니다.



## 쿠키 설정, 읽기, 변경, 삭제

- **쿠키 설정**: `document.cookie = "name=value; expires=Date; path=/";`
- **쿠키 읽기**: `let cookies = document.cookie;`
- **쿠키 변경**: 기존 쿠키를 덮어쓰면 변경됨 (`document.cookie = "name=new_value";`)
- **쿠키 삭제**: 만료 날짜를 과거로 설정 (`document.cookie = "name=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";`)



##  JavaScript로 쿠키 관리하는 함수 예제

- setCookie : 쿠키 생성

  ```javascript
  function setCookie(name, value, days) {
    let expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/`;
  }
  ```

- getCookie : 쿠키 읽기

  ```javascript
  function getCookie(name) {
    let cookies = document.cookie.split(';');
    for (let c of cookies) {
      if (c.indexOf(name + "=") === 0) return c.substring(name.length + 1);
    }
    return "";
  }
  ```

- checkCookie : 쿠키가 있으면 인사 메시지, 없으면 사용자 이름을 묻고 쿠키 설정

  ```javascript
  function checkCookie() {
    let username = getCookie("username");
    if (username) {
      alert("Welcome again " + username);
    } else {
      username = prompt("Please enter your name:");
      if (username) setCookie("username", username, 365);
    }
  }
  ```



## Cookie 관리 및 보안

쿠키 관리는 보안과 개인정보 보호를 위해 중요하며, 다음과 같은 기준을 따라야 합니다. 



### **1. 쿠키 설정 및 저장**

- **최소한의 데이터**: 필요 최소한의 데이터를 쿠키에 저장하여 데이터 유출 위험을 줄입니다.
- **유효 기간**: 쿠키의 유효 기간을 명확히 설정하고, 세션 쿠키와 영구 쿠키를 필요에 따라 사용합니다. 민감한 정보는 세션 쿠키로 처리하여 브라우저 종료 시 자동 삭제되도록 합니다.
- **도메인과 경로**: 쿠키의 도메인과 경로를 정확히 설정하여 특정 웹사이트나 페이지에서만 접근 가능하도록 제한합니다.
- **보안 플래그**: 민감한 정보를 포함한 쿠키는 `Secure` 플래그를 설정해 HTTPS 연결에서만 전송되도록 보장합니다.
- **HttpOnly 플래그**: 자바스크립트를 통해 접근할 필요가 없는 쿠키는 `HttpOnly` 플래그를 설정하여 XSS 공격을 방지합니다.



### **2. 민감한 데이터 관리**

- **암호화**: 민감한 데이터를 쿠키에 저장할 경우 반드시 암호화하여 보관합니다.
- **개인정보 금지**: 주민등록번호, 비밀번호 등 민감한 개인정보는 쿠키에 직접 저장하지 않습니다.



### **3. 사용자 동의**

- **사전 동의**: 쿠키 저장 전 사용자에게 동의를 구해야 하며, 특히 분석 및 광고 목적으로 사용하는 경우 명시적으로 알리고 선택권을 제공합니다.
- **쿠키 정책 제공**: 사용자가 쿠키의 사용 목적과 관리 방법을 이해할 수 있도록 명확한 쿠키 정책 문서를 제공해야 합니다.



### **4. 접근 및 수정**

- **접근 제한**: 특정 쿠키에 접근할 수 있는 도메인과 서브도메인을 제한하여 보안을 강화합니다.
- **삭제 옵션**: 사용자가 언제든 쿠키를 삭제하거나 설정을 변경할 수 있도록 명확한 옵션을 제공해야 합니다.



### **5. 보안 및 테스트**

- **정기적인 감사**: 저장된 쿠키 데이터를 정기적으로 검토하여 불필요하거나 오래된 데이터를 제거합니다.
- **테스트 및 업데이트**: 애플리케이션 업데이트 시 쿠키 작동 여부를 철저히 테스트하고 보안 기준에 맞게 수정합니다



### **6. 규정 준수**

- **지역 법규 준수**: 지역별로 요구되는 데이터 보호법(GDPR, CCPA 등)을 준수하여 쿠키를 관리합니다.
- **동의 기록 유지**: 사용자 동의에 대한 기록을 보관하여 규제 기관의 요청 시 증명할 수 있어야 합니다.



## Domain 별 Cookie 관리 기준

쿠키 관리에서 **도메인 기준**은 쿠키의 접근성과 보안을 결정하는 중요한 요소입니다. 쿠키는 특정 도메인 및 경로와 연관되며, 이를 통해 어떤 웹사이트나 서비스가 해당 쿠키를 읽고 쓸 수 있는지 제한할 수 있습니다. 



### **1. 도메인의 정의**

- 쿠키의 `Domain` 속성은 해당 쿠키가 접근 가능한 도메인을 명시합니다.

- 도메인을 설정하지 않으면 기본적으로 쿠키를 설정한 

  호스트 도메인

  에서만 접근 가능합니다.

  - 예: `www.example.com`에서 설정한 쿠키는 기본적으로 `www.example.com`에서만 접근할 수 있습니다.



### **2. 도메인 속성의 설정**

- 명시적 도메인 지정 :  Domain 속성을 명시적으로 설정하여 서브도메인을 포함한 더 넓은 범위에서 쿠키를 공유할 수 있습니다.
  - 예: `Domain=.example.com`으로 설정하면 `www.example.com`, `sub.example.com` 등 모든 서브도메인에서 쿠키를 사용할 수 있습니다.

- 도메인 미지정 : Domain 속성을 생략하면 설정된 호스트 도메인에서만 쿠키가 작동합니다.
  - 예: `example.com`에서 생성한 쿠키는 `sub.example.com`에서 사용할 수 없습니다.



### **3. 서브도메인 관리**

- 도메인 확장  : 쿠키를 여러 서브도메인에서 사용하려면 Domain 속성을 상위 도메인으로 설정합니다.
  - 예: `Domain=.example.com` → `www.example.com`과 `blog.example.com` 모두에서 접근 가능.

- 도메인 격리 : 민감한 데이터는 도메인을 격리하여 특정 서브도메인에서만 접근하도록 설정합니다.
  - 예: `Domain=secure.example.com` → 해당 서브도메인에서만 사용 가능.



### **4. 도메인 기반의 보안 고려 사항**

- 도메인 오염 방지  : 쿠키를 너무 넓은 도메인( .com, .net) 으로 설정하면 보안 취약점이 발생할 수 있습니다.
  - 예: `.example.com`으로 설정된 쿠키는 `malicious.example.com`에서도 접근할 수 있어 공격에 노출될 가능성이 있습니다.
- **HTTPS와 함께 사용**: `Secure` 플래그를 설정하여 HTTPS 환경에서만 쿠키를 전송하도록 하면 도메인 기반 공격(중간자 공격 등)을 방지할 수 있습니다.



### **5. 도메인 별 쿠키 공유 사례**

#### 1) **쿠키 공유 사례**

- 로그인 유지 : example.com의 사용자 인증 쿠키를 www.example.com 과 api.example.com에서 모두 접근 가능하게 설정.
  ```
  Set-Cookie: session_id=abc123; Domain=.example.com; Path=/; Secure; HttpOnly
  ```

#### 2) **도메인 격리 사례**
- 보안 강화를 위한 쿠키 격리 :  secure.example.com 에서만 접근 가능한 세션 쿠키 설정.
  ```
  Set-Cookie: secure_session=xyz789; Domain=secure.example.com; Path=/; Secure; HttpOnly
  ```



## Cookie와 Port와 관계

**포트가 다른 경우에도 도메인은 동일하게 간주**되며, 쿠키는 동일한 도메인과 경로에서 공유됩니다. 즉, HTTP 쿠키는 **포트 번호와 무관**하게 동작합니다. 쿠키는 `Domain`과 `Path` 속성으로만 관리되고, 포트는 쿠키의 스코프를 결정하는 데 영향을 미치지 않습니다.



### **1. 쿠키와 포트 간 관계**

- 쿠키는 HTTP(S) 프로토콜을 통해 전송되며, 프로토콜 스펙상 포트 번호는 쿠키의 범위를 결정하지 않습니다.
- 예를 들어, 동일한 도메인 example.com 에서 
  - `http://example.com:8080`
  - `http://example.com:3000`
  - 이 두 경우 모두 동일한 쿠키에 접근할 수 있습니다.



### **2. Cookie 접근 예시**

```
Set-Cookie: session_id=abc123; Domain=example.com; Path=/; Secure; HttpOnly
```

- 이 쿠키는 다음 URL 모두에서 동일하게 접근 가능합니다:
  - `http://example.com:8080/page`
  - `http://example.com:3000/page`
  - `https://example.com/page`

#### 서로 다른 포트의 서버에서 공유

- **공유 가능**: 동일한 도메인 내에서 쿠키를 읽고 쓸 수 있습니다.
- **독립적 상태 유지**: 각각의 서버 애플리케이션에서 별도 세션 관리가 필요한 경우, 포트별로 고유한 쿠키 이름을 사용해야 합니다.



### **3. 포트별 쿠키 분리 방법**

쿠키는 기본적으로 포트 번호에 따라 다르게 관리되지 않으므로, 애플리케이션별로 포트 번호를 기반으로 고유한 쿠키를 관리하려면 다음 방법을 고려해야 합니다:

1. **쿠키 이름 구분**:

   - 포트를 쿠키 이름에 포함하여 다른 서버 애플리케이션이 충돌하지 않도록 관리합니다.

   ```
   http코드 복사Set-Cookie: session_8080=abc123; Domain=example.com; Path=/; Secure; HttpOnly
   Set-Cookie: session_3000=xyz789; Domain=example.com; Path=/; Secure; HttpOnly
   ```

2. **경로(Path) 분리**:

   - 쿠키의 `Path` 속성을 사용해 특정 애플리케이션에서만 접근 가능하도록 설정합니다.

   ```
   http코드 복사Set-Cookie: session_app1=abc123; Domain=example.com; Path=/app1; Secure; HttpOnly
   Set-Cookie: session_app2=xyz789; Domain=example.com; Path=/app2; Secure; HttpOnly
   ```



### **4. 보안 고려사항**

- 포트가 달라도 도메인이 동일하다면 쿠키가 공유될 수 있으므로, 민감한 데이터를 저장할 때는 **도메인과 경로를 신중하게 설정**해야 합니다.
- 쿠키 공유로 인해 발생할 수 있는 보안 문제(예: CSRF, 세션 탈취 등)를 방지하려면:
  - `HttpOnly`, `Secure`, `SameSite` 플래그를 적극적으로 사용합니다.
  - 서버 간에 민감한 데이터가 필요하다면 쿠키 대신 다른 인증 메커니즘(API 토큰 등)을 사용하는 것이 바람직합니다.


요약하면, 포트 번호에 따라 쿠키가 독립적으로 관리되지 않으며, 도메인과 경로에 따라 관리됩니다. 따라서 포트별로 별도의 쿠키를 관리하려면 이름이나 경로를 사용한 논리적 분리가 필요합니다.



## 크로스 도메인 환경에서 Cookie 전달하기

**`withCredentials`** 옵션은 XMLHttpRequest(XHR) 또는 Fetch API를 사용하여 서버와 클라이언트 간의 요청을 보낼 때, **크로스 도메인 요청에서 인증 정보를 포함할지 여부**를 설정하는 데 사용됩니다. 주로 **쿠키, HTTP 인증 헤더**, 그리고 TLS 인증서를 포함시키는 데 영향을 줍니다.



### **1. 기본 개념**

- `withCredentials`가 false (기본값)

  * 요청에 쿠키나 인증 정보를 포함하지 않습니다.

  - 서버에서 설정한 쿠키도 브라우저에 저장되지 않습니다.

- `withCredentials`가 true

  - 요청과 함께 인증 정보를 포함합니다.
  - 크로스 도메인 요청에서도 쿠키를 포함하고, 서버에서 설정한 쿠키를 브라우저에 저장할 수 있습니다.



### **2. 사용 방법**

#### **XMLHttpRequest에서 withCredentials**

```
javascript코드 복사const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://example.com/api/data', true);
xhr.withCredentials = true; // 인증 정보 포함
xhr.send();
```

#### **Fetch API에서 credentials**

- Fetch API는 `withCredentials` 대신 `credentials` 옵션을 사용합니다.

```
javascript코드 복사fetch('https://example.com/api/data', {
  method: 'GET',
  credentials: 'include' // 인증 정보 포함
});
```

- `credentials` 옵션 값
  - `omit`: 인증 정보 포함하지 않음 (기본값).
  - `same-origin`: 동일한 출처 요청에서만 인증 정보 포함.
  - `include`: 크로스 도메인 요청에서도 인증 정보 포함.



### **3. 주요 동작**

- **쿠키 전송**: 요청에 쿠키를 포함하거나, 서버에서 설정한 쿠키를 브라우저에 저장.
- CORS와 함께 사용 : ﻿withCredentials를 사용하려면 서버도 적절히 구성되어 있어야 합니다.
  - 서버 응답 헤더에 **Access-Control-Allow-Credentials: true**가 설정되어야 합니다.
  - 서버 응답 헤더의 **Access-Control-Allow-Origin**은 와일드카드(`*`)를 사용할 수 없고, 요청을 보낸 정확한 출처를 명시해야 합니다.



### **4. CORS와의 관계**

**CORS(Cross-Origin Resource Sharing)**를 지원하면서 `withCredentials` 옵션을 사용할 경우, 다음 조건을 충족해야 합니다:

#### 클라이언트 설정:
- `xhr.withCredentials = true` 또는 `credentials: 'include'`로 설정.

#### 서버 설정:
- **Access-Control-Allow-Credentials: true**를 응답 헤더에 포함.
- **Access-Control-Allow-Origin**에 요청을 보낸 출처(URL)를 정확히 지정. `*`은 사용할 수 없음.



### **5. 주의사항**

1. **보안 문제**:
   - 크로스 도메인 요청에 쿠키를 포함하면, CSRF(크로스 사이트 요청 위조) 취약점이 발생할 가능성이 높아집니다.
   - 이를 방지하기 위해 CSRF 토큰을 사용하거나, 요청을 철저히 검증해야 합니다.
2. **CORS 설정**:
   - 서버와 클라이언트 모두 적절히 설정되지 않으면 요청이 차단될 수 있습니다.
3. **브라우저 지원**:
   - 최신 브라우저는 `withCredentials` 및 Fetch API의 `credentials`를 지원하지만, 설정이 잘못되면 예상하지 못한 문제가 발생할 수 있습니다.