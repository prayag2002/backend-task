const express = require('express');
const router = express.Router();
const pool = require('../database');

// Create a new user
router.post('/register', (req, res) => {
    const { name, email, date_of_birth } = req.body;

    const query = 'INSERT INTO Registration (name, email, date_of_birth) VALUES (?, ?, ?)';
    pool.query(query, [name, email, date_of_birth])
        .then(() => {
            res.status(201).json({ message: 'User registered' });
        })
        .catch((err) => {
            res.status(500).json({ error: err.message });
        });
});

// Get all users
router.get('/registrations', (req, res) => {
    pool.query('SELECT * FROM Registration')
        .then(([rows]) => {
            res.status(200).json(rows);
        })
        .catch((err) => {
            res.status(500).json({ error: err.message });
        });
});

// Update a user
router.put('/registrations/:id', (req, res) => {
    const { id } = req.params;
    const { name, email, date_of_birth } = req.body;

    const query = 'UPDATE Registration SET name = ?, email = ?, date_of_birth = ? WHERE id = ?';
    pool.query(query, [name, email, date_of_birth, id])
        .then(() => {
            res.status(200).json({ message: 'User updated' });
        })
        .catch((err) => {
            res.status(500).json({ error: err.message });
        });
});

// Delete a user
router.delete('/registrations/:id', (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM Registration WHERE id = ?';
    pool.query(query, [id])
        .then(() => {
            res.status(200).json({ message: 'User deleted' });
        })
        .catch((err) => {
            res.status(500).json({ error: err.message });
        });
});

module.exports = router;
