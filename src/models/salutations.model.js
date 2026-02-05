// Services Web - Examen Formatif Formel
// S. Trottier - Cégep de Victoriaville
import pool from '../config/db.js';

async function getSalutations() {
    // Retourne la liste des salutations
    const requete = `SELECT code_langue, langue, message FROM salutations`;
    try {
        // Attention: mysql2 retourne un tableau avec deux éléments : les résultats et les informations sur les champs
        // Nous n'avons besoin que des résultats ici (déstructuration en ignorant le second élément)
        const [resultats] = await pool.query(requete);
        return resultats;
    } catch (erreur) {
        console.error(`Erreur getSalutations(), code: ${erreur.code} sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
        throw erreur;
    }
};

async function getSalutationsPourLangue(code_langue) {
    // Retourne la liste des salutations
    const requete = `SELECT code_langue, langue, message FROM salutations WHERE code_langue = ?`;
    const params = [code_langue];
    try {
        const [resultats] = await pool.query(requete, params);
        return resultats;
    } catch (erreur) {
        console.error(`Erreur getSalutationsPourLangue(), code: ${erreur.code} sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
        throw erreur;
    }
};

async function ajoutSalutation(code_langue, langue, message) {
    // Ajoute une nouvelle salutation à la liste
    // console.log(`Ajout de la salutation : code_langue=${code_langue}, langue=${langue}, message=${message}`);
    const requete = `INSERT INTO salutations (code_langue, langue, message) VALUES (?, ?, ?)`;
    const valeurs = [code_langue, langue, message];
    try {
        const [resultat] = await pool.execute(requete, valeurs);
        console.log(`Salutation ajoutée avec succès, ID: ${resultat.insertId}`);
    } catch (erreur) {
        console.error(`Erreur ajoutSalutation(), code: ${erreur.code} sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
        throw erreur;
    }
};

export { 
    getSalutations,
    getSalutationsPourLangue,
    ajoutSalutation
};