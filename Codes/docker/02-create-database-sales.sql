
CREATE USER "pg-tickets-sales" WITH PASSWORD 'admin'; 

CREATE DATABASE "tickets-sales";


ALTER DATABASE "tickets-sales" OWNER TO "pg-tickets-sales";
