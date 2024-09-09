# Javascript Loading Sequence

웹 페이지를 접속하는 사용자에게 좀 더 빠른 화면을 보여주기 위한 Javascript 로딩 방법을 알아 봅니다.


자바스크립트 로딩 순서는 웹 페이지의 성능과 사용자 경험에 중요한 영향을 미칩니다. 주요 내용은 다음과 같습니다:

1. 일반적인 HTML 구조:
   - <head> 태그 내에 CSS와 JavaScript 파일을 포함
   - 이 방식은 JavaScript 파일이 HTML 파싱 전에 다운로드되고 실행되어 페이지 로딩 시간을 지연시킬 수 있음

2. 권장되는 Script 위치:
   - JavaScript 파일을 <body> 태그의 맨 끝에 배치
   - 이 방법으로 HTML이 먼저 파싱되어 사용자에게 빠르게 화면을 보여줄 수 있음
   - 페이지 로딩 속도가 개선되어 사용자 경험이 향상됨

3. defer와 async 속성:
   - defer: 
     • 스크립트를 백그라운드에서 다운로드하고 HTML 파싱이 완료된 후 실행
     • DOM을 제어하는 스크립트에 적합
     • 여러 스크립트 간의 실행 순서가 보장됨
   - async: 
     • 스크립트를 백그라운드에서 다운로드하고 준비되는 대로 실행 (HTML 파싱과 병렬로 진행)
     • DOM과 독립적인 스크립트에 적합
     • 실행 순서가 보장되지 않음

4. 성능 최적화:
   - CSS 파일은 <head> 태그에 유지하여 빠른 스타일 적용
   - JavaScript 파일은 페이지 콘텐츠 후에 로드하거나 defer/async 속성 사용
   - DOM 조작이 필요한 중요한 스크립트는 defer 사용
   - 분석 도구나 광고 스크립트와 같은 독립적인 스크립트는 async 사용 고려

이러한 방식으로 JavaScript를 로딩하면 웹 페이지의 성능을 최적화하고 사용자에게 더 나은 경험을 제공할 수 있습니다. defer는 특히 DOM 구조에 의존하는 스크립트에 유용하며, 문서 로딩이 완료된 후 실행되므로 안전하게 DOM을 조작할 수 있습니다.



## HTML 파싱 및 렌더링 과정


## 일반적인 HTML 
일반적인 CSS와 Javascript 파일이 포함된 HTML 파일입니다.

```html
<!DOCTYPE html>
<html lang="ko">
<head>
	<meta charset="UTF-8">
	<title>HTML Rendering</title>
	<link rel="stylesheet" type="text/css" href="default.css">
	<script src="/js/jquery.js"></script>
	<script src="/js/common.js"></script>
</head>
<body>
	<ul>
		<li>HTML를 렌더링합니다.</li>
	</ul>
	<img src="/images/intro.png" alt="">
</body>
</html>
```
아래는 위의 HTML 파일이 웹 브라우저에 로딩될 때, HTML과 Javascript의 실행 과정을 보여줍니다. hear 태그 아래에서 script 태그를 추가해서 javascript 파일(jquery.js, common.js)을 추가할 경우 body 태그 아래에 HTML 파싱전에 파일을 다운로드 받고, 실행하기 됩니다.


## 권장하는 Script 위치 조정 HTML
```html
<!DOCTYPE html>
<html lang="ko">
<head>
	<meta charset="UTF-8">
	<title>HTML Rendering</title>
	<link rel="stylesheet" type="text/css" href="default.css">
</head>
<body>
	<ul>
		<li>HTML를 렌더링합니다.</li>
	</ul>
	<img src="/images/intro.png" alt="">
	<script src="/js/jquery.js"></script>
	<script src="/js/common.js"></script>
</body>
</html>
```
hear 태그 안에 script 태그를 넣어서 javascript 파일을 실행할 경우 화면 렌더링 시간이 지연될 수 있습니다. 따라서 위와 같이 script 태그를 body 태그 맨 아래에 추가하면 사용자에게 빠르게 화면을 보여줄 수 있습니다.
![](/blog/IT/Javascript_CSS_HTML/Javascript_Loading_Sequence.resources/without-defer-async-body.png)


## async property

script 태그의 async 속성은 javascript 파일을 비동기적으로 로딩(fetch)하고 위한 옵션입니다. async와 defer 모두 javascript 파일의 다운로드(fetch)는 비동기적으로 병렬(Parallel) 실행되지만, javascript 실행(Execute)는 차이점이 있습니다. 아래와 같이 script 태그에 async 속성이 정의되어 있으면, 웹 브라우저는 HTML 파싱이 완료되지 않아도, Javascript 파일이 다운로드가 완료되면, Javascript 파일을 실행합니다.


```
<script async src="script.js"></script>
```

![with-async](Javascript_Loading_Sequence.resources/with-async.png)


### async 의 문제점

Javascript에 async를 정의하면 HTML Parsing과 Javascript 다운로드를 동시에 진행하고 HTML Parsing이 완료 여부와 상관없이 Javascript를 빠르게 실행하는 장점이 있습니다.

그러나 Javascript에서 실행하는 코드가 HTML DOM을 제어하는 코드가 있다면, DOM 아직 파싱되기 전에 접근할 경우 예상치 못한 에러가 발생할 수 있다는 점을 유의해야 합니다.

따라서 HTML DOM을 제어하는 코드의 실행은 async 속성이 정의된 javascript 파일에서 실행할 때 주의해야 합니다.


## defer property

아래는 script 태그에 defer 속성을 정의한 예입니다.

```script
<script defer src="script.js"></script>
```
script 태그의 defer 속성은 javascript 파일을 비동기적으로 서버에 요청에서 다운로드(fetch) 받지만, 다운로드 받은 javascript 파일의 실행은 HTML을 모두 파싱한 이후에 실행합니다.
![with-defer](Javascript_Loading_Sequence.resources/with-defer.png)

## async & defer 지원 브라우저

* IE는 defer의 경우 예전부터 부분 지원하고 있으나 async 속성은 10 버전 이상부터 지원(defer 완전 지원 포함)
* Firefox는 3.6 버전부터 모두 지원
* chrome은 8 버전부터 모두 지원
* safari는 5 버전부터 모두 지원(단, 5버전에서는 async=false 지원 안함)
* ios safari는 5.1 버전부터 모두 지원
* android는 3 버전부터 모두 지원




## Reference

> * [https://flaviocopes.com/javascript-async-defer/](https://flaviocopes.com/javascript-async-defer/)
> * [https://developers.google.com/web/fundamentals/performance/critical-rendering-path/constructing-the-object-model?hl=ko](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/constructing-the-object-model?hl=ko)
> * [https://developers.google.com/web/fundamentals/performance/critical-rendering-path/analyzing-crp?hl=ko](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/analyzing-crp?hl=ko)
> * [https://boxfoxs.tistory.com/408](https://boxfoxs.tistory.com/408)
> * [https://webclub.tistory.com/630](https://webclub.tistory.com/630)
> * [https://blog.asamaru.net/2017/05/04/script-async-defer](https://blog.asamaru.net/2017/05/04/script-async-defer/)