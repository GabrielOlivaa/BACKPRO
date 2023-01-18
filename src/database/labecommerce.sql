-- Active: 1673978064951@@127.0.0.1@3306


CREATE TABLE users (
id TEXT PRIMARY KEY UNIQUE NOT NULL,
email TEXT UNIQUE NOT NULL,
password TEXT NOT NULL

);

PRAGMA table_info ("users");

DROP TABLE users;

SELECT * FROM users;

INSERT INTO users (Id,email,password)
VALUES("A001", "gabriel.oliva@gmail.com",123456);

INSERT INTO users (Id,email,password)
VALUES("A002", "kethlinvb@gmail.com",654321);

INSERT INTO users (Id,email,password)
VALUES("A003", "rafaelMiguel@gmail.com",98765);

 CREATE TABLE produtos(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    category TEXT NOT NULL
     );

INSERT INTO produtos (id,name,price,category)
VALUES("P001", "TELEVISÃO", 2000, "ELETRONICS");

INSERT INTO produtos (id,name,price,category)
VALUES("P002","X-BOX", 1800, "VIDEO-GAME");

INSERT INTO produtos (Id, name, price,category)
VALUES("P003", "FIFA20",299, "GAMES");

INSERT INTO produtos (Id, name, price, category)
VALUES("p004","SMARTWATCH", 750, "ELETONICS");

INSERT INTO produtos (Id,name,price,category)
VALUES("P005", "DAYSGONE", 180, "GAMES");



SELECT * FROM produtos;
