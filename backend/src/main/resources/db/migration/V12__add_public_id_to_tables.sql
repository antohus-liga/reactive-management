ALTER TABLE categories
    ADD COLUMN public_id uuid NOT NULL DEFAULT gen_random_uuid(),
    ADD CONSTRAINT uq_categories_public_id UNIQUE (public_id);

ALTER TABLE products
    ADD COLUMN public_id uuid NOT NULL DEFAULT gen_random_uuid(),
    ADD CONSTRAINT uq_products_public_id UNIQUE (public_id);

ALTER TABLE materials
    ADD COLUMN public_id uuid NOT NULL DEFAULT gen_random_uuid(),
    ADD CONSTRAINT uq_materials_public_id UNIQUE (public_id);

ALTER TABLE orders
    ADD COLUMN public_id uuid NOT NULL DEFAULT gen_random_uuid(),
    ADD CONSTRAINT uq_orders_public_id UNIQUE (public_id);

ALTER TABLE movements
    ADD COLUMN public_id uuid NOT NULL DEFAULT gen_random_uuid(),
    ADD CONSTRAINT uq_movements_public_id UNIQUE (public_id);

ALTER TABLE product_materials
    ADD COLUMN public_id uuid NOT NULL DEFAULT gen_random_uuid(),
    ADD CONSTRAINT uq_product_materials_public_id UNIQUE (public_id);

ALTER TABLE production_orders
    ADD COLUMN public_id uuid NOT NULL DEFAULT gen_random_uuid(),
    ADD CONSTRAINT uq_production_orders_public_id UNIQUE (public_id);