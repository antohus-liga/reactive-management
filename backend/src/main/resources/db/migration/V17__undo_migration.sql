ALTER TABLE products
    ALTER COLUMN fixed_price TYPE NUMERIC USING fixed_price::numeric,
    ALTER COLUMN selling_margin TYPE NUMERIC USING selling_margin::numeric;

ALTER TABLE materials
    ALTER COLUMN unit_price TYPE NUMERIC USING unit_price::numeric;