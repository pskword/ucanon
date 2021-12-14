# Python & Django Study

명준MJ 유튜버의 Django 강의를 중심으로 학습한 내용을 정리한다.



### 1. Python & Virutal Env Install & Activate & Django 설치

> https://www.youtube.com/watch?v=alrLd9T96aA&list=PLi4xPOplIq7d1vDdLBAvS5PmQR-p6KwUz

```shell
pip install virtualenv

E:\Python_Workspace>mkdir myfriend
E:\Python_Workspace>cd myfriend
E:\Python_Workspace\myfriend>python -m virutalenv .

E:\Python_Workspace\myfriend>cd Scipts
지정된 경로를 찾을 수 없습니다.

E:\Python_Workspace\myfriend>cd Scripts

E:\Python_Workspace\myfriend\Scripts>dir
 E 드라이브의 볼륨: 로컬 디스크
 볼륨 일련 번호: 626F-CC09

 E:\Python_Workspace\myfriend\Scripts 디렉터리

2021-11-27  오전 02:01    <DIR>          .
2021-11-27  오전 02:01    <DIR>          ..
2021-11-27  오전 02:01             2,151 activate
2021-11-27  오전 02:01               991 activate.bat
2021-11-27  오전 02:01             3,032 activate.fish
2021-11-27  오전 02:01             1,301 activate.nu
2021-11-27  오전 02:01             1,758 activate.ps1
2021-11-27  오전 02:01             1,193 activate_this.py
2021-11-27  오전 02:01               510 deactivate.bat
2021-11-27  오전 02:01               333 deactivate.nu
2021-11-27  오전 02:01           106,358 pip-3.10.exe
2021-11-27  오전 02:01           106,358 pip.exe
2021-11-27  오전 02:01           106,358 pip3.10.exe
2021-11-27  오전 02:01           106,358 pip3.exe
2021-11-27  오전 02:01                24 pydoc.bat
2021-11-27  오전 02:01           242,920 python.exe
2021-11-27  오전 02:01           232,688 pythonw.exe
2021-11-27  오전 02:01           106,345 wheel-3.10.exe
2021-11-27  오전 02:01           106,345 wheel.exe
2021-11-27  오전 02:01           106,345 wheel3.10.exe
2021-11-27  오전 02:01           106,345 wheel3.exe
              19개 파일           1,337,713 바이트
               2개 디렉터리  272,842,604,544 바이트 남음

E:\Python_Workspace\myfriend\Scripts>activate.bat

(myfriend) E:\Python_Workspace\myfriend\Scripts>
    
(myfriend) E:\Python_Workspace\myfriend\Scripts>pip  install Django
Collecting Django
  Downloading Django-3.2.9-py3-none-any.whl (7.9 MB)
     |████████████████████████████████| 7.9 MB ...
Collecting sqlparse>=0.2.2
  Downloading sqlparse-0.4.2-py3-none-any.whl (42 kB)
     |████████████████████████████████| 42 kB 3.2 MB/s
Collecting asgiref<4,>=3.3.2
  Downloading asgiref-3.4.1-py3-none-any.whl (25 kB)
Collecting pytz
  Downloading pytz-2021.3-py2.py3-none-any.whl (503 kB)
     |████████████████████████████████| 503 kB 6.4 MB/s
Installing collected packages: sqlparse, pytz, asgiref, Django
Successfully installed Django-3.2.9 asgiref-3.4.1 pytz-2021.3 sqlparse-0.4.2

(myfriend) E:\Python_Workspace\myfriend\Scripts>python
Python 3.10.0 (tags/v3.10.0:b494f59, Oct  4 2021, 19:00:18) [MSC v.1929 64 bit (AMD64)] on win32
Type "help", "copyright", "credits" or "license" for more information.
>>> import django
>>>
```



### 2. Django Project 생성

```shell
(myfriend) E:\Python_Workspace\myfriend>dir
 E 드라이브의 볼륨: 로컬 디스크
 볼륨 일련 번호: 626F-CC09

 E:\Python_Workspace\myfriend 디렉터리

2021-11-27  오전 02:01    <DIR>          .
2021-11-27  오전 02:00    <DIR>          ..
2021-11-27  오전 02:01                42 .gitignore
2021-11-27  오전 02:01    <DIR>          Lib
2021-11-27  오전 02:01               298 pyvenv.cfg
2021-11-27  오전 02:05    <DIR>          Scripts
               2개 파일                 340 바이트
               4개 디렉터리  272,802,410,496 바이트 남음

(myfriend) E:\Python_Workspace\myfriend>mkdir workspace

(myfriend) E:\Python_Workspace\myfriend>dir
 E 드라이브의 볼륨: 로컬 디스크
 볼륨 일련 번호: 626F-CC09

 E:\Python_Workspace\myfriend 디렉터리

2021-11-27  오전 11:00    <DIR>          .
2021-11-27  오전 02:00    <DIR>          ..
2021-11-27  오전 02:01                42 .gitignore
2021-11-27  오전 02:01    <DIR>          Lib
2021-11-27  오전 02:01               298 pyvenv.cfg
2021-11-27  오전 02:05    <DIR>          Scripts
2021-11-27  오전 11:00    <DIR>          workspace
               2개 파일                 340 바이트
               5개 디렉터리  272,802,410,496 바이트 남음

(myfriend) E:\Python_Workspace\myfriend>d workspace
'd'은(는) 내부 또는 외부 명령, 실행할 수 있는 프로그램, 또는
배치 파일이 아닙니다.

(myfriend) E:\Python_Workspace\myfriend>cd workspace

(myfriend) E:\Python_Workspace\myfriend\workspace>django-admin startproject mysite

(myfriend) E:\Python_Workspace\myfriend\workspace>cd mysite

(myfriend) E:\Python_Workspace\myfriend\workspace\mysite>dir
 E 드라이브의 볼륨: 로컬 디스크
 볼륨 일련 번호: 626F-CC09

 E:\Python_Workspace\myfriend\workspace\mysite 디렉터리

2021-11-27  오전 11:00    <DIR>          .
2021-11-27  오전 11:00    <DIR>          ..
2021-11-27  오전 11:00               684 manage.py
2021-11-27  오전 11:00    <DIR>          mysite
               1개 파일                 684 바이트
               3개 디렉터리  272,802,402,304 바이트 남음

(myfriend) E:\Python_Workspace\myfriend\workspace\mysite>
```



