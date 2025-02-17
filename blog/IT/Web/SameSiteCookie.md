# IFrame 내 세션 및 쿠키 미유지 문제와 해결 방안

최근 웹 브라우저의 보안 정책 강화로 인해, iframe 내에서 세션과 쿠키가 유지되지 않는 문제가 발생하고 있습니다. 이러한 현상은 주로 쿠키의 `SameSite` 속성 정책 변경과 관련이 있습니다. 



## 1. 문제 원인

기존에는 웹 브라우저에서 서버에서 쿠키를 생성할 때, 쿠키의 `SameSite` 속성이 명시되지 않은 경우, 웹 브라우저에서 기본 값이 `None`이었으나, 최근 Chrome과 Edge 등의 최신 웹 브라우저에서는 이를 `Lax`로 변경하였습니다. 이로 인해, 다른 도메인에서 iframe을 통해 콘텐츠를 불러올 때 쿠키가 전송되지 않아 세션이 유지되지 않는 문제가 발생합니다. 

Chrome 브라우저는 2020년 2월 4일에 출시된 80버전부터 쿠키의 `SameSite` 속성 기본값을 `None`에서 `Lax`로 변경하였습니다. 이로 인해, `SameSite` 속성을 명시하지 않은 쿠키는 기본적으로 `Lax`로 처리되어, 일부 크로스 사이트 요청에서 쿠키 전송이 제한될 수 있습니다. 

**크로스 사이트 요청**이란, 사용자가 현재 방문 중인 웹사이트와 다른 도메인으로의 요청을 의미합니다. 예를 들어, 아래와 같이 `a.com`에서 `b.com`으로의 요청은 크로스 사이트 요청으로 볼 수 있습니다.

![85745326a70c3265cf41353b15e75598](SameSiteCookie.assets/85745326a70c3265cf41353b15e75598.png)



**최신 Chrome과 Edge 브라우저의 기본 설정**이 보안 강화를 위해 `SameSite` 속성을 `Lax`로 설정합니다. 이로 인해, 크로스 사이트 요청 시 쿠키가 전송되지 않아 **세션이 유지되지 않거나 JWT 토큰이 전달되지 않는 문제**가 발생하면서 로그인 세션이 유지 되지 않는 현상이 발생합니다.





## 2. 웹 브라우저의 SameSite 속성 정책

**`SameSite` 속성**은 쿠키가 **크로스 사이트 요청**에 포함되는 방식을 제어하여 **CSRF(Cross-Site Request Forgery)** 공격을 방지하는 데 도움을 줍니다. 이 **`SameSite` 속성**은 다음과 같습니다. 

- **`Strict`**: 쿠키는 동일한 사이트에서 발생하는 요청에만 전송됩니다.
- **`Lax`**: 기본적으로 동일한 사이트에서 발생하는 요청에만 쿠키가 전송되지만, 일부 안전한 메서드(GET)나 탭에서의 링크 클릭 등은 예외로 인정되어 쿠키가 전송될 수 있습니다.
- **`None`**: 쿠키는 크로스 사이트 요청을 포함한 모든 상황에서 전송됩니다. 이 경우, **`Secure`** 속성을 함께 설정하여 쿠키가 HTTPS 연결에서만 전송되도록 해야 합니다.



## 3. 해결 방안

서로 다른 도메인을 참조하는 크로스 사이트에서 쿠키를 사용해야 하는 경우에는 쿠키 유지 되지 않는 현상에 대한 해결 방안으로는 다음과 같은 방법을 고려할 수 있습니다.

1. **`SameSite` 속성을 `None`으로 설정하고, `Secure` 속성을 추가**
   - 쿠키를 생성할 때 `SameSite=None; Secure`로 설정하여 크로스 사이트 요청에서도 쿠키가 전송되도록 합니다.
   - 이때, 애플리케이션이 HTTPS를 통해 제공되고 있는지 확인해야 합니다.
2. **프론트엔드와 백엔드를 동일한 사이트로 구성**
   - 프록시 서버를 사용하여 프론트엔드와 백엔드 간의 통신을 동일한 도메인 내에서 처리함으로써, **SameSite** 쿠키 제한으로 인한 세션 및 쿠키 미유지 문제를 해결할 수 있습니다. 이를 위해 웹 서버의 **리버스 프록시(Reverse Proxy)**를 설정합니다.
   - 프론트엔드와 백엔드를 동일한 최상위 도메인 하의 서브도메인으로 설정하여, 브라우저가 동일한 사이트로 인식하도록 합니다.
   - 예를 들어, 프론트엔드를 `frontend.example.com`, 백엔드를 `api.example.com`으로 설정합니다.
