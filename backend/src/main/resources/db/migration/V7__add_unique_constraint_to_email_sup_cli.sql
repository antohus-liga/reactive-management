ALTER TABLE suppliers
    ADD CONSTRAINT suppliers_email_key UNIQUE (email);

ALTER TABLE clients
    ADD CONSTRAINT clients_email_key UNIQUE (email);
