
CREATE USER "pg-tickets-users" WITH PASSWORD 'admin'; 

CREATE DATABASE "tickets-users";


ALTER DATABASE "tickets-users" OWNER TO "pg-tickets-users";
