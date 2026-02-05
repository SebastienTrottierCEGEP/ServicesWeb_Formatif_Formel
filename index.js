// ex03/index.js
// Services Web - Exercice 03
// S. Trottier - Cégep de Victoriaville

import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan'; // Intergiciel de journalisation (logging) des requêtes HTTP
import salutationsRouter from './src/routes/salutations.route.js';

dotenv.config();
const PORT = process.env.port || 3000;

const app = express();

// Utilisation du middleware (intergiciel) pour parser le JSON dans les requêtes
app.use(express.json());

// Configuration de morgan pour la journalisation des requêtes HTTP dans un fichier access.log
import fs from 'fs';
var accessLogStream = fs.createWriteStream('./access.log', 
                                           { flags: 'a' }) // 'a' pour 'append' (ajouter à la fin du fichier)

// Format pour les logs:  22/Jan/2024:15:07:15 +0000 => GET / 200 - 7.331 ms                                        
const formatLogsMorgan = ':date[clf] => :method :url :status - :response-time ms';
app.use(morgan(formatLogsMorgan, 
               { stream: accessLogStream }))

// Router pour les salutations, ajouté comme un middleware (intergiciel) pour les routes commençant par /api/salutations
app.use('/api/salutations', salutationsRouter);

app.get('/api', (req, res) => {
    res.send("<h1>Bienvenue à l'API salutations du formatif formel</h1>");
});

app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});