3. **쿠키 대신 다른 저장소 사용**
   - JSESSIONID 또는 JWT 토큰을 쿠키 대신 **로컬 스토리지**나 **세션 스토리지**에 저장하여 `SameSite` 속성의 영향을 받지 않도록 합니다.
   - **로컬 스토리지**나 **세션 스토리지**에 저장된 JSESSIONID 또는 JWT 토큰을 서버와 주고받기 위해, 쿠키 대신 Request Header 및 Response Header에 설정하여 전송할 수 있습니다.
   - WebSquare의 Submission을 통한 통신 시, Response Header에서 JSESSIONID 값을 가져오고 Request Header에 JSESSIONID 값을 설정하는 방법은 아래의 **6. WebSquare Submission Request & Response Header 핸들링**에서 설명하겠습니다.
   - 서버 측에서 쿠키 대신 Request Header와 Response Header에 JSESSIONID 또는 JWT 토큰을 저장하는 방법은 현재 사용 중인 서버 프레임워크 환경에 맞게 별도로 구현해야 합니다.
   - 쿠키가 아닌 다른 저장소를 사용할 경우, **XSS(Cross-Site Scripting)** 공격에 대비한 추가적인 보안 조치가 필요합니다.

**각 방법은 보안과 편의성 측면에서 장단점이 있으므로, 애플리케이션의 특성과 요구 사항에 따라 적절한 방안을 선택해야 합니다.** 



## 4. 코드 작성을 통한 `SameSite=None`, `Secure` 속성 추가 예시

서버에서 쿠키를 설정할 때 `SameSite=None`과 `Secure` 속성을 명시적으로 지정해야 합니다. 이를 통해 크로스 사이트 요청에서도 쿠키가 전송될 수 있습니다. 단, `Secure` 속성을 설정하려면 사이트가 HTTPS를 통해 제공되어야 합니다.



### 4.1. JAVA 예시 코드

Java 서블릿 환경에서는 `HttpServletResponse`를 사용하여 쿠키를 설정할 수 있습니다. 쿠키를 생성할 때 `SameSite=None`과 `Secure` 속성을 명시적으로 지정해야 합니다. 이를 통해 크로스 사이트 요청에서도 쿠키가 전송될 수 있습니다. 단, `Secure` 속성을 설정하려면 사이트가 HTTPS를 통해 제공되어야 합니다.

```java
response.setHeader("Set-Cookie", "key=value; SameSite=None; Secure");
```



### 4.2. Spring MVC Project 예시 코드

Spring MVC 환경에서는 인터셉터나 필터를 사용하여 응답 헤더에 `SameSite` 속성을 추가할 수 있습니다. 이를 통해 모든 응답에 대해 일관되게 `SameSite` 속성을 설정할 수 있습니다.

아래와 같이 SameSiteCookieFilter 클래스를 생성합니다.

```java
package com.inswave.wrm.interceptor;

import javax.servlet.*;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collection;

public class SameSiteCookieFilter implements Filter {

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        chain.doFilter(request, response);
        addSameSiteAttribute((HttpServletResponse) response);
    }

    private void addSameSiteAttribute(HttpServletResponse response) {
        String header = response.getHeader("Set-Cookie");
        if (header != null && header.contains("JSESSIONID")) {
            String updatedHeader = header + "; SameSite=None; Secure";
            response.setHeader("Set-Cookie", updatedHeader);
        }       
    }

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
		// TODO Auto-generated method stub
	}

	@Override
	public void destroy() {
		// TODO Auto-generated method stub
	}
}

```



web.xml 파일에 sameSiteCookieFilter를 추가합니다.

```xml
	<filter>
		<filter-name>sameSiteCookieFilter</filter-name>
		<filter-class>com.inswave.wrm.interceptor.SameSiteCookieFilter</filter-class>
	</filter>
	<filter-mapping>
		<filter-name>sameSiteCookieFilter</filter-name>
		<url-pattern>/*</url-pattern>
	</filter-mapping>
```



