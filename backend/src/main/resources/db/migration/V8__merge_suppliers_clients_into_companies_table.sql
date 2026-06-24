DROP TABLE clients CASCADE;
DROP TABLE suppliers CASCADE;

CREATE TYPE company_role AS ENUM (
    'CLIENT',
    'SUPPLIER'
    );

CREATE TABLE IF NOT EXISTS companies
(
    id           bigint       NOT NULL GENERATED ALWAYS AS IDENTITY,
    public_id    uuid         NOT NULL UNIQUE DEFAULT gen_random_uuid(),

    company_name text         NOT NULL,
    company_type company_type NOT NULL,
    company_role company_role NOT NULL,

    tax_id       text         NOT NULL,
    phone_number text         NOT NULL,
    email        text         NOT NULL,
    country      text         NOT NULL,
    address      text         NOT NULL,

    created_at   timestamp    NOT NULL        DEFAULT now(),
    updated_at   timestamp    NOT NULL        DEFAULT now(),

    user_id      bigint       NOT NULL,

    CONSTRAINT companies_pkey PRIMARY KEY (id),

    CONSTRAINT companies_user_id_fkey
        FOREIGN KEY (user_id)
            REFERENCES public.users (id),

    CONSTRAINT uq_companies_user_tax_id
        UNIQUE (user_id, tax_id, company_role)
);
