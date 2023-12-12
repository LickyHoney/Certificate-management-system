# Certificate-management-system
A basic Certificate Management System that allows users to create and manage digital certificates through a simple front-end interface.

## Introduction
The assignment aims to generate basic OpenSSL certificates and implement features like get all certificates, List all the certificates and delete the certificate by ID.

# Project Structure
The following is the project structure.

![Alt text](https://github.com/LickyHoney/Certificate-management-system/blob/main/project%20structure.png "Optional title")


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
This server configuration file encompasses the server-side implementation using Node.js and Express. It includes essential configurations for SQLite and Swagger, showcasing API endpoints for various functionalities. These functionalities involve creating a certificate, retrieving all certificates, fetching a specific certificate by ID, and deleting a certificate by ID. The code is structured to facilitate these operations efficiently within the context of a certificate management system. If you have specific inquiries or require assistance with any aspect of the code, please provide relevant details for further guidance.

### databaseConfig.js
Exports a configuration object for SQLlite by specifying the database "certificates.db".

### swagger.json
The JSON file provided is an OpenAPI specification for Swagger, a tool that facilitates the documentation of APIs. It comprehensively outlines all the API endpoints associated with the Simplified Certificate Management System. To interact with the Swagger documentation, users can navigate to http://localhost:3000/api-docs after initiating the server.

### public/index.html
The provided form serves as a Frontend interface, enabling users to generate certificates by entering specific details. The form collects user information, including common name (CN), organization (O), organizational unit (OU), locality (L), state (ST), and country (C). Upon submission, the data is sent to the server to generate a certificate. Additionally, the form includes a link to view all certificates, redirecting users to a dedicated page showcasing a list of available certificates. This functionality enhances the user experience by providing a seamless and intuitive way to interact with the Certificate Management System.

### public/certificates_list.html
The system displays user details in a tabular format, presenting a structured view of the information. Users can explore certificates through this table, and each entry includes options for viewing the certificate details in a popup and deleting the certificate. The popup feature enhances user accessibility, allowing for a closer examination of individual certificates. Furthermore, the delete button provides a straightforward mechanism for users to remove certificates they no longer need. This setup streamlines the user interface, providing a comprehensive and user-friendly experience for managing certificates within the system. 

### public/main.js
Javascript file that incorporate the modal logic for the "View Certificate" button in the certificates_list.html

### public/style.css
Implement styles for the Simplified Certificate Management System's user interface.