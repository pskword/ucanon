#      **Arduino** **Sunflower**  소스 코드 분석

```c
#include <Wire.h> // LCD
#include <LiquidCrystal_I2C.h> // LCD
#include <Servo.h>//servo 제어하기 위한 객체 제공
```
```c
LiquidCrystal_I2C lcd(0x27, 16, 2);
```

* 0x27번 LCD 주소에 16개의 문자를 2개 라인에 표시한다.

```c
int sensorPin = A0; 
int servoPin  = 9;     // 서브모터 연결 핀 번호

int sensorValue = 0;
int servoGrad = 90;    // 서브모터 각도
int tolerance = 40;    // 허용 오차
```



```c
Servo myservo;
```

* 서브모터 제어를 위한 객체를 선언한다.

```c
void setup() {
  pinMode(sensorPin, INPUT); // 디지털 핀(A0)을 입력으로 설정한다. 조도 센서를 위한 핀을 입력 모드로 설정한다.
  myservo.attach(servoPin); // myServo라고 이름 붙인 서보를 servoPin(9)번 핀으로 컨트롤하도록 설정한다.
  myservo.write(servoGrad); // myServo라는 서보모터의 각도를 servoGrad(90)도로 설정한다.

  lcd.begin();    // LCD를 초기화한다.
  lcd.clear();    // LCD 화면을 모든 내용을 지운다.
}
```

* pinMode 
  *  특정 핀을 입력 또는 출력으로 동작하도록 설정합니다. 
  *  `pin`: 모드를 설정하려는 핀 번호 
  *  `mode`: `INPUT`, `OUTPUT`, 또는 `INPUT_PULLUP` 
* 관련 사이트
  *  [LCD 라이브러리 설명]( https://kocoafab.cc/tutorial/view/689 )

```c
void loop() {
  sensorValue = analogRead(sensorPin);  // 조도센서를 위한 핀(sesorPin)에서 밝기 값을 읽어 온다.
  if ( sensorValue < (512 - tolerance) ) // sensorValue 값이 472보다 작은 경우
  {
    if (servoGrad < 180) servoGrad++; // servoGrad 가 180도 미만인 경우  90에서 91,92,93으로 증가하는 것을 나타냅니다. 
  }

  if ( sensorValue > (512 + tolerance) ) // 552보다 큰경우
  {
    if (servoGrad > 0) servoGrad--;  // servoGrad 가  0 도 보다 클 경우 1도씩 감소  90도 이하로 감소
  }
  lcd.setCursor(5, 0);    // 첫번째(0번째) 행, 5번째 컬럼 위치로 커서를 이동한다.
  lcd.print("VALUE = ");  // LCD 화면에 "VALUE = "을 출력한다.
  lcd.setCursor(6, 1);    // 첫번째(1번째) 행, 6번째 컬럼 위치로 커서를 이동한다.
  lcd.print(sensorValue); // 조도 센서의 값을 화면에 출력한다.
  myservo.write(servoGrad);   // myServo라는 서보모터의 각도를 servoGrad 값으로 조정한다.
  delay(100);    // 0.1초간 대기한다.
  lcd.clear();   // LCD 화면의 모든 내용을 지운다.
}
```

* 조도센서
  * 조도센서는 극성은 없으나 빛의 양에 따라 전도율이 변한다. 빛의 양이 많아질 수록 전도율이 높아져 저항이 낮아진다.
  * 그러나 전도율이 밝기에 비례하여 선항적으로 증가하는 것이 아니기 때문에 정확한 LUX 값을 구하기 보다는 밝고 어두운 정도만을 판별하기에 적합하다.
  *  조도센서로 부터 입력되어지는 전압의 크기 (0~5V)에 따라 0~1023 범위의 값으로 변환되어 반환합니다. 
* 관련 사이트
  * [조도 센서 설명](https://kocoafab.cc/tutorial/view/754)
  * [솔라 트래커 만들기]( https://kocoafab.cc/make/view/341 )
  * [인사하는 해바라기 만들기](http://blog.naver.com/PostView.nhn?blogId=vitro6273&logNo=221171734829&redirect=Dlog&widgetTypeCall=true&directAccess=false)

