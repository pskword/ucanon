function addOutput(num){
 var display = document.getElementById("display");
 display.value = display.value + num;
}

function calculate(){
  var display = document.getElementById("display");
  var resultValue = eval(display.value);
  var result = document.getElementById("result");
  result.value = resultValue;
}
function reset(){
  var display = document.getElementById("display")
  display.value = null;
}
function del(){
  var display = document.getElementById("display")
  display.value = display.value.substring(0, display.value.length - 1)
}


<!--
w3schools.com
developer.mozilla.org
