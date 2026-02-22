CREATE USER "pg-tickets-notifications" WITH PASSWORD 'tickets-notifications-password';

CREATE DATABASE "tickets-notifications";

ALTER DATABASE "tickets-notifications" OWNER TO "pg-tickets-notifications";

\connect "tickets-notifications";
GRANT ALL PRIVILEGES ON DATABASE "tickets-notifications" TO "pg-tickets-notifications";
GRANT ALL ON SCHEMA public TO "pg-tickets-notifications";