CREATE OR REPLACE FUNCTION prevent_material_category()
    RETURNS trigger AS $$
BEGIN
    IF EXISTS (
        SELECT 1
        FROM categories
        WHERE id = NEW.category_id
          AND type = 'MATERIAL'
    ) THEN
        RAISE EXCEPTION 'Products cannot use MATERIAL categories';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_prevent_material_category
    BEFORE INSERT OR UPDATE ON products
    FOR EACH ROW
EXECUTE FUNCTION prevent_material_category();

ALTER TABLE products
ADD CONSTRAINT uq_products_description_fixed_price_selling_margin UNIQUE (description, fixed_price, selling_margin)