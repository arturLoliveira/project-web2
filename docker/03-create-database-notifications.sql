
CREATE USER "pg-tickets-notifications" WITH PASSWORD 'admin'; 

CREATE DATABASE "tickets-notifications";


ALTER DATABASE "tickets-notifications" OWNER TO "pg-tickets-notifications";
