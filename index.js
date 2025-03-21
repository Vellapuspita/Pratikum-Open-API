import express from 'express';
import mysql from 'mysql2';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import YAML from 'yaml';

const swaggerDocument = YAML.parseAllDocuments(fs.readFileSync('./openapi/spec.yml', 'utf-8'));

const db = mysql.createConnection({host: "localhost", user: "root", database: "openapi", password: ""});
const app = express();

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/users', (req, res) => {
    db.query('SELECT * FROM users', (err, result) => {
        if (err) {
            res.status(500).send('Internal Server Error');
            return;
        }

    res.json(result);

    });
});
app.listen(3000, () => console.log('Server berjalan di http://localhost:3000'))