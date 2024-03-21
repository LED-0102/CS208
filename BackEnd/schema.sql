CREATE TYPE department_enum AS ENUM ('CSE', 'EE', 'MEMS', 'CE', 'ME');
CREATE TYPE state AS ENUM ('Pending', 'Accepted', 'Rejected');
CREATE TYPE desig AS ENUM ('HOD', 'Staff', 'Professor', 'Office', 'Student');
CREATE TYPE con_enum AS ENUM ('Con', 'N-Con');
CREATE TYPE degree_enum AS ENUM ('PhD', 'MTech', 'MS', 'BTech');
CREATE TYPE claimant_enum AS ENUM ('Claimant', 'Party');
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR UNIQUE NOT NULL,
    password VARCHAR NOT NULL,
    admin INT DEFAULT 0,
    designation desig,
    department department_enum,
    location VARCHAR,
    room VARCHAR,
    contact_number VARCHAR
);
CREATE TABLE forms (
    form VARCHAR PRIMARY KEY
);
INSERT INTO forms(form) VALUES ('SS04'), ('MM04'), ('E01');
CREATE TYPE SS04_orders AS (
    supplier VARCHAR,
    bill VARCHAR,
    and_date VARCHAR,
    item VARCHAR,
    quantity INT,
    con_n_con con_enum,
    unit_price INT,
    total INT
);
CREATE TABLE SS04_data (
    id INT PRIMARY KEY REFERENCES users (id),
    pending INT[],
    seeking INT[],
    previous INT[]
);
CREATE TABLE SS04 (
    id SERIAL PRIMARY KEY,
    note VARCHAR DEFAULT '',
    submitter INT REFERENCES users (id),
    receiver INT REFERENCES users (id),
    date VARCHAR,
    custodian VARCHAR,
    department VARCHAR,
    location VARCHAR,
    contact VARCHAR,
    designation VARCHAR,
    inventory_no VARCHAR,
    room_no VARCHAR,
    email VARCHAR,
    items_receiving_date VARCHAR,
    list_orders jsonb,      --SS04 orders
    total_amount INT,
    name_indenter VARCHAR,
    sign_date_indenter VARCHAR,
    name_head VARCHAR,
    sign_date_head VARCHAR,
    issued_approved_name VARCHAR,
    issued_approved_date VARCHAR,
    items_received_name VARCHAR,
    items_received_date VARCHAR,
    items_issued_name VARCHAR,
    items_issued_date VARCHAR,
    action_ledger_name VARCHAR,
    action_ledger_date VARCHAR,
    approval_status state
);
CREATE TYPE E01_items AS(
    employee_id VARCHAR,
    hod_signature_date VARCHAR,
    jr_signature_date VARCHAR,
    type_of_work VARCHAR,
    request_number VARCHAR
);
CREATE TABLE E01 (
    id INT PRIMARY KEY,
    note VARCHAR,
    submitter INT REFERENCES users (id),
    receiver INT REFERENCES users (id),
    date VARCHAR,
    content E01_items,
    intermediate_approval state,
    hod_approval state,
    reason VARCHAR[]
);
CREATE TABLE MM04 (
    id INT PRIMARY KEY,
    note VARCHAR,
    submitter INT REFERENCES users (id),
    receiver INT REFERENCES users (id),
    date VARCHAR,
    quotation_no VARCHAR,
    date VARCHAR,
    requester_name VARCHAR,
    amount INT,
    amount_tax INT,
    amount_words VARCHAR,
    name_member VARCHAR,
    name_convener VARCHAR,
    designation_member VARCHAR,
    intermediate_approval state,
    hod_approval state,
    reason VARCHAR[]
);
CREATE TYPE R1_items AS (
    purpose_of_expenditure VARCHAR,
    name_of_applicant VARCHAR,
    designation VARCHAR,
    department VARCHAR,
    payment_favour claimant_enum,
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
    date VARCHAR,
    content R1_items,
    intermediate_approval state,
    hod_approval state,
    reason VARCHAR[]
);
CREATE TYPE SS01_orders AS (
    item_name VARCHAR,
    item_specification VARCHAR,
    con_n_con con_enum,
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
    list_orders jsonb,
    total_cost INT,
    issued_approved_name VARCHAR,
    issued_approved_date VARCHAR,
    items_received_name VARCHAR,
    items_received_date VARCHAR,
    items_issued_name VARCHAR,
    items_issued_date VARCHAR,
    action_ledger_name VARCHAR,
    action_ledger_date VARCHAR,
    supplier VARCHAR,
    po_no_date VARCHAR[],
    budget_head_account VARCHAR,
    challan_no_date VARCHAR,
    invoice_no_date VARCHAR[],
    invoice_amount INT,
    project_no VARCHAR,
    name_indenter VARCHAR,
    sign_date_indenter VARCHAR,
    sign_date_head VARCHAR
);
CREATE TABLE SS01 (
    id INT PRIMARY KEY,
    note VARCHAR,
    submitter INT REFERENCES users (id),
    receiver INT REFERENCES users (id),
    date VARCHAR,
    content jsonb,
    intermediate_approval state,
    hod_approval state,
    reason VARCHAR[]
);
CREATE TABLE students (
    roll_no VARCHAR PRIMARY KEY,
    student_name VARCHAR,
    email_id VARCHAR,
    degree degree_enum
);
CREATE TABLE inventory (
    instrument_id VARCHAR PRIMARY KEY,
    instrument_name VARCHAR NOT NULL,
    location VARCHAR
);
