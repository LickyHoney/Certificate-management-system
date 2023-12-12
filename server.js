// server.js
import express from 'express';
import { execSync } from 'child_process';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import sqlite3 from "sqlite3";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json" assert { type: "json" };
import databaseConfig from './databaseConfig.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename); 
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// Connect to SQLite database (create a new one if it doesn't exist)
const db = new sqlite3.Database(databaseConfig.database, databaseConfig.options);

let certificates = [];

// Create a 'certificates' table if it doesn't exist
db.run(`
   CREATE TABLE IF NOT EXISTS certificates (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      commonName TEXT,
      organization TEXT,
      unit TEXT,
      locality TEXT,
      state TEXT,
      country TEXT,
      certificate TEXT
      
   )
`);

// POST end point for creating the certificate.
app.post('/certificates', (req, res) => {
    const certificateDetails = req.body;

    // Validate that the request body is a JSON object
    if (typeof certificateDetails !== 'object') {
        return res.status(400).json({ error: 'Invalid JSON object.' });
    }

    // Extract certificate details
    const { id, commonName, organization, unit, locality, state, country } = certificateDetails;

    // Generate a private key
    execSync('openssl genpkey -algorithm RSA -out private-key.pem');

    // Generate a self-signed certificate
    const subj = `/C=${country || 'US'}/ST=${state || 'State'}/L=${locality || 'Locality'}/O=${organization || 'Organization'}/OU=${unit || 'Unit'}/CN=${commonName || 'localhost'}`;
    execSync(`openssl req -x509 -new -key private-key.pem -out certificate.pem -subj "${subj}"`);

    // Store the generated certificate details
    const newCertificate = {
        id,
        commonName,
        organization,
        unit,
        locality,
        state,
        country,
        certificate: execSync('cat certificate.pem').toString()
        
        
    };

   
   db.run(`
   INSERT INTO certificates 
   (commonName, organization, unit, locality, state, country, certificate) 
   VALUES (?, ?, ?, ?, ?, ?, ?)
`, [
   newCertificate.commonName,
   newCertificate.organization,
   newCertificate.unit,
   newCertificate.locality,
   newCertificate.state,
   newCertificate.country,
   newCertificate.certificate
   
   
], (err) => {
   if (err) {
      console.error('Error inserting certificate into the database:', err);
      res.status(500).json({ error: 'Internal Server Error' });
   } else {
      res.json(newCertificate);
   }
});
});

// GET end point to Get all certificates.
app.get('/certificates', (req, res) => {
    // Retrieve all certificates from the 'certificates' table
    db.all('SELECT * FROM certificates', (err, certificates) => {
       if (err) {
          console.error('Error fetching certificates from the database:', err);
          res.status(500).json({ error: 'Internal Server Error' });
       } else {
          res.json(certificates);
       }
    });
 });
 
// GET end point to List all certificates.
app.get('/certificate-list-page', (req, res) => {
    const certificateListPagePath = `${__dirname}/public/certificates_list.html`;
    res.sendFile(certificateListPagePath);
});

// GET end point to get certificate by id.
app.get('/certificates/:id', (req, res) => {
    const certificateId = req.params.id;

    db.get('SELECT * FROM certificates WHERE id = ?', [certificateId], (err, certificate) => {
        if (err) {
            console.error('Error fetching certificate details:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            if (certificate) {
                res.json(certificate);
            } else {
                res.status(404).json({ error: 'Certificate not found' });
            }
        }
    });
});


// DELETE endpoint to delete a certificate by ID
app.delete('/certificates/:id', (req, res) => {
    const certificateId = req.params.id;

    // Delete the certificate from the database
    db.run('DELETE FROM certificates WHERE id = ?', certificateId, (err) => {
        if (err) {
            console.error('Error deleting certificate from the database:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json({ message: 'Certificate deleted successfully' });
        }
    });
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});