### 4.3. Spring Boot Project 예시 코드

Spring Boot 2.6.0 이상 버전에서는 application.properties 설정 파일을 통해 `SameSite` 속성을 간편하게 설정할 수 있습니다.

```properties 
server.servlet.session.cookie.same-site=none
```





## 5. 웹 서버 및 WAS 설정을 통한 `SameSite=None`, `Secure` 속성 추가 예시

웹 서버나 Apache Tomcat에서 쿠키의 `SameSite=None` 및 `Secure` 속성을 설정하는 방법은 다음과 같습니다.



### 5.1. Tomcat에서 설정하기

**Tomcat 버전 9.0.30 이상**에서는 다음과 같이 설정할 수 있습니다:

1. **`server.xml` 파일 수정**:

   `{TOMCAT_HOME}/conf/server.xml` 파일을 열어 `<Context>` 태그 내에 다음 설정을 추가합니다:

   ```xml
   <Context docBase="xxx" path="/" reloadable="true" source="org.eclipse.jst.jee.server:xxx">
   	<CookieProcessor sameSiteCookies="none" secure="true"/>
   </Context>
   ```

   이 설정은 쿠키의 `SameSite` 속성을 `None`으로 지정합니다. 

   <u>**주의**: `Secure` 속성을 설정하려면 웹 서버가 HTTPS를 통해 서비스를 제공해야 합니다.</u>

   

2. **`web.xml` 파일 수정**:

   `{TOMCAT_HOME}/conf/web.xml` 파일을 열어 `<session-config>` 태그 내에 다음 설정을 추가합니다:

   ```xml
   <session-config>
       <cookie-config>
           <http-only>true</http-only>
           <secure>true</secure>
       </cookie-config>
   </session-config>
   ```

   이 설정은 쿠키에 `HttpOnly`와 `Secure` 속성을 추가하여 보안을 강화합니다. 

   

### 5.2. Apache HTTP Server에서 설정하기

Apache HTTP Server를 사용하는 경우, 다음과 같이 설정할 수 있습니다:

1. **`httpd.conf` 파일 수정**:

   `httpd.conf` 또는 관련 설정 파일에서 다음 지시문을 추가합니다:

   ```
   Header always edit Set-Cookie (.*) "$1; Secure SameSite=None;"
   ```
   
   이 설정은 모든 `Set-Cookie` 헤더에 `Secure` 및 `SameSite=None` 속성을 추가합니다. 
   
   

### 5.3. Nginx에서 설정하기

Nginx를 사용하는 경우, 다음과 같이 설정할 수 있습니다:

1. **`nginx.conf` 파일 수정**:

   `nginx.conf` 또는 관련 설정 파일에서 서버 블록 내에 다음 지시문을 추가합니다:

   ```
   location / {
       proxy_cookie_path / "/; secure; SameSite=None";
   }
   ```

   이 설정은 모든 쿠키 경로에 `Secure` 및 `SameSite=None` 속성을 추가합니다. 


### 5.4. 주의사항
- `SameSite=None` 설정 시 반드시 `Secure` 속성을 함께 지정해야 하며, 이는 HTTPS 프로토콜을 사용해야 함을 의미합니다.
- 웹 서버의 설정 변경 후에는 반드시 해당 서버를 재시작하여 변경 사항을 적용해야 합니다.



## 6. WebSquare Submission Request & Response Header 핸들링

쿠키를 사용하면 서버와 데이터 통신 시 별도의 작업을 진행하지 않아도 웹 브라우저 쿠키에 저장된 JSESSIONID를 자동으로 서버에 전달하지만, 쿠키를 사용하지 않고 LocalStorage와 SessionStorage에 JSESSIONID를 저장하게 되면, 자동으로 JSESSIONID 값이 서버에 전달되지 않기 때문에, Submission를 이용해서 request를 보내고, response를 받을 때, JSESSIONID 값을 전달하고 받는 코드를 작성하셔야 합니다.

WebSquare에서 서버와 데이터 통신을 위해서 사용하는 Submission에서 서버와 데이터를 송수신할 때, Request & Response Header를 통해서 JSESSIONID 값을 전달하고, 가져오는 방법을 소개합니다.



### 6.1. Submission Request Header에 값 설정하기

