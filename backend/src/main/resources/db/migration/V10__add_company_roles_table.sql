ALTER TABLE companies
    DROP CONSTRAINT uq_companies_user_tax_id,
    DROP COLUMN company_role,
    ADD CONSTRAINT uq_companies_user_tax_id UNIQUE (user_id, tax_id);

CREATE TABLE company_roles
(
    company_id   BIGINT       NOT NULL,
    company_role company_role NOT NULL,
    FOREIGN KEY (company_id) REFERENCES companies(id)
);