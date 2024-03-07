CREATE TYPE department_enum AS ENUM ('CSE', 'EE', 'MEMS', 'CE', 'ME');
CREATE TYPE state AS ENUM ('Pending', 'Accepted', 'Rejected');
CREATE TYPE desig AS ENUM ('HOD', 'Staff', 'Professor', 'Office', 'Student');
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
    designation desig,
    department department_enum,
    location VARCHAR,
    room VARCHAR,
    contact_number VARCHAR,
    seeking jsonb,      --It would contain primary keys of all the forms
    pending jsonb,
    previous jsonb
);
CREATE TABLE forms (
    form VARCHAR PRIMARY KEY
);
CREATE TYPE SS04_orders AS (
    supplier VARCHAR,
    bill VARCHAR,
    and_date DATE,
    item VARCHAR,
    quantity INT,
    con_n_con ENUM('Con', 'N-Con'),
    unit_price INT,
    total INT
);
CREATE TYPE SS04_items AS (
    items_received_date DATE,
    list_orders SS01_orders[],
    total_amount INT,
    name_indenter VARCHAR,
    sign_date_indenter DATE,
    name_head VARCHAR,
    sign_date_head DATE,
    issued_approved_name VARCHAR,
    issued_approved_date DATE,
    items_received_name VARCHAR,
    items_received_date DATE,
    items_issued_name VARCHAR,
    items_issued_date DATE,
    action_ledger_name VARCHAR,
    action_ledger_date DATE,
);
CREATE TABLE SS04 (
    id INT PRIMARY KEY,
    note VARCHAR,
    submitter INT REFERENCES users (id),
    receiver INT REFERENCES users (id),
    date DATE,
    content SS04_items,
    hod_approval state,
);
CREATE TYPE E01_items AS(
    employee_id VARCHAR,
    hod_signature_date DATE,
    jr_signature_date DATE,
    type_of_work VARCHAR,
    request_number VARCHAR
);
CREATE TABLE E01 (
    id INT PRIMARY KEY,
    note VARCHAR,
    submitter INT REFERENCES users (id),
    receiver INT REFERENCES users (id),
    date DATE,
    content E01_items,
    intermediate_approval state,
    hod_approval state,
    reason VARCHAR[]
);
CREATE TYPE MM04_items AS (
    quotation_no VARCHAR,
    date DATE,
    requester_name VARCHAR,
    amount INT,
    amount_tax INT,
    amount_words VARCHAR,
    name_member VARCHAR,
    name_convenor VARCHAR,
    designation_member VARCHAR,
    designation_convenor VARCHAR
);
CREATE TABLE MM04 (
    id INT PRIMARY KEY,
    note VARCHAR,
    submitter INT REFERENCES users (id),
    receiver INT REFERENCES users (id),
    date DATE,
    content MM04_items,
    intermediate_approval state,
    hod_approval state,
    reason VARCHAR[]
);
CREATE TYPE R1_items AS (
    purpose_of_expenditure VARCHAR,
    name_of_applicant VARCHAR,
    designation VARCHAR,
    department VARCHAR,
    payment_favour ENUM ('Claimant', 'Party'),
    budget_head_expenditure VARCHAR,
    project_sanction_no VARCHAR,
    expenditure_head VARCHAR,
    amount_claimed INT,
    recommending_authority_name VARCHAR,
    approving_authority_name VARCHAR
);
CREATE TABLE R1 (
    id INT PRIMARY KEY,
    note VARCHAR,
    submitter INT REFERENCES users (id),
    receiver INT REFERENCES users (id),
    date DATE,
    content R1_items,
    intermediate_approval state,
    hod_approval state,
    reason VARCHAR[]
);
CREATE TYPE SS01_orders AS (
    item_name VARCHAR,
    item_specification VARCHAR,
    con_n_con ENUM('Con', 'N-Con'),
    required_number INT,
    issued VARCHAR,
    cost INT
);
CREATE TYPE SS01_items AS (
    name_of_custodian VARCHAR,
    department VARCHAR,
    location VARCHAR,
    designation VARCHAR,
    inventory_no VARCHAR,
    room_no VARCHAR,
    item_purchase_info VARCHAR[],
    name_head VARCHAR,
    list_orders SS01_orders[],
    total_cost INT,
    issued_approved_name VARCHAR,
    issued_approved_date DATE,
    items_received_name VARCHAR,
    items_received_date DATE,
    items_issued_name VARCHAR,
    items_issued_date DATE,
    action_ledger_name VARCHAR,
    action_ledger_date DATE,
    supplier VARCHAR,
    po_no_date VARCHAR[],
    budget_head_account VARCHAR,
    challan_no_date VARCHAR,
    invoice_no_date VARCHAR[],
    invoice_amount INT,
    project_no VARCHAR,
    name_indenter VARCHAR,
    sign_date_indenter DATE,
    sign_date_head DATE
);
CREATE TABLE SS01 (
    id INT PRIMARY KEY,
    note VARCHAR,
    submitter INT REFERENCES users (id),
    receiver INT REFERENCES users (id),
    date DATE,
    content SS01_items,
    intermediate_approval state,
    hod_approval state,
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