Submission Request Header에 값을 설정하기 위해서는 아래와 같이 setRequestHeader API를 사용하시면 됩니다.

아래는 LocalStorage에 저장된 JSESSIONID 값을 가져와서, Submission Request Header에 "jsessionid"라는 Key로 JSESSIONID를 저장하는 예시 코드입니다.

```javascript
// Local Storage를 사용하시면 웹 브라우저가 종료된 이후에도 jsessionid 값이 유지됩니다.
const jSessionId = localStorage.getItem("jsessionid");

// Session Storage를 사용하시면 웹 브라우저가 종료되기 전까지 jsessionid 값이 유지됩니다.
// const jSessionId = sessionStorage.getItem("jsessionid");
submission1.setRequestHeader({ "jsessionid" : jSessionId });
```

$p.executeSubmission API로 submssion1를 실행하면  Submission Request Header에 "jsessionid"라는 Key로 JSESSIONID를 저장되어 서버에 전송이 됩니다.



### 6.2. 모든 Submission 실행 시 Request Header에 JSESSIONID 전달하기

모든 Submission 실행 시 Request Header에 JSESSIONID 전달하기 위해서는 웹스퀘어 클라이언트 설정 파일인 config.xml의 submission > preSubmitFunction 설정을 통해서 할 수 있습니다.

```xml
<submission>
    <processMsg value=""/>
    <showSubmissionTime value="true"/>
    <!-- 아래와 같이 preSubmissionFunction을 함수명을 설정합니다. -->
    <preSubmitFunction value="com.sbm.__preSubmitFunction"/>		
</submission>
```
아래의 코드는 com.sbm.__preSubmitFunction 함수의 구현 예시 입니다.

```javascript
/**
 * submission의 공통 설정에서 사용되며, submission 통신 직전 호출됨.
 * return true일 경우 통신 수행, return false일 경우 통신 중단
 * 
 * @param {Object} sbmObj 서브미션 객체
 * @returns {Boolean} 통신수행여부
 */
com.sbm.__preSubmitFunction = function (sbmObj) {
    const jSessionId = localStorage.getItem("jsessionid");
    // const jSessionId = sessionStorage.getItem("jsessionid");    
    sbmObj.setRequestHeader({ "jsessionid" : jSessionId }); 
};
```



### 6.3. Submission Response Header에서 값 가져오기

Submission을 통해 서버에서 전달된 Response Header에서 JSESSIONID 값을 가져오는 방법은 다음과 같습니다.

아래는 LocalStorage에 저장된 JSESSIONID 값을 가져와서, Submission Request Header에 "jsessionid"라는 Key로 JSESSIONID를 저장하는 예시 코드입니다.

```javascript
/**
 * Submission 실행이 완료되면 실행되는, submitdone 이벤트의 첫번째 파라미터(e)에 서버에 전달한 Response Header, Response Body 데이터가 저장되어 있습니다.
 */
scwin.sbm_Login_submitdone = async function (e) {
    // Response Header에 저장된 데이터를 JSON 객체로 변환해서 responseHeader에 저장합니다.
    const responseHeader = JSON.parse(e.responseHeadersJSON);
    const jSessionId = responseHeader.jsessionid;
    
    // localStorage에 Response Header에 저장되서 서버로 부터 전달받은 jsessionid 값을 저장합니다.
    // Local Storage를 사용하시면 웹 브라우저가 종료된 이후에도 jsessionid 값이 유지됩니다.
    localStorage.setItem("jsessionid", jSessionId);
    
    // Session Storage를 사용하시면 웹 브라우저가 종료되기 전까지 jsessionid 값이 유지됩니다.
    // sessionStorage.setItem("jsessionid", jSessionId);
};
```





## 7. 참고 사이트

- https://chgbook.tistory.com/35
- https://web.dev/articles/samesite-cookie-recipes?hl=ko
- https://web.dev/articles/samesite-cookies-explained?hl=ko
- https://marklee1117.tistory.com/53
- https://chromestatus.com/feature/5088147346030592
- https://jake-seo-dev.tistory.com/392
- https://developer.mozilla.org/en-US/docs/Web/Privacy/Third-party_cookies
- https://www.certkorea.co.kr/bbs/board.php?bo_table=31&wr_id=42&utm_source=chatgpt.com

