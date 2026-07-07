ALTER TABLE categories
    DROP CONSTRAINT uq_categories_name_type,
    DROP COLUMN type,
    ADD CONSTRAINT uq_categories_name UNIQUE (user_id, name);

CREATE TABLE category_types
(
    category_id   BIGINT       NOT NULL,
    category_type category_type NOT NULL,
    FOREIGN KEY (category_id) REFERENCES categories (id)
);