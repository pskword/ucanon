# escape, encodeURI, encodeURIComponent 인코딩 함수 비교

javascript의 escape, encodeURI, encodeURIComponent 인코딩 함수의 동작을 비교합니다.



## escape

* ASCII 문자에 해당하지 않는 문자들을 모두 16진수 형태로 바꾸어 줍니다.
* 표기법은 1바이트일 경우 %XX이고, 2바이트일 경우 %uXXXX입니다.
* unescape 함수를 통해서 다시 디코딩할 수 있습니다.
* MDN 사이트에서  [escape 함수 설명](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/escape)을 보면, 하위 호환성을 위해서 ECMA-262 스펙에서 Deprecated 되지 않았지만, 새로운 자바스크립트 코드를 작성할 때는 escape 함수를 사용하지 말 것을 권고하고 있습니다.

```javascript
escape("!_한글, Hangul_!")
>> "%21_%uD55C%uAE00%2C%20Hangul_%21"
unescape("%21_%uD55C%uAE00%2C%20Hangul_%21")
>>ㄴ "!_한글, Hangul_!"
```



## encodeURI

* encodeURI 함수는 "A-Z a-z 0-9 ; , / ? : @ & = + $ - _ . ! ~ * ' ( ) #"를 제외하고 escape 처리를 수행합니다.
* decodeURI 함수를 통해서 다시 디코딩할 수 있습니다.

```javascript
encodeURI("https://tistory.com/_hangul한글!")
>> "https://tistory.com/_hangul%ED%95%9C%EA%B8%80!"
decodeURI("https://tistory.com/_hangul%ED%95%9C%EA%B8%80!")
>> "https://tistory.com/_hangul한글!"
```



## encodeURIComponent

* encodeURIComponent 함수는 "A-Z a-z 0-9 - _ . ! ~ * ' ( )"를 제외하고 escape 처리를 합니다.
* decodeURICompoent 함수를 통해서  다시 디코딩할 수 있습니다.
* 아래의 예제 코드의 실행 결과를 보면, encodeURI 함수와 다르게 URL의 '/'도 escape 처리된 것을 볼 수 있습니다.

```javascript
encodeURIComponent("https://tistory.com/#_hangul한글!")
>> "https%3A%2F%2Ftistory.com%2F%23_hangul%ED%95%9C%EA%B8%80!"
decodeURIComponent("https%3A%2F%2Ftistory.com%2F%23_hangul%ED%95%9C%EA%B8%80!")
>> "https://tistory.com/#_hangul한글!"
```



## escape, encodeURI, encodeURIComponent 사용 용도 비교

* escape 함수는 사용하지 않습니다. (비권장)
* URI 전체를 인코딩할 때는 encodeURI를 사용합니다.
* URI에서 파라미터만을 인코딩할 때는 encodeURIComponent를 사용합니다.



## Reference

* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/escape
* https://tc39.es/ecma262/#sec-escape-string
* https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/encodeURI
* https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent

