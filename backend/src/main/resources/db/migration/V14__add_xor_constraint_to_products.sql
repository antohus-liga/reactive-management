ALTER TABLE products
    ADD CONSTRAINT chk_products_fixed_xor_margin CHECK (
        (fixed_price IS NULL AND selling_margin IS NOT NULL)
            OR
        (fixed_price IS NOT NULL AND selling_margin IS NULL)
        );