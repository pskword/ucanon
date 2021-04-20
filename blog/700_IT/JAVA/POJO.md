# POJO

* Plain Old Java Object
* 오래된 방식의 자바 오브젝트
* JAVA EE 등의 중량 프레임워크들을 사용하게 되면서 해당 프레임워크에 종속된 무거운 객체를 만들게 된 것에 반발해서 사용한 용어
* 2000년 9월에 마틴 파울러, 레베카 파슨, 조쉬 맥킨지 등이 사용하기 시작한 용어
* 마틴 파울러는 "우리는 사람들이 자기네 시스템에 보통의 객체를 사용하는 것을 왜 그렇게 반대하는지 궁금하였는데, 간단한 객체는 폼 나는 명칭이 없기 때문에 그랬던 것이라고 결론 지었다. 그래서 적당한 이름을 하나 만들어 붙였더니, 아 글쎄, 다들 좋아하더라고." 라고 말했다.
* 자바 객체가 ORM 기술을 사용하기 위해서 Hibernate 프레임워크를 직접 의존하는 순간. POJO라고 할 수가 없다. 특정 '기술'에 종속되기 때문이다.
* 토비님은 진정한 POJO란 객체지향적인 원리에 충실하면서, 환경과 기술에 종속되지 않고 필요에 따라서 재활용될 수 있는 방식으로 설계된 오브젝트라고 정의했다. 


### POJO Sample Class

```java
public class SimpleBean {
    private String id;
    private String name;
    
    public void setId(String id) {
        this.id = id;
    }
    
    public void getId() {
        return this.id;
    }
    
    public void setAge(String age) {
        this.age = age;
    }
    
    public String getAge() {
        return this.age;
    }
}
```


### Javascript에서 Plain Object 

* jQuery.isPlainObject 함수 테스트 결과

```javascript
jQuery.isPlainObject("11");
false
jQuery.isPlainObject(11);
false
jQuery.isPlainObject({});
true
jQuery.isPlainObject([]);
false
jQuery.isPlainObject([1,2,3]);
false
jQuery.isPlainObject([{id : "A001", name : "홍길동"}, {id : "A002", name : "김남길"}]);
false
jQuery.isPlainObject({id : "A001", name : "홍길동"});
true
jQuery.isPlainObject(true);
false
jQuery.isPlainObject(null);
false
```

* 위의 결과를 정리해보면, number, string, boolean, array 등의 Data Type은 모두 Plain Object가 아닌 것으로 판단하고 있다. 
* {}와 {id : "A001", name : "홍길동"} 만 Plain Object로 인식하고 있다.
* [{id : "A001", name : "홍길동"}, {id : "A002", name : "김남길"}]를 Plain Object가 아닌 것으로 판단하는 부분이 애매한데, 이것을 Plain Object로 보려고 한다면 첫번째 배열의 요소를 jQuery.isPlainObject 함수로 검사하면 될 것 같다.

