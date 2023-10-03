USE bbdatabase;
SELECT * FROM products;

INSERT 
INTO products (name, price, size, stock, hide, description, product_photo, pk_categories_id, flavor)
VALUES ("Crazy Ichigo", 80, "Mediano", 400, 1, "Rica bebida de Ichigo", "photo", 1, "fresa"); 

INSERT 
INTO products (name, price, size, stock, hide, description, product_photo, pk_categories_id, flavor)
VALUES ("Explosión de Chocolate", 95, "Grande", 150, 1, "Rica bebida de Chocolate", "photo", 2, "fresa"); 

INSERT 
INTO products (name, price, size, stock, hide, description, product_photo, pk_categories_id, flavor)
VALUES ("Ken", 120, "Grande", 100, 1, "Rica bebida representativa de Ken", "photo", 2, "Moras"); 

INSERT 
INTO products (name, price, size, stock, hide, description, product_photo, pk_categories_id, flavor)
VALUES ("Mora azul", 50, "Chico", 500, 1, "Rica bebida de Mora azul", "photo", 3, "Mora azul"); 

INSERT 
INTO products (name, price, size, stock, hide, description, product_photo, pk_categories_id, flavor)
VALUES ("Kiwi Refresher", 85, "Grande", 180, 1, "Rica bebida refrescante de Kiwi", "photo", 4, "Kiwi"); 

