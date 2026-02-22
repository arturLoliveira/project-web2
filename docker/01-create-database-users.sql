CREATE USER "pg-tickets-users" WITH PASSWORD 'tickets-users-password';

CREATE DATABASE "tickets-users";

ALTER DATABASE "tickets-users" OWNER TO "pg-tickets-users";

\connect "tickets-users";
GRANT ALL PRIVILEGES ON DATABASE "tickets-users" TO "tickets-users";
GRANT ALL ON SCHEMA public TO "pg-tickets-users";