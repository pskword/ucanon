# My Calendar Project

사용자 별 스케쥴을 관리하는 시스템을 구축한다.



## 1. Main features

* 사용자 관리자
  * 사용자 등록, 수정, 삭제
* 사용자 로그인 / 로그아웃
* 사용자 별 스케쥴 관리
  * 스케쥴 등록, 수정, 삭제



## 2. Models

### user

| Id            | Name          | Type     | Lengh |
| ------------- | ------------- | -------- | ----- |
| id            | 사용자 아이디 | Text     | 30    |
| name          | 사용자 명     | Text     | 100   |
| password      | 비밀번호      | Text     | 30    |
| email         | 이메일        | Text     | 100   |
| register_date | 가입일자      | DateTime |       |



### schedule

| Id          | Name            | Type     | Lengh |
| ----------- | --------------- | -------- | ----- |
| user_id     | 사용자 아이디   | Text     | 30    |
| title       | 스케쥴 제목     | Text     | 100   |
| description | 스케쥴 상세설명 | Text     | 1000  |
| start_date  | 시작일시        | DateTime |       |
| end_date    | 종료일시        | DateTime |       |
| all_day     | 종일 여부       | Boolean  |       |





## Reference

* [명준 MJ Python & Django Tutorial 강좌](https://www.youtube.com/playlist?list=PLi4xPOplIq7d1vDdLBAvS5PmQR-p6KwUz) 
* https://djangoproject.com
