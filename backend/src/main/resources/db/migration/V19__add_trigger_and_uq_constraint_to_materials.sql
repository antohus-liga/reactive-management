CREATE OR REPLACE FUNCTION prevent_product_category()
    RETURNS trigger AS
$$
BEGIN
    IF EXISTS (SELECT 1
               FROM categories
               WHERE id = NEW.category_id
                 AND type = 'PRODUCT') THEN
        RAISE EXCEPTION 'Materials cannot use PRODUCT categories';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_prevent_product_category
    BEFORE INSERT OR UPDATE
    ON materials
    FOR EACH ROW
EXECUTE FUNCTION prevent_product_category();

ALTER TABLE materials
    ADD CONSTRAINT uq_materials_description_unit_price UNIQUE (description, unit_price)