const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data/database.sqlite');

db.serialize(() => {
    // 1. Création des tables
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        mail TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        role TEXT NOT NULL
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS patients (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nom TEXT NOT NULL,
        prenom TEXT NOT NULL,
        date_naissance TEXT,
        telephone TEXT,
        email TEXT,
        created_at TEXT DEFAULT (datetime('now'))
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS medecins (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nom TEXT NOT NULL,
        prenom TEXT NOT NULL,
        specialite TEXT NOT NULL,
        telephone TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS appointments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        patient_id INTEGER NOT NULL,
        medecin_id INTEGER NOT NULL,
        date_rdv TEXT NOT NULL,
        motif TEXT,
        statut TEXT DEFAULT 'planifie',
        FOREIGN KEY (patient_id) REFERENCES patients(id),
        FOREIGN KEY (medecin_id) REFERENCES medecins(id)
    )`);

    // 2. Insertion des données (via OR IGNORE pour éviter les erreurs si relancé)
    db.run(`INSERT OR IGNORE INTO users (mail, password, role) VALUES
        ('admin@cliniqueplus.fr', 'azerty', 'admin'),
        ('secretaire@cliniqueplus.fr', 'azerty', 'staff'),
        ('dr.martin@cliniqueplus.fr', 'azerty', 'medecin')`);

    db.run(`INSERT OR IGNORE INTO medecins (nom, prenom, specialite, telephone) VALUES
        ('Martin', 'Sophie', 'Cardiologie', '0600000001'),
        ('Leblanc', 'Pierre', 'Généraliste', '0600000002'),
        ('Durand', 'Isabelle', 'Pédiatrie', '0600000003')`);

    db.run(`INSERT OR IGNORE INTO patients (nom, prenom, date_naissance, telephone, email) VALUES
        ('Dupont', 'Jean', '1980-04-12', '0611111111', 'jean.dupont@mail.fr'),
        ('Bernard', 'Claire', '1995-09-22', '0622222222', 'claire.bernard@mail.fr'),
        ('Moreau', 'Luc', '1972-01-30', '0633333333', 'luc.moreau@mail.fr')`);

    db.run(`INSERT OR IGNORE INTO appointments (patient_id, medecin_id, date_rdv, motif, statut) VALUES
        (1, 1, '2025-06-15 09:00', 'Bilan cardiaque', 'planifie'),
        (2, 2, '2025-06-16 10:30', 'Consultation générale', 'confirme'),
        (3, 3, '2025-06-17 14:00', 'Suivi pédiatrique', 'planifie')`);

    console.log("Base de données initialisée avec succès !");
});

db.close();