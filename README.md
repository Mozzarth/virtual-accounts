# Docker 

> Construcción de imagen ```docker build -t streaming-pro-db:v1.0.0 .```
> Creación de volumen ```docker volume create streaming-pro-db```

> Creacion de imagen  
* ```docker run -d --name streaming-pro-db -p 3306:3306  --mount src=streaming-pro-db,dst=/var/lib/mysql streaming-pro-db:v1.0.0```

* ```docker run -d --name streaming-pro-db -p 3306:3306  -v "$PWD/data":/var/lib/mysql streaming-pro-db:v1.0.0``` 
> Correr imagen docker start streaming-pro-db