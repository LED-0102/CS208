CREATE TYPE department_enum AS ENUM ('CSE', 'EE', 'MEMS', 'CE', 'ME');
CREATE TYPE SS04_items AS (
    supplier VARCHAR,
    bill VARCHAR,
    and_date DATE,
    item VARCHAR,
    quantity INT,
    con boolean,
    unit_price INT
);
CREATE TABLE users (
    id INT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR UNIQUE NOT NULL,
    password VARCHAR NOT NULL,
    admin INT DEFAULT 0,
    designation VARCHAR NOT NULL,
    department VARCHAR NOT NULL,
    location VARCHAR,
    room VARCHAR,
    contact_number VARCHAR,
);
CREATE TABLE forms (
    form VARCHAR
);
CREATE TABLE SS04 (
    id serial PRIMARY KEY,
    note VARCHAR,
    submitter INT REFERENCES users (id),
    date DATE,
    submitted boolean,
    content SS04_items[],
    head_approval boolean,
    reason VARCHAR[]
);