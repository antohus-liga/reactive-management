ALTER TABLE products
    ALTER COLUMN fixed_price TYPE NUMERIC,
    ALTER COLUMN selling_margin TYPE NUMERIC;

ALTER TABLE materials
    ALTER COLUMN unit_price TYPE NUMERIC;