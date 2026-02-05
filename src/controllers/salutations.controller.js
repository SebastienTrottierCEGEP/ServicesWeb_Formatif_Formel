// Services Web - Examen Formatif Formel
// S. Trottier - Cégep de Victoriaville

import { getSalutations, getSalutationsPourLangue, ajoutSalutation } from '../models/salutations.model.js';

export const _getSalutations = async (req, res) => {
    try {
        const salutations = await getSalutations();
        // Version JSON de l'ensemble des salutations
        res.json(salutations);
    } catch (erreur) {
        res.status(500).send('Erreur serveur');
    }
};

export const _getSalutationsPourLangue = async (req, res) => {
    // Logique pour obtenir la liste des salutations pour une langue spécifique
    // Validation: param "code_de_langue" doit être fourni
    // Attention: req.params et non pas req.query (car c'est un paramètre de route dynamique et non pas de requête) 
    const code_langue = req.params.code_de_langue;
    
    // Validation: valeur de param "code_de_langue" doit être valide
    if( !['fr', 'en', 'es', 'de'].includes(code_langue)) {
        return res.status(400).send('"code_de_langue" fourni est invalide');
    }
    try {
        const salutationsFiltrees = await getSalutationsPourLangue(code_langue);
        if (salutationsFiltrees.length === 0) {
            return res.status(404).send('Aucune salutation trouvée pour cette langue');
        }
        res.json(salutationsFiltrees);
    } catch (erreur) {
        res.status(500).send('Erreur serveur');
    }
};

export const _createSalutation = async (req, res) => {
    // Logique pour créer un produit
    // L'intergiciel (middleware) express.json() a déjà parsé le JSON dans le corps de la requête 
    //  et créé un objet JavaScript req.body avec les données comme propriétés
    const { code_langue, langue, message } = req.body;
    // Validation de la présence des données requises
    if (code_langue == null || langue == null || message == null) {
        return res.status(400).send('Données de salutation incomplètes');
    }
    try {
       await ajoutSalutation(code_langue, 
                            langue,
                            message);
        res.status(201).send('Salutation créée avec succès');
    } catch (erreur) {
        res.status(500).send('Erreur serveur');
    }
};