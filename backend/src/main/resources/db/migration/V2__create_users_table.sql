CREATE TABLE users(
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_name TEXT         NOT NULL,
    company_type company_type NOT NULL,
    tax_id       TEXT         NOT NULL,
    phone_number TEXT         NOT NULL,
    email        TEXT         NOT NULL,
    country      TEXT         NOT NULL,
    address      TEXT         NOT NULL,
    created_at   TIMESTAMP    NOT NULL DEFAULT now(),
    updated_at   TIMESTAMP    NOT NULL DEFAULT now()
)