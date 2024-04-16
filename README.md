# Description

This project aims to handle requests and approvals for various forms, manage lab bookings for all labs under the MEMES office, and oversee multiple essential tasks for MEMES office operations. It's part of the CS 208 course taught by Dr. Abhishek Srivastava.

# Working of the project

## Forms

The project aims to streamline and digitize the process of form requests and approvals within the MEMS Office. Below is a list of the various forms managed by the system:

- **SS04 Form**
- **MM04 Form**
- **SS01 Form**
- **R1 Form**
- **E01 Form**
- **Furniture Committee Form**
- **Leave Form**

## Lab Booking

In addition to managing form requests and approvals, the project also facilitates the booking of all 23 labs overseen by the MEMES Office. Furthermore, it maintains a record of all bookings made through the website.

# Installation Guide

This project requires Rust and React Js pre-installed in your system. Here are the guides.

[Rust Installation Guide](https://www.youtube.com/watch?v=1a7Xtg2RgEo)

[React Js Installation Guide](https://www.youtube.com/watch?v=av5fmpgEJSU)

### Running Back-End

From the main directory of the project, go to \BackEnd\ by typing

    cd .\BackEnd\

into the terminal. To start up the server, type

    docker-compose up -d

and

    cargo run

which starts the back-end side of the server.

### Running Front-End

From the main directory of the project, go to \FrontEnd\client by typing

    cd .\FrontEnd\client

into the terminal. To start the front-end, type

    npm install
    npm start
