ALTER TABLE products
    ALTER COLUMN measurement TYPE TEXT;

ALTER TABLE materials
    ALTER COLUMN measurement TYPE TEXT;

DROP TYPE measurement_unit;
