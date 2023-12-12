# Certificate-management-system
A basic Certificate Management System that allows users to create and manage digital certificates through a simple front-end interface.

## Introduction
The aim of this assignment is to generate a basic openSSL certificates and implement the features like get all certificates, List all the certicates and delete the certificate by id.

# Project Structure
The following is the project structure.

![Alt text](https://github.com/LickyHoney/Certificate-management-system/blob/main/project%20structure.png "Optional title")


## Technologies
### Front End
- Javascript
- NodeJS
- Express framework

### Back End
- SQLite

## To install the project
npm install

## To run the project
npm start

## Files

### Server.js
This is a server configuration file in which the server-side code is implemented using Node.js and Express.Implemented necessary configurations for SQLlite and Swagger. In addition to that it contains API endpoints for create a certificate, get all certificates, get certificate by id, delete certificate by id.

### databaseConfig.js
Exports a configuration object for SQLlite by specifying the database name.

### swagger.json
JSON file for Swagger specifications for implementing API documentation for Simplified Certificate Management System.

### public/index.html
This is a form which allows user to generate certificate by entering user details through the Fronntend interface. Also, it allows users to view all certificates.

### public/certificates_list.html
Displays all user details in a tabular format. User can see the certificates in a popup and can delete the certificates by a button click.

### public/main.js
Javascript file for certificates_list.html to implement the modal logic for view certificate button.

### public/style.css
File for implementing CSS styles for the UI.