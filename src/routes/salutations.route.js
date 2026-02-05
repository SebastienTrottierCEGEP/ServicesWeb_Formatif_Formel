// Services Web - Examen Formatif Formel
// S. Trottier - Cégep de Victoriaville

import { _getSalutations, _createSalutation, _getSalutationsPourLangue } from '../controllers/salutations.controller.js';

// Nous avons besoin d'importer le module express pour utiliser la classe Router
import express from 'express';
// Nous créons un objet router qui va nous permettre de gérer les routes
const router = express.Router();

// Route pour obtenir la liste des salutations (à partir de /api/salutations)
router.get('/liste', _getSalutations);

// Route pour obtenir la liste des salutations pour une langue spécifique
router.get('/liste_pour_langue/:code_de_langue', _getSalutationsPourLangue);

// Route pour créer une nouvelle salutation 
router.post('/', _createSalutation);

// IMPORTANT: On exporte le router pour pouvoir l'utiliser dans index.js
// Cet objet peut être utilisé comme un middleware
export default router;