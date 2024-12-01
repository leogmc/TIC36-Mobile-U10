const express = require('express');
const router = express.Router();
const vagaRepository = require('../repositories/vagaRepository');

// Return all jobs
router.get('/', async (req, res) => {
  try {
    const vagas = await vagaRepository.findAll();
    res.json({ vagas });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Retorn a job by id
router.get('/:id', async (req, res) => {
  try {
    const vaga = await vagaRepository.findById(req.params.id);
    if (vaga) {
      res.json({ vaga });
    } else {
      res.status(404).json({ error: 'vaga not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new job
router.post('/', async (req, res) => {
  try {
    const vaga = await vagaRepository.create(req.body);
    res.status(201).json({ vaga });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a job by id
router.put('/:id', async (req, res) => {
  try {
    const vaga = await vagaRepository.update(req.params.id, req.body);
    if (vaga) {
      res.json({ vaga });
    } else {
      res.status(404).json({ error: 'vaga not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a job
router.delete('/:id', async (req, res) => {
  try {
    const vaga = await vagaRepository.remove(req.params.id);
    if (vaga) {
      res.json({ vaga });
    } else {
      res.status(404).json({ error: 'vaga not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
