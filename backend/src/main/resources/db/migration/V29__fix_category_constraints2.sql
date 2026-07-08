CREATE OR REPLACE FUNCTION prevent_material_category()
    RETURNS trigger AS
$$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM category_types ct
        WHERE ct.category_id = NEW.category_id
          AND ct.category_type = 'PRODUCT'
    ) THEN
        RAISE EXCEPTION 'Products must use a category with the PRODUCT type';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION prevent_product_category()
    RETURNS trigger AS
$$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM category_types ct
        WHERE ct.category_id = NEW.category_id
          AND ct.category_type = 'MATERIAL'
    ) THEN
        RAISE EXCEPTION 'Materials must use a category with the MATERIAL type';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
