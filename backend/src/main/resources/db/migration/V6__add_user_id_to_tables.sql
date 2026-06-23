ALTER TABLE suppliers
    ADD COLUMN user_id BIGINT NOT NULL;

ALTER TABLE suppliers
    ADD CONSTRAINT suppliers_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id);

ALTER TABLE clients
    ADD COLUMN user_id BIGINT NOT NULL;

ALTER TABLE clients
    ADD CONSTRAINT clients_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id);

ALTER TABLE products
    ADD COLUMN user_id BIGINT NOT NULL;

ALTER TABLE products
    ADD CONSTRAINT products_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id);

ALTER TABLE materials
    ADD COLUMN user_id BIGINT NOT NULL;

ALTER TABLE materials
    ADD CONSTRAINT materials_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id);

ALTER TABLE categories
    ADD COLUMN user_id BIGINT NOT NULL;

ALTER TABLE categories
    ADD CONSTRAINT categories_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id);

ALTER TABLE orders
    ADD COLUMN user_id BIGINT NOT NULL;

ALTER TABLE orders
    ADD CONSTRAINT orders_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id);

ALTER TABLE movements
    ADD COLUMN user_id BIGINT NOT NULL;

ALTER TABLE movements
    ADD CONSTRAINT movements_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id);

ALTER TABLE product_materials
    ADD COLUMN user_id BIGINT NOT NULL;

ALTER TABLE product_materials
    ADD CONSTRAINT product_materials_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id);

ALTER TABLE production_orders
    ADD COLUMN user_id BIGINT NOT NULL;

ALTER TABLE production_orders
    ADD CONSTRAINT production_orders_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id);
