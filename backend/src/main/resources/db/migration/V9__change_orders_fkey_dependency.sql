ALTER TABLE orders
DROP COLUMN client_id,
DROP COLUMN supplier_id,
ADD COLUMN company_id BIGINT,
ADD CONSTRAINT orders_company_id_fkey FOREIGN KEY (company_id) REFERENCES companies(id);