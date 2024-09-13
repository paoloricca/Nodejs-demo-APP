const express = require('express');
const router = express.Router();

// Define routes
router.get('/book', (req, res) => {
  res.send('List of book');
});

router.get('/book/:id', (req, res) => {
  const userId = req.params.id;
  res.send(`Details of book ${userId}`);
});

router.post('/book', (req, res) => {
    console.log(req.body);
    const book = req.body;
    console.log(book.isbn);
    res.json(book);
});

router.put('/book/:id', (req, res) => {
  const userId = req.params.id;
  res.send(`Update book ${userId}`);
});

router.delete('/book/:id', (req, res) => {
  const userId = req.params.id;
  res.send(`Delete book ${userId}`);
});

module.exports = router;