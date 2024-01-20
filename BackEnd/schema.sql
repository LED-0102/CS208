DROP TABLE IF EXISTS todos;
DROP TABLE IF EXISTS users;

CREATE TABLE todos (
   id serial PRIMARY KEY,
   note TEXT NOT NULL
);

CREATE TABLE users (
    id serial PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR UNIQUE NOT NULL,
    password VARCHAR NOT NULL,
    admin INT DEFAULT 0
);