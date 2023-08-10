# Javascript Loading Sequence

웹 페이지를 접속하는 사용자에게 좀 더 빠른 화면을 보여주기 위한 Javascript 로딩 방법을 알아 봅니다.



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
![](blog/700_IT/Javascript_CSS_HTML/Javascript_Loading_Sequence.resources/without-defer-async-body.png)


## async property

script 태그의 async 속성은 javascript 파일을 비동기적으로 로딩(fetch)하고 위한 옵션입니다. async와 defer 모두 javascript 파일의 다운로드(fetch)는 비동기적으로 병렬(Parallel) 실행되지만, javascript 실행(Execute)는 차이점이 있습니다. 아래와 같이 script 태그에 async 속성이 정의되어 있으면, 웹 브라우저는 HTML 파싱이 완료되지 않아도, Javascript 파일이 다운로드가 완료되면, Javascript 파일을 실행합니다.


```
<script async src="script.js"></script>
```

![with-async](blog/700_IT/Javascript_CSS_HTML/Javascript_Loading_Sequence.resources/with-async.png)


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
![with-defer](blog/700_IT/Javascript_CSS_HTML/Javascript_Loading_Sequence.resources/with-defer.png)

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