CREATE TYPE company_type AS ENUM (
    'SOLE_PROPRIETORSHIP',
    'PARTNERSHIP',
    'LIMITED_LIABILITY_COMPANY',
    'CORPORATION',
    'COOPERATIVE',
    'NONPROFIT_ORGANISATION'
    );

CREATE TABLE clients
(
    id           BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_name TEXT         NOT NULL,
    company_type company_type NOT NULL,
    tax_id       TEXT         NOT NULL,
    phone_number TEXT         NOT NULL,
    email        TEXT         NOT NULL,
    country      TEXT         NOT NULL,
    address      TEXT         NOT NULL,
    created_at   TIMESTAMP    NOT NULL DEFAULT now(),
    updated_at   TIMESTAMP    NOT NULL DEFAULT now()
);

CREATE TABLE suppliers
(
    id           BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_name TEXT         NOT NULL,
    company_type company_type NOT NULL,
    tax_id       TEXT         NOT NULL,
    phone_number TEXT         NOT NULL,
    email        TEXT         NOT NULL,
    country      TEXT         NOT NULL,
    address      TEXT         NOT NULL,
    created_at   TIMESTAMP    NOT NULL DEFAULT now(),
    updated_at   TIMESTAMP    NOT NULL DEFAULT now()
);

CREATE TYPE order_type AS ENUM (
    'INBOUND',
    'OUTBOUND'
    );

CREATE TABLE orders
(
    id           BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    client_id    BIGINT,
    supplier_id  BIGINT,
    type         order_type NOT NULL,
    is_completed BOOLEAN    NOT NULL DEFAULT false,
    created_at   TIMESTAMP  NOT NULL DEFAULT now(),
    updated_at   TIMESTAMP  NOT NULL DEFAULT now(),
    FOREIGN KEY (client_id) REFERENCES clients (id),
    FOREIGN KEY (supplier_id) REFERENCES suppliers (id),
    CONSTRAINT chk_orders_client_xor_supplier
        CHECK ( (client_id IS NOT NULL AND supplier_id IS NULL) OR (client_id IS NULL AND supplier_id IS NOT NULL) )
);

CREATE TYPE category_type AS ENUM (
    'MATERIAL',
    'PRODUCT',
    'BOTH'
    );

CREATE TABLE categories
(
    id         BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    color_hex  VARCHAR(6)              NOT NULL,
    type       category_type           NOT NULL,
    created_at TIMESTAMP DEFAULT now() NOT NULL,
    updated_at TIMESTAMP DEFAULT now() NOT NULL
);

CREATE TYPE measurement_unit AS ENUM (
    'piece',
    'kg',
    'g',
    'mg',
    'l',
    'ml',
    'cm',
    'm',
    'box',
    'pack',
    'dozen'
    );

CREATE TABLE products
(
    id             BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    description    TEXT                    NOT NULL,
    quantity       INT                     NOT NULL,
    category_id    BIGINT                  NOT NULL,
    measurement    measurement_unit        NOT NULL,
    fixed_price    DECIMAL,
    selling_margin DECIMAL,
    created_at     TIMESTAMP DEFAULT now() NOT NULL,
    updated_at     TIMESTAMP DEFAULT now() NOT NULL,
    FOREIGN KEY (category_id) REFERENCES categories (id),
    CONSTRAINT chk_products_quantity_not_negative
        CHECK ( quantity >= 0 )
);

CREATE TABLE materials
(
    id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    description TEXT                    NOT NULL,
    quantity    INT                     NOT NULL,
    category_id BIGINT                  NOT NULL,
    measurement measurement_unit        NOT NULL,
    unit_price  DECIMAL                 NOT NULL,
    created_at  TIMESTAMP DEFAULT now() NOT NULL,
    updated_at  TIMESTAMP DEFAULT now() NOT NULL,
    FOREIGN KEY (category_id) REFERENCES categories (id),
    CONSTRAINT chk_products_quantity_not_negative
        CHECK ( quantity >= 0 )
);

CREATE TABLE movements
(
    id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    order_id    BIGINT    NOT NULL,
    product_id  BIGINT,
    material_id BIGINT,
    quantity    INT       NOT NULL,
    discount    TEXT,
    notes       TEXT,
    created_at  TIMESTAMP NOT NULL DEFAULT now(),
    updated_at  TIMESTAMP NOT NULL DEFAULT now(),
    FOREIGN KEY (order_id) REFERENCES orders (id),
    FOREIGN KEY (product_id) REFERENCES products (id),
    FOREIGN KEY (material_id) REFERENCES materials (id),
    CONSTRAINT chk_movements_product_xor_material
        CHECK ( (product_id IS NOT NULL AND material_id IS NULL) OR (product_id IS NULL AND material_id IS NOT NULL))
);

CREATE TABLE product_materials
(
    id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    product_id  BIGINT    NOT NULL,
    material_id BIGINT    NOT NULL,
    quantity    INT       NOT NULL,
    created_at  TIMESTAMP NOT NULL DEFAULT now(),
    updated_at  TIMESTAMP NOT NULL DEFAULT now(),
    FOREIGN KEY (product_id) REFERENCES products (id),
    FOREIGN KEY (material_id) REFERENCES materials (id)
);

CREATE TYPE production_status AS ENUM (
    'PENDING',
    'IN_PROGRESS',
    'COMPLETED',
    'FAILED'
    );

CREATE TABLE production_orders
(
    id         BIGINT GENERATED ALWAYS AS IDENTITY,
    product_id BIGINT            NOT NULL,
    quantity   INT               NOT NULL,
    status     production_status NOT NULL,
    notes      TEXT,
    created_at TIMESTAMP         NOT NULL DEFAULT now(),
    updated_at TIMESTAMP         NOT NULL DEFAULT now(),
    FOREIGN KEY (product_id) REFERENCES products (id)
);
