ALTER TABLE categories
    DROP CONSTRAINT uq_categories_name,
    ADD CONSTRAINT uq_categories_name_type UNIQUE (name, type, user_id),
    ALTER COLUMN color_hex TYPE varchar(7);