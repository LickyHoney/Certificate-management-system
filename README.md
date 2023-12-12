# Certificate-management-system
A basic Certificate Management System that allows users to create and manage digital certificates through a simple front-end interface.

## Introduction
This assignment aims to generate basic OpenSSL certificates and implement features like get all certificates, List all the certificates, and delete the certificate by ID.

# Project Structure
The following is the project structure.

## Technologies
### Front End
- Javascript
- NodeJS
- Express Framework

### Back End
- SQLite

## To install the project
npm install

## To run the project
npm start

## Files

### Server.js
This is a server configuration file in which the server-side code is implemented using Node.js and Express.Implemented necessary configurations for SQLlite and Swagger. In addition to that it contains API endpoints for create a certificate, get all certificates, get a certificate by ID, delete certificate by ID.

### databaseConfig.js
Exports a configuration object for SQLlite by specifying the database name.

### swagger.json
JSON file for Swagger specifications for implementing API documentation for Simplified Certificate Management System.

### public/index.html
This is a form that allows users to generate a certificate by entering user details through the Frontend interface. Also, it allows users to view all certificates.

### public/certificates_list.html
Displays all user details in a tabular format. Users can see the certificates in a popup and can delete the certificates with a button click.

### public/main.js
Javascript file for certificates_list.html to implement the modal logic for the view certificate button.

### public/style.css
File for implementing CSS styles for the UI.
