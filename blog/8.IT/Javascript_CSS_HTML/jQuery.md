# jQuery Syntax

* 본 내용은  [w3schools.com](https://www.w3schools.com/) 사이트에서  jQuery를 학습하며 메모한 내용들을 정리합니다.



## Selector Basic Examples

```javascript
$(this) // 현재 Element를 선택한다.
$("p") // 모든 <p> Element를 선택한다.
$(".test") // "test" class가 적용된 모든 Element를 선택한다.
$("#test") // id가 "test"인 Element를 선택한다.
$("*") // 모든 Element를 선택한다.
$("p.intro")  // "intro" class를 가지는 모든 p Element를 선택한다.
$("p.first")  // 첫번째 p Element를 선택한다.
$("ul li:first") // 첫번째 ul Element에서 첫번째 li를 선택한다.
$("ul li:first-child") // 모든 ul Element에서 첫번째 li를 선택한다.
$("[href]") // href 속성을 가진 모든 요소를 선택한다.
$("a[target='_blank']") // target 속성이 "_blank"인 모든 Element를 반환한다.
$("a[target!='_blank']") // target 속성이 "_blank"이 아닌 모든 Element를 반환한다.
$(":button") // type 속성이 "button"인 모든 input element를 반환한다.
$("tr:even") // tr 중에서 모든 짝수 Element를 반환한다.
$("tr:odd") // tr 중에서 모든 홀수 Element를 반환한다.
```

> https://www.w3schools.com/jquery/jquery_selectors.asp



## Document Ready Event

```javascript
$(doucment).ready(function() {
    // jQuery를 사용하는 Script를 작성한다.
})
```

* Document Ready Event는 Document 로딩이 완료 되는 이벤트입니다.
* Document 내에 Element들을 제어해야 하는 코드가 있다면 Document Ready 이벤트 안에 작성하면 됩니다.
* Document Ready Event는 아래와 같이 짧게 작성할 수도 있습니다.

```javascript
$(function() {
    // jQuery를 사용하는 Script를 작성한다.
})
```

