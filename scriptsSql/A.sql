-- ALTER USER 'YOUR_USER' IDENTIFIED WITH mysql_native_password BY 'YOUR_PASS';
-- FLUSH PRIVILEGES;



create database if not exists streamingPro;
use streamingPro;

create table if not exists users(
				   idUser BINARY(16) not null primary key,
                   email nvarchar(100) not null,
                   name nvarchar(100) not null,
                   profile int not null,
                   numberPhone BIGINT not null,
                   password nvarchar(100) not null,
                   observacion nvarchar(1000) not null,
                   myTopUser BINARY(16) not null,
                   active bit not null default 1,
                   created datetime not null default now(),
                   userCreate BINARY(16) not null,
                   userUpdate BINARY(16) null,
                   updateAt datetime null );

                   
GRANT SELECT, INSERT, UPDATE ON streamingPro. * TO 'YOUR_USER'@'%';
FLUSH PRIVILEGES;