### 3. Django Request & Response Cycle

> https://stackoverflow.com/questions/33314717/how-to-understand-tornado-response-request-cycle-in-django

![enter image description here](Python_Django_Study.assets/rLfSC.jpg)

* **WSGI : wsgi.py**
  * 웹서버와 비즈니스 로직을 연결해주는 인터페이스
* **REQUEST : middleware**
  * http request를 처리하기 전에 거치는 관문. settings에 설정된 middleware들을 순차적으로 통과한다.
* **URL RESOLUTION : urls.py**
  * request와 mapping되는 callable object를 반환하여 실행한다. callable object는 함수형 뷰일 수도 잇꼬, class base view의 함수일 수도 있다.
* **VIEW : views.py**
  * 만약 함수형 뷰가 아니라 클래스 뷰라면 dispatch 메소드를 통해 최종 request를 처리할 함수가 선택된다. 이후 함수를 실행하면서 models.py에서 필요한 데이터를 읽어온다. 적절한 template renderer를 선택하여 response가 생성된다.
* **TEMPLATE middleware**
  * response는 다시 미들웨어를 통과한다. 이번에는 순차적으로가 아니라 역방향으로 미들웨어 리스트의 마지막 원소부터 거치게 된다.
* **WSGI : wsgi.py**
  * 인터페이스를 통해서 response가 웹서버로 전달된다.



### 4. Django 실행하기

```shell
E:\Python_Workspace\myfriend\Scripts>activate.bat

(myfriend) E:\Python_Workspace\myfriend\Scripts>cd..

(myfriend) E:\Python_Workspace\myfriend>dir
 E 드라이브의 볼륨: 로컬 디스크
 볼륨 일련 번호: 626F-CC09

 E:\Python_Workspace\myfriend 디렉터리

2021-11-27  오전 11:00    <DIR>          .
2021-11-27  오전 02:00    <DIR>          ..
2021-11-27  오전 02:01                42 .gitignore
2021-11-27  오전 02:01    <DIR>          Lib
2021-11-27  오전 02:01               298 pyvenv.cfg
2021-11-27  오전 02:05    <DIR>          Scripts
2021-11-27  오전 11:00    <DIR>          workspace
               2개 파일                 340 바이트
               5개 디렉터리  272,802,344,960 바이트 남음

(myfriend) E:\Python_Workspace\myfriend>cd workspace

(myfriend) E:\Python_Workspace\myfriend\workspace>dir
 E 드라이브의 볼륨: 로컬 디스크
 볼륨 일련 번호: 626F-CC09

 E:\Python_Workspace\myfriend\workspace 디렉터리

2021-11-27  오전 11:00    <DIR>          .
2021-11-27  오전 11:00    <DIR>          ..
2021-11-27  오후 01:25    <DIR>          mysite
               0개 파일                   0 바이트
               3개 디렉터리  272,802,344,960 바이트 남음

(myfriend) E:\Python_Workspace\myfriend\workspace>cd mysite

(myfriend) E:\Python_Workspace\myfriend\workspace\mysite>dir
 E 드라이브의 볼륨: 로컬 디스크
 볼륨 일련 번호: 626F-CC09

 E:\Python_Workspace\myfriend\workspace\mysite 디렉터리

2021-11-27  오후 01:25    <DIR>          .
2021-11-27  오전 11:00    <DIR>          ..
2021-11-27  오후 01:25    <DIR>          .vscode
2021-11-27  오후 01:17                 0 db.sqlite3
2021-11-27  오전 11:00               684 manage.py
2021-11-27  오후 01:17    <DIR>          mysite
               2개 파일                 684 바이트
               4개 디렉터리  272,802,344,960 바이트 남음

(myfriend) E:\Python_Workspace\myfriend\workspace\mysite>py manage.py runserver
Watching for file changes with StatReloader
Performing system checks...

System check identified no issues (0 silenced).

You have 18 unapplied migration(s). Your project may not work properly until you apply the migrations for app(s): admin, auth, contenttypes, sessions.
Run 'python manage.py migrate' to apply them.
November 27, 2021 - 13:27:31
Django version 3.2.9, using settings 'mysite.settings'
Starting development server at http://127.0.0.1:8000/
Quit the server with CTRL-BREAK.
[27/Nov/2021 13:27:50] "GET / HTTP/1.1" 200 10697
[27/Nov/2021 13:27:50] "GET /static/admin/css/fonts.css HTTP/1.1" 200 423
[27/Nov/2021 13:27:50] "GET /static/admin/fonts/Roboto-Bold-webfont.woff HTTP/1.1" 200 86184
[27/Nov/2021 13:27:50] "GET /static/admin/fonts/Roboto-Regular-webfont.woff HTTP/1.1" 200 85876
[27/Nov/2021 13:27:50] "GET /static/admin/fonts/Roboto-Light-webfont.woff HTTP/1.1" 200 85692
Not Found: /favicon.ico
[27/Nov/2021 13:27:50] "GET /favicon.ico HTTP/1.1" 404 2110
```



### 5. App 만들기

```shell
(myfriend) E:\Python_Workspace\myfriend\workspace\mysite>py manage.py startapp polls
(myfriend) E:\Python_Workspace\myfriend\workspace\mysite>dir
 E 드라이브의 볼륨: 로컬 디스크
 볼륨 일련 번호: 626F-CC09

 E:\Python_Workspace\myfriend\workspace\mysite 디렉터리

2021-11-27  오후 02:25    <DIR>          .
2021-11-27  오전 11:00    <DIR>          ..
2021-11-27  오후 01:25    <DIR>          .vscode
2021-11-27  오후 01:17                 0 db.sqlite3
2021-11-27  오전 11:00               684 manage.py
2021-11-27  오후 01:17    <DIR>          mysite
2021-11-27  오후 02:25    <DIR>          polls
               2개 파일                 684 바이트
               5개 디렉터리  272,802,340,864 바이트 남음
```



### 6. Django Admin 걔정 생성하기

```shell
(myfriend) E:\Python_Workspace\myfriend\workspace\mysite>python manage.py migrate
Operations to perform:
  Apply all migrations: admin, auth, contenttypes, sessions
Running migrations:
  Applying contenttypes.0001_initial... OK
  Applying auth.0001_initial... OK
  Applying admin.0001_initial... OK
  Applying admin.0002_logentry_remove_auto_add... OK
  Applying admin.0003_logentry_add_action_flag_choices... OK
  Applying contenttypes.0002_remove_content_type_name... OK
  Applying auth.0002_alter_permission_name_max_length... OK
  Applying auth.0003_alter_user_email_max_length... OK
  Applying auth.0004_alter_user_username_opts... OK
  Applying auth.0005_alter_user_last_login_null... OK
  Applying auth.0006_require_contenttypes_0002... OK
  Applying auth.0007_alter_validators_add_error_messages... OK
  Applying auth.0008_alter_user_username_max_length... OK
  Applying auth.0009_alter_user_last_name_max_length... OK
  Applying auth.0010_alter_group_name_max_length... OK
  Applying auth.0011_update_proxy_permissions... OK
  Applying auth.0012_alter_user_first_name_max_length... OK
  Applying sessions.0001_initial... OK

(myfriend) E:\Python_Workspace\myfriend\workspace\mysite>python manage.py createsuperuser
Username (leave blank to use 'ucanon'): 'admin'
Email address: pskpassion@gmail.com
Password: 'admin123'
Password (again): 'admin123'
The password is too similar to the username.
This password is too common.
Bypass password validation and create user anyway? [y/N]: y
Superuser created successfully.

// admin id / pw : admin / admin123
```



###  7. Git 연동

* git bash를 실행한다.

```shell
$ cd /e/Python_Workspace/myfriend/workspace/mysite
$ git init
$ git add .
$ git commit // 맨위 상단에 commit 메시지를 입력하고 ESC -> :wq 

// Github에 MySite 저장소를 생성한 후에 아래의 명령을 수행한다.
$ git remote add origin https://github.com/James-Park/MySite.git

ucanon@DESKTOP-I8V1P8D MINGW64 /e/Python_Workspace/myfriend/workspace/mysite (master)
$ git push -u origin master
Enumerating objects: 29, done.
Counting objects: 100% (29/29), done.
Delta compression using up to 8 threads
Compressing objects: 100% (26/26), done.
Writing objects: 100% (29/29), 12.02 KiB | 1.50 MiB/s, done.
Total 29 (delta 3), reused 0 (delta 0), pack-reused 0
remote: Resolving deltas: 100% (3/3), done.
To https://github.com/James-Park/MySite.git
 * [new branch]      master -> master
Branch 'master' set up to track remote branch 'master' from 'origin'.
```



## Reference

* [명준 MJ Python & Django Tutorial 강좌](https://www.youtube.com/playlist?list=PLi4xPOplIq7d1vDdLBAvS5PmQR-p6KwUz) 
* https://djangoproject.com
