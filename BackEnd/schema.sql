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
CREATE TYPE state AS ENUM ('Pending', 'Sent', 'Accepted', 'Rejected');
CREATE TABLE id (
    table_name VARCHAR(50) PRIMARY KEY,
    count INT DEFAULT 0
);
CREATE TABLE users (
    id INT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR UNIQUE NOT NULL,
    password VARCHAR NOT NULL,
    admin INT DEFAULT 0,
    designation VARCHAR,
    department VARCHAR,
    location VARCHAR,
    room VARCHAR,
    contact_number VARCHAR,
    seeking jsonb,
    pending jsonb,
    previous jsonb
);
CREATE TABLE forms (
    form VARCHAR PRIMARY KEY
);
CREATE TABLE SS04 (
    id INT PRIMARY KEY,
    note VARCHAR,
    submitter INT REFERENCES users (id),
    receiver INT REFERENCES users (id),
    date DATE,
    content SS04_items[],
    approval state,
    reason VARCHAR[]
);
CREATE TABLE students (
    roll_no VARCHAR PRIMARY KEY,
    student_name varchar NOT NULL,
    email_id varchar NOT NULL,
    degree ENUM ('Ph.D.', 'M.Tech.', 'MS', 'B.Tech') NOT NULL
);
CREATE TABLE inventory (
    instrument_id VARCHAR PRIMARY KEY,
    instrument_name VARCHAR NOT NULL,
    location VARCHAR
)
INSERT INTO id(table_name) VALUES ('users');
INSERT INTO id(table_name) VALUES ('forms');
INSERT INTO id(table_name) VALUES ('SS04');
