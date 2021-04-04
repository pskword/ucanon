# Javascript the good parts(자바스크립트 핵심 가이드)

Javascript the good parts을 읽으며 메모한 내용들을 기록해 봅니다.



## NaN

NaN은 수치 연산을 해서 정상적인 값을 얻지 못할 때 반환되는 값입니다.
isNaN() 함수를 통해서 NaN인지 비교할 수 있습니다.

```javascript
function isNumber(value) {
    if (isNaN(value)) { 
        console.log(value + ' is not number.'); 
    } else { 
        console.log(value + ' is number.'); 
    }
}
isNumber(123);
isNumber("abc");

>> 123 is number.
>> abc is not number.
```



## var

var 문은 함수 내부에서 사용될 때 함수의 private 변수를 정의합니다.



## false, null, undefined, '', 0, NaN

거짓에 해당하는 값들입니다. 나머지 모든 값은 참입니다.



## **hasOwnProperty**

```javascript
for (myvar in obj) {
     if (obj.hasOwnProperty(myvar)) {   // 객체 속성인지 프로토타입 체인 상에 있는 것인지 확인
     }
}
```



## for-in

```javascript
var txt="";
var person={fname:"John",lname:"Doe",age:25};

for (var x in person) {
  txt = txt + person[x];
}

// json 형식으로 키와 값으로 배열을 만들어 놓자..
var tmpObj = [{"name":"red", "code":"#FF0000"}, {"name":"blue", "code":"#0000FF"}, {"name":"green", "code":"#00FF00"}];

var result="";
for(var i = 0; i< tmpObj.length; i++){
    for(var obj in tmpObj[i]){
     result+=("\n key :" + obj + ", value " + tmpObj[i][obj]);
    }
  result+="\n";
}
alert(result);

// 출력결과
key :name, value red
key :code, value #FF0000

key :name, value blue
key :code, value #0000FF

key :name, value green
key :code, value #00FF00
```



## 객체 리터털

```javascript
var empty_object = {};

var stooge = {
     "first-name" : "Jerome",
     "last-name" : "Howard"
};
```



속성의 이름은 어떤 문자열이라도 가능합니다. 여기에도 빈 문자열도 포함합니다. 속성 이름에 대한 따옴표는 속성 이름이 자바스크립트에서 사용할 수 있는 유요한 이름이고 예약어가 아닐 경우에는 생략할 수 있습니다. 그러므로 "first-name"이라는 속성명은 반드시 따옴표를 사용해야 하지만, first_name은 사용해도 되고 안 해도 됩니다.



```javascript
var flight = {
     airline : "Oceanic",
     number: 815,
     departure: {
          IATA: "SYD",
          time: "2004-09-22 14:55"
          city: "Sydney"
     },
     arrival {
          IATA: "LAX",
          time: "2014-09-23 10:42",
          city: "Los Angeles"
     }
};

stooge["first-name"]
flight.number

var middle = stoogle["middle-name"] || "(none)";
var status = flight.status || "unknown";

stooge.nickname = "Curly";
stooge['nickname'] = "Cherry"
```



## Prototype

모든 객체는 속성을 상속하는 프로토타입 객체에 연결되어 있습니다. 객체 리터럴로 생성되는 모든 객체는 자바스크립틔 표준 객체인 Object의 속성인 prototype(Object.prototype) 객체에 연결됩니다.

```javascript
if (typeof Object.create !== 'function') {
     Object.create == function(o) {
          var F = function() {};
          F.prototype = o;
          return new F();
     };
}

var another_stooge = Object.create(stooge);
```



## Reflection

```javascript
typeof flight.number     // 'number'
typeof flight.status        // 'string'
typeof flight.arrival        // 'object'
typeof flight.manifest    // 'undefined'
typeof flight.toString     // 'function'
typeof flight.constructor     // 'function'

flight.hasOwnProperty('number')      // true
flight.hasOwnProerpty('constructor') // false: 프로토타입 체인은 바라보지 않습니다.
```



## Enumeration

```javascript
var name;
for (name in another_stooge) {
     if (typeof anonther_stooge[name] !== 'function') {
          document.writeln(name + ': ' + another_stooge[name]);
     }
}

var i;
var properties = [ 'first-name', 'middle-name', 'last-name', 'profession'];
for (i=0 i<properties.length; i + 1) {
     document.writeln(properties[i] + ': ' + another_stooge[properties[i]]);
}
```



## 속성 삭제

```javascript
student.nickname;
delete student.nickname;
```



## 함수 객체

자바스크립트에서 함수는 객체입니다. 객체는 앞서도 설명한 것처럼 프로토타입 객체로 숨겨진 연결을 갖는 이름/값 쌍의 집합체입니다. 객체 중에서 객체 리터럴로 생성되는 객체는 Object.prototype에 연결됩니다. 반면에 함수 객체는 Function.prototype에 연결됩니다. 또한 모든 함수는 두 개의 추가적인 속성이 있는데, 이 속성들은 함수의 문맥(context)과 함수의 행위를 구현하는 코드(code)입니다.

모든 함수 객체는 prototype이라는 속성이 있습니다. 이 속성의 값은 함수 자체를 값으로 갖는 constructor라는 속성이 있는 객체입니다. 이는 Function, Prototype으로 숨겨진 연결과는 구분됩니다. 



## 메소드 호출 패턴

```javascript
var myObject = {
     value : 0,
     increment: function(inc) {
          this.value += typeof inc === 'number' ? inc : 1;
     }
};

myObject.increment();
document.writeln(myObject.value);

myObject.increment();
document.writeln(myObject.value);
```



메소드는 자신을 포함하는 객체의 속성들에 접근하기 위해서 this를 사용할 수 있습니다. 즉 this를 사용해서 객체의 값을 읽거나 변경할 수 있습니다. this와 객체의 바인딩은 호출 시에 일어납니다. 이렇게 매우 늦은 바인딩은 this를 효율적으로 사용하는 함수를 만들 수 있습니다. 자신의 객체 문맥을 this로 얻는 메소드를 public 메소드라고 부릅니다.



## 생성자 호출 패턴

```javascript
var Quo = function (stirng) {
     this.status = string;
}

Quo.prototype.get_status = function() {
     return this.status;
};

var myQuo = new Quo("confused");
document.writeln(myQuo.get_status());
```



## 인수배열
```javascript
var sum function ( ) {
     var i, sum 0; 
     for (i 0; i < arguments.length; i += 1) sum += arguments[i]; 
     return sum; 
};
document.writeln(sum(4, 8, 15, 16, 23, 42)); //108
```



## 속성값의 갱신

```javascript
stooge['middle-name'] = 'Lester';
stooge.nickname = 'curly'
var middle = stooge["middle-name"] || "(none)";
```



## 객체 참조

```javascript
var a = {}, b = {}. c = {};      // a, b, c는 서로 다른 빈 객체를 참조
a = b = c = {}';     // a, b, c는 모두 같은 빈 객체를 참조
```

