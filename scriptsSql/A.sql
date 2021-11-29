drop database StreamingPro;

create database if not exists StreamingPro;
use StreamingPro;

create table if not exists businessUnits(
		idUen BINARY(16) not null primary key,
		name nvarchar(100) not null, 
        created datetime not null default now(),
		userCreate BINARY(16) not null,
        userUpdate BINARY(16) null,
        updateAt datetime null
);

create table if not exists users(
                   idUser BINARY(16) not null primary key,
                   idUen BINARY(16) null,
                   email nvarchar(100) not null,
                   name nvarchar(100) not null,
                   profile int not null,
                   numberPhone BIGINT not null,
                   password nvarchar(100) not null,
                   observacion nvarchar(1000) not null,
                   keyReferred nvarchar(500) not null,
                   myTopUser BINARY(16) not null,
                   active bit not null default 1,
                   created datetime not null default now(),
                   userCreate BINARY(16) not null,
                   userUpdate BINARY(16) null,
                   updateAt datetime null,
				   FOREIGN KEY (idUen) REFERENCES businessUnits(idUen) );


create table if not exists products(
	  idProduct BINARY(16) not null primary key,
	  type int not null,
      description nvarchar(4000) not null, 
      created datetime not null default now(),
	  userCreate BINARY(16) not null,
      userUpdate BINARY(16) null,
      updateAt datetime null,
      FOREIGN KEY (userCreate) REFERENCES users(idUser)
);

create table if not exists productsTypeCredential(
	  idProduct BINARY(16) not null,
      user nvarchar(1000)  not null,
      password nvarchar(1000) not null,
	  FOREIGN KEY (idProduct) REFERENCES products(idProduct)
);

create table if not exists productsTypeCoupon(
	  idProduct BINARY(16) not null,
      coupon nvarchar(4000)  not null,
	  FOREIGN KEY (idProduct) REFERENCES products(idProduct)
); 
