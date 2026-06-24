ALTER TABLE categories
ADD COLUMN name varchar NOT NULL,
ADD CONSTRAINT uq_categories_name UNIQUE (user_id, name);