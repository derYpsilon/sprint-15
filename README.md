# Sprint-15

http://tsitskun.tk / https://tsitskun.tk
Public IP: 84.201.172.123

* все ошибки обрабатываются централизованно;
* тела запросов и, где необходимо, заголовки и параметры, валидируются по определённым схемам. Если запрос не соответствует схеме, обработка не передаётся контроллеру и клиент получает ошибку валидации;
* все запросы и ответы записываются в файл request.log;
* все ошибки записываются в файл error.log;
* файлы логов не добавляются в репозиторий;
* к серверу можно обратиться по публичному IP-адресу, указанному в README.md;
* к серверу можно обратиться по http и по https, используя домен, указанный в README.md;
* секретный ключ для создания и верификации JWT хранится на сервере в .env файле. Этот файл не добавляется в git;
* в режиме разработки (когда process.env.NODE_ENV !== 'production') код запускается и работать и без наличия .env файла;
* сервер самостоятельно восстанавливается после GET-запроса на URL /crash-test
