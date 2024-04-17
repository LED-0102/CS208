CREATE TYPE department AS ENUM ('CSE', 'EE', 'MEMS', 'CE', 'ME');
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
    department department DEFAULT 'MEMS',
    location VARCHAR DEFAULT '',
    room VARCHAR DEFAULT '',
    contact_number VARCHAR DEFAULT ''
);
CREATE TABLE forms (
    form VARCHAR PRIMARY KEY
);
INSERT INTO forms(form) VALUES ('SS04'), ('MM04'), ('E01'), ('Furniture'), ('R1'), ('SS01');
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
CREATE TABLE MM04_data (
    id INT PRIMARY KEY REFERENCES users (id),
    pending INT[],
    seeking INT[],
    previous INT[]
);
CREATE TABLE SS01_data (
    id INT PRIMARY KEY REFERENCES users (id),
    pending INT[],
    seeking INT[],
    previous INT[]
);
CREATE TABLE R1_data (
    id INT PRIMARY KEY REFERENCES users (id),
    pending INT[],
    seeking INT[],
    previous INT[]
);
CREATE TABLE E01_data (
    id INT PRIMARY KEY REFERENCES users (id),
    pending INT[],
    seeking INT[],
    previous INT[]
);
CREATE TABLE Furniture_data (
    id INT PRIMARY KEY REFERENCES users (id),
    pending INT[],
    seeking INT[],
    previous INT[]
);
CREATE TABLE Leave_data (
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
CREATE TABLE E01 (
    id SERIAL PRIMARY KEY,
    note VARCHAR,
    submitter INT REFERENCES users (id),
    receiver INT REFERENCES users (id),
    date VARCHAR,
    employee_id VARCHAR,
    hod_name VARCHAR,
    hod_signature_date VARCHAR,
    jr_name VARCHAR,
    jr_signature_date VARCHAR,
    approval_status state,
    reason VARCHAR
);
CREATE TABLE MM04 (
    id SERIAL PRIMARY KEY,
    note VARCHAR,
    submitter INT REFERENCES users (id),
    receiver INT REFERENCES users (id),
    quotation_no VARCHAR,
    date VARCHAR,
    requester_name VARCHAR,
    amount INT,
    amount_tax INT,
    amount_words VARCHAR,
    name_member VARCHAR,
    name_convener VARCHAR,
    designation_member VARCHAR,
    approval_status state,
    reason VARCHAR
);
CREATE TABLE R1 (
    id SERIAL PRIMARY KEY,
    note VARCHAR,
    submitter INT REFERENCES users (id),
    receiver INT REFERENCES users (id),
    date VARCHAR,
    purpose_of_expenditure VARCHAR,
    name_of_applicant VARCHAR,
    designation VARCHAR,
    department VARCHAR,
    payment_favour VARCHAR,
    budget_head_expenditure VARCHAR,
    project_sanction_no VARCHAR,
    expenditure_head VARCHAR,
    amount_claimed INT,
    recommending_authority_name VARCHAR,
    approving_authority_name VARCHAR,
    approval_status state,
    reason VARCHAR
);
CREATE TABLE SS01 (
    id SERIAL PRIMARY KEY,
    note VARCHAR,
    submitter INT REFERENCES users (id),
    receiver INT REFERENCES users (id),
    date VARCHAR,
    name_of_custodian VARCHAR,
    department VARCHAR,
    location VARCHAR,
    designation VARCHAR,
    inventory_no VARCHAR,
    room_no VARCHAR,
    item_purchase_info VARCHAR,
    name_head VARCHAR,
    list_orders jsonb,
    total_amount INT,
    supplier_name_address VARCHAR,
    po_no_date VARCHAR,
    budget_head_account VARCHAR,
    challan_no_date VARCHAR,
    invoice_no_date VARCHAR,
    invoice_amount INT,
    project_no VARCHAR,
    name_indenter VARCHAR,
    sign_date_indenter VARCHAR,
    sign_date_head VARCHAR,
    approval_status state,
    reason VARCHAR
);
CREATE TABLE Furniture (
    id SERIAL PRIMARY KEY,
    note VARCHAR,
    submitter INT REFERENCES users (id),
    receiver INT REFERENCES users (id),
    date VARCHAR,
    name_indenter VARCHAR,
    designation VARCHAR,
    discipline VARCHAR,
    budget_head VARCHAR,
    room_no VARCHAR,
    building VARCHAR,
    purpose VARCHAR,
    nature VARCHAR,
    present_availability VARCHAR,
    sign_date VARCHAR,
    approval_status state,
    reason VARCHAR
);
CREATE TABLE Leave (
    id SERIAL PRIMARY KEY,
    note VARCHAR,
    submitter INT REFERENCES users (id),
    receiver INT REFERENCES users (id),
    date VARCHAR,
    leave_reason VARCHAR,
    start_date VARCHAR,
    end_date VARCHAR,
    approval_status state,
    reason VARCHAR
);
CREATE TABLE students (
    roll_no VARCHAR PRIMARY KEY,
    student_name VARCHAR,
    email_id VARCHAR,
    batch VARCHAR,
    degree VARCHAR
);
CREATE TABLE inventory (
    instrument_id VARCHAR PRIMARY KEY,
    instrument_name VARCHAR NOT NULL,
    location VARCHAR
);
CREATE TABLE Energy_and_Sensor_Lab (
    id SERIAL PRIMARY KEY,
    today_date VARCHAR,
    schedule jsonb
);
CREATE TABLE Advanced_Functional_Materials_Research_Group_Lab (
    id SERIAL PRIMARY KEY,
    today_date VARCHAR,
    schedule jsonb
);
CREATE TABLE Materials_and_Thin_Film_Devices_Lab (
    id SERIAL PRIMARY KEY,
    today_date VARCHAR,
    schedule jsonb
);
CREATE TABLE FESEM_EBSD_EDS_Lab (
    id SERIAL PRIMARY KEY,
    today_date VARCHAR,
    schedule jsonb
);
CREATE TABLE Metal_Forming_Surface_Engineering_Lab (
    id SERIAL PRIMARY KEY,
    today_date VARCHAR,
    schedule jsonb
);
CREATE TABLE Polymer_Nanostructures_Device_Fabrication_Lab (
    id SERIAL PRIMARY KEY,
    today_date VARCHAR,
    schedule jsonb
);
CREATE TABLE Mechanics_of_Material_Lab (
    id SERIAL PRIMARY KEY,
    today_date VARCHAR,
    schedule jsonb
);
CREATE TABLE Nano_Materials_Energy_Devices_Lab (
    id SERIAL PRIMARY KEY,
    today_date VARCHAR,
    schedule jsonb
);
CREATE TABLE Thin_Films_Coatings_Lab (
    id SERIAL PRIMARY KEY,
    today_date VARCHAR,
    schedule jsonb
);
CREATE TABLE Materials_Research_Lab (
    id SERIAL PRIMARY KEY,
    today_date VARCHAR,
    schedule jsonb
);
CREATE TABLE Corrosion_Engineering_Lab (
    id SERIAL PRIMARY KEY,
    today_date VARCHAR,
    schedule jsonb
);
CREATE TABLE Soft_Materials_Research_Lab (
    id SERIAL PRIMARY KEY,
    today_date VARCHAR,
    schedule jsonb
);
CREATE TABLE Welding_Engineering_Lab (
    id SERIAL PRIMARY KEY,
    today_date VARCHAR,
    schedule jsonb
);
CREATE TABLE Materials_Joining_and_Mechanical_Testing_Lab (
    id SERIAL PRIMARY KEY,
    today_date VARCHAR,
    schedule jsonb
);
CREATE TABLE Physical_Metallurgy_Laboratory (
    id SERIAL PRIMARY KEY,
    today_date VARCHAR,
    schedule jsonb
);
CREATE TABLE Non_equilibrium_Advanced_Materials_Engineering_Lab (
    id SERIAL PRIMARY KEY,
    today_date VARCHAR,
    schedule jsonb
);
CREATE TABLE Foundry_Engineering_Lab (
    id SERIAL PRIMARY KEY,
    today_date VARCHAR,
    schedule jsonb
);
CREATE TABLE Solidification_and_Nanomaterials_Lab (
    id SERIAL PRIMARY KEY,
    today_date VARCHAR,
    schedule jsonb
);
CREATE TABLE Solid_State_Ionics_Lab (
    id SERIAL PRIMARY KEY,
    today_date VARCHAR,
    schedule jsonb
);
CREATE TABLE Micro_Structure_and_Texture_Lab (
    id SERIAL PRIMARY KEY,
    today_date VARCHAR,
    schedule jsonb
);
CREATE TABLE Advanced_Mechanical_and_Physical_Metallurgy_Lab (
    id SERIAL PRIMARY KEY,
    today_date VARCHAR,
    schedule jsonb
);
CREATE TABLE Integrated_Computational_Materials_Science_and_Engineering_Lab (
    id SERIAL PRIMARY KEY,
    today_date VARCHAR,
    schedule jsonb
);
CREATE TABLE High_Performance_Computing_Facility (
    id SERIAL PRIMARY KEY,
    today_date VARCHAR,
    schedule jsonb
);