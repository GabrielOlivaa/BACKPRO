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
VALUES("P003", "FIFA23",299, "GAMES");

INSERT INTO produtos (Id, name, price, category)
VALUES("P004","SMARTWATCH", 750, "ELETONICS");

INSERT INTO produtos (Id,name,price,category)
VALUES("P005", "DAYSGONE", 180, "GAMES");


-- Retorna todos os produtos cadastrados
SELECT * FROM produtos;

--Search product by name
SELECT * FROM produtos
WHERE name LIKE "X-BOX";

--Create user
--- Mocke um novo usuário
--- Insire o item mockado na tabela users

INSERT INTO users (id, email,password)
VALUES
("A004","larissa@mail.com", "pedro123");

--Create product
--- Mocke um novo produto
--- Insire o item mockado na tabela produtos

INSERT INTO produtos (id,name,price,category)
VALUES
("p006", "Tablet", 3500, "ELETONICS");

--GET products by id
--- mocke uma id
--- busca baseada no valor mockado

SELECT * FROM produtos
WHERE id LIKE "p006";

--DELETE user by id
---mocke uma id
---delete a linha baseada no valor mockado
DELETE FROM users
WHERE id like "A004";

--DELETE product by id
---mocke uma id
---delete a linha baseada no valor mockado

DELETE FROM produtos
WHERE id LIKE "P005";

-- EDIT user by id
--- mocke valores para editar um user
--- edite a linha baseada nos valores mockados

UPDATE users
SET email= "TESTEUPTADE@GMAIL.COM",
password= "TESTESENHANOVA"
WHERE id = "A003";

-- EDIT product by id

UPDATE produtos
SET price= 3000,
name= "televisão 65"
WHERE id = "P001";


-- GET all users
--- retorna o resultado ordenado pela coluna name em ordem crescente

SELECT * FROM users
ORDER BY id ASC;

-- GET all products
--- retorna o resultado ordenado pela coluna price em ordem crescente
--- limite o resultado em 20 iniciando pelo primeiro item

SELECT * FROM produtos
ORDER BY price ASC
LIMIT 20
OFFSET 0 ;

-- GET all products
--- mocke um intervalo de preços, por exemplo entre 100 e 300
--- retorna os produtos com preço dentro do intervalo mockado em ordem crescente

SELECT * FROM produtos
WHERE price >=1000 and price <=3500
ORDER BY price ASC;

CREATE TABLE purchases (
   id TEXT PRIMARY KEY UNIQUE NOT NULL,
   total_price REAL UNIQUE NOT NULL,
   paid INTEGER NOT NULL,
   deliverd_at TEXT,
   buyer_id TEXT NOT NULL,
   FOREIGN KEY (buyer_id) REFERENCES users(id)
);

DROP TABLE purchases;

INSERT INTO  purchases (id, total_price, paid, deliverd_at, buyer_id)
VALUES
("PR001",100, 0,NULL, "A001"),
("PR002",250,0,NULL,"A001"),
("PR003", 400,0, NULL, "A002"),
("PR004", 10,0, NULL, "A002"),
("PR005", 11,0, NULL , "A003");

SELECT * FROM purchases
INNER JOIN users
ON purchases.buyer_id = users.id
WHERE users.id = "A002";

UPDATE purchases
SET deliverd_at = DATETIME("NOW"),
paid = 1
WHERE id = "PR001";

CREATE TABLE purchases_produtos(
   purchase_id TEXT NOT NULL,
   produto_id  TEXT NOT NULL,
   quantity INTEGER NOT NULL, 
   FOREIGN KEY (purchase_id)REFERENCES purchases(id),
   FOREIGN KEY (produto_id)REFERENCES produtos(id)
  
);

DROP TABLE purchases_produtos;

INSERT INTO purchases_produtos (purchase_id, produto_id, quantity)
VALUES
("PR001","P002",1),
("PR003","P001",2),
("PR004","P003",1);

SELECT * FROM purchases_produtos;

SELECT * FROM purchases_produtos
INNER JOIN produtos
ON purchases_produtos.produto_id = produtos.id;

SELECT * FROM purchases_produtos
INNER JOIN purchases
ON purchases_produtos.purchase_id = purchases.id
INNER JOIN produtos
ON  purchases_produtos.produto_id = produtos.id;

SELECT
 purchases_produtos.purchase_id AS codigoCompra,
 produtos.name AS ProdutoNome,
purchases_produtos.quantity AS quantidadeComprada
FROM produtos
INNER JOIN purchases_produtos
ON produtos.id =  purchases_produtos.produto_id;