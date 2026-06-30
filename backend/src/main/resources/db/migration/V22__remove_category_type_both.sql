CREATE TYPE category_type_new AS ENUM ('MATERIAL', 'PRODUCT');
ALTER TABLE categories
    ALTER COLUMN type
        TYPE category_type_new
        USING type::text::category_type_new;
DROP TYPE category_type;
ALTER TYPE category_type_new RENAME TO category_type;