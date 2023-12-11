import express from "express";
import bodyParser from "body-parser";
import low from "lowdb";
import { FileSync } from "lowdb/adapters/FileSync";
// const express = require('express');
// const bodyParser = require('body-parser');
// const low = require('lowdb');
// const FileSync = require('lowdb/adapters/FileSync');

const app = express();
const port = 3000;

const adapter = new FileSync('db.json');
const db = low(adapter);

db.defaults({ certificates: [] }).write();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/certificates', (req, res) => {
    const certificates = db.get('certificates').value();
    res.json(certificates);
});

app.post('/certificates', (req, res) => {
    const { name, email } = req.body;
    const certificate = { name, email };

    db.get('certificates').push(certificate).write();

    res.json(certificate);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
