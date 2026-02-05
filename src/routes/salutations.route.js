// Services Web - Exercice 03
// S. Trottier - Cégep de Victoriaville

import { getSalutations, createSalutation, getSalutationAleatoire } from '../controllers/salutations.controller.js';

// Nous avons besoin d'importer le module express pour utiliser la classe Router
import express from 'express';
// Nous créons un objet router qui va nous permettre de gérer les routes
const router = express.Router();

// Route pour obtenir la liste des salutations (à partir de /api/salutations)
router.get('/liste', getSalutations);

// Route pour obtenir une salutation au hasard
router.get('/hasard', getSalutationAleatoire);

// Route pour créer une nouvelle salutation 
router.post('/', createSalutation);

// IMPORTANT: On exporte le router pour pouvoir l'utiliser dans index.js
// Cet objet peut être utilisé comme un middleware
export default router;