CREATE USER "pg-tickets-sales" WITH PASSWORD 'tickets-sales-password';

CREATE DATABASE "tickets-sales";

ALTER DATABASE "tickets-sales" OWNER TO "pg-tickets-sales";

\connect "tickets-sales";
GRANT ALL PRIVILEGES ON DATABASE "tickets-sales" TO "pg-tickets-sales";
GRANT ALL ON SCHEMA public TO "pg-tickets-sales";