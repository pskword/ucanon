# Maintainable Javascript

* 'Maintainable Javascript'을 읽으면서 메모한 몇 가지 내용들을 정리해 본다.



## Warning

* strict Mode는 전역으로 선언하지 않는다.
* strict 모드는 함수 안에서만 사용해야 하며 절대로 전역으로 사용하지 않아야 한다.

```javascript
(function() {

    "use strict"

    function doSomething() {

    }

    function doSomethingElse() {

}
```

* eval()은 절대 사용하지 않는다.
* with 문은 절대 사용하지 않는다. 이 문장은 strict 모드에서 사용할 수 없을 뿐만 아니라 앞으로 나올 ECMAScript에서 사용할 수 없게 될 수도 있다.



## const

* ECMAScript6에 상수 선언 추가됨

```javascript
const MAX_COUNT = 30;
```



## null

####  null을 사용하는 경우

* 나중에 값을 할당할 변수를 초기화할 때
* 선언한 변수에 값이 할당되었는지 비교할 때
* 인자 값으로 객체를 넘기는 함수를 호출할 때
* 함수를 호출한 곳에서 반환값으로 객체를 기대할때

#### null을 사용하면 안되는 경우

* 함수의 인자 값을 확인하기 위해서 null로 비교해서는 안됨
* 초기화되지 않은 변수를 null로 비교해서는 안됨



## undefined

```javascript
var person;

console.log(typeof person);

>> undefined

undefined

console.log(typeof person2);

>> undefined

// 변수를 선언한 경우나 선언하지 않은 경우 모두 undefined가 반환됨
```



## Object && Array

```javascript
var book = {

    title : "Javascript Guide Book",

    author : "KK James"

};

​

var colors = [ "yellow", "orange", "white", "black" ];

var nums = [ 1, 2, 3, 4, 5];
```



## Comment

```javascript
// 좋은 주석 예제

if (condition) {

    

    // 주석 앞에는 빈 줄을 추가하면 가독성을 높일 수 있다.

    isStatus();

}

​

/* 

여러줄 주석 예제-1

여러줄 주석 예제-2

*/

​

// 좋은 주석 예제

if (condition) {

    

    /*

      * '*'를 이용해서 여러 줄의 주석을 추가할 수 있다.

      * '*'를 이용해서 왼쪽 정렬로 주석을 작성하면 주석을 깔끔하게 작성할 수 있다.

      */

    isStatus();

} 
```

