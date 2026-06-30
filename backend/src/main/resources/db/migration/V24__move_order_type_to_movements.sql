ALTER TABLE orders
    DROP COLUMN type;

ALTER TYPE order_type RENAME TO movement_type;

ALTER TABLE movements
    ADD COLUMN movement_type movement_type;