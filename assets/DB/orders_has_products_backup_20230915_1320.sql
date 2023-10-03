SELECT * FROM bbdatabase.orders_has_products;
USE bbdatabase;

INSERT INTO orders_has_products (quantity, fk_order_id, fk_product_id)
	VALUES ( 3, 2, 2);

INSERT INTO orders_has_products (quantity, fk_order_id, fk_product_id)
	VALUES ( 5, 3, 6);

INSERT INTO orders_has_products (quantity, fk_order_id, fk_product_id)
	VALUES ( 1, 4, 4);
    
INSERT INTO orders_has_products (quantity, fk_order_id, fk_product_id)
	VALUES ( 30,5, 6);
    
INSERT INTO orders_has_products (quantity, fk_order_id, fk_product_id)
	VALUES ( 10, 1, 4);
