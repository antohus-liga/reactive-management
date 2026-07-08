CREATE OR REPLACE FUNCTION prevent_material_category()
    RETURNS trigger AS
$$
BEGIN
    IF EXISTS (SELECT 1
               FROM category_types ct
               WHERE ct.category_id = NEW.category_id
                 AND ct.category_type = 'MATERIAL') THEN
        RAISE EXCEPTION 'Products cannot use MATERIAL categories';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER trg_prevent_material_category
    BEFORE INSERT OR UPDATE
    ON products
    FOR EACH ROW
EXECUTE FUNCTION prevent_material_category();

CREATE OR REPLACE FUNCTION prevent_product_category()
    RETURNS trigger AS
$$
BEGIN
    IF EXISTS (SELECT 1
               FROM category_types
               WHERE category_id = NEW.category_id
                 AND category_type = 'PRODUCT') THEN
        RAISE EXCEPTION 'Materials cannot use PRODUCT categories';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER trg_prevent_product_category
    BEFORE INSERT OR UPDATE
    ON materials
    FOR EACH ROW
EXECUTE FUNCTION prevent_product_category();
