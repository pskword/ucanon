// 함수 선언문
function testFunc() {
    console.log('testFunc() 호출됨');
};

testFunc(); // testFunc() 호출됨

// 함수 표현식
testFunc2(); // Error: testFunc2 is not a function

let testFunc2 = function() {
    console.log('testFunc2() 호출됨');
};

