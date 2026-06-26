ALTER TABLE products
    DROP CONSTRAINT uq_products_description_fixed_price_selling_margin,
    ADD CONSTRAINT uq_products_description UNIQUE (description, user_id);

ALTER TABLE materials
    DROP CONSTRAINT uq_materials_description_unit_price,
    ADD CONSTRAINT uq_materials_description UNIQUE (description, user_id);
