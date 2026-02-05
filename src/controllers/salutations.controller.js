// Services Web - Exercice 03
// S. Trottier - Cégep de Victoriaville

import { salutations, ajoutSalutation } from '../models/salutations.model.js';

export const getSalutations = (req, res) => {
    // Logique pour obtenir toutes les salutations
    // Version JSON de l'ensemble des salutations
    res.json(salutations);
};

export const getSalutationAleatoire = (req, res) => {
    // Logique pour obtenir une salutation au hasard
    // Validation: param "langue" doit être fourni
    // Attention: req.query et non pas req.params (car c'est un paramètre de requête et non pas de route dynamique) 
    const code_langue = req.query.langue;
    if (code_langue == null) {
        return res.status(400).send('Paramètre "langue" requis');
    }
    // Validation: valeur de param "langue" doit être valide
    if( !['fr', 'en', 'es', 'de'].includes(code_langue)) {
        return res.status(400).send('Valeur de paramètre "langue" invalide');
    }
    const salutationsFiltrees = salutations.filter(
        s => s.code_langue === code_langue);
    if (salutationsFiltrees.length === 0) {
        return res.status(404).send('Aucune salutation trouvée pour cette langue');
    }
    // index aléatoire entre 0 et (longueur du tableau - 1)
    const indexAleatoire = Math.floor(Math.random() * salutationsFiltrees.length);

    const salutationAleatoire = salutationsFiltrees[indexAleatoire];
    res.json(salutationAleatoire);
};

export const createSalutation = (req, res) => {
    // Logique pour créer un produit
    // L'intergiciel (middleware) express.json() a déjà parsé le JSON dans le corps de la requête 
    //  et créé un objet JavaScript req.body avec les données comme propriétés
    const { code_langue, langue, message } = req.body;
    // Validation de la présence des données requises
    if (code_langue == null || langue == null || message == null) {
        return res.status(400).send('Données de salutation incomplètes');
    }
    ajoutSalutation(code_langue, 
                    langue,
                    message);
    res.status(201).send('Salutation créée avec succès');
};