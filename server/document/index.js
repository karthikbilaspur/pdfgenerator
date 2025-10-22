const express = require('express');
const router = express.Router();
const pdf = require('pdf-creator-node');
const fs = require('fs');

const html = fs.readFileSync('document.html', 'utf8');

const options = {
  format: 'A4',
  orientation: 'portrait',
  border: '10mm',
};

const document = (req, res) => {
  const { name, email } = req.body;

  const documentData = {
    name,
    email,
  };

  pdf.create(html, documentData, options)
    .then((response) => {
      res.setHeader('Content-Disposition', 'attachment; filename=document.pdf');
      res.setHeader('Content-Type', 'application/pdf');
      res.send(response);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send({ message: 'Error generating PDF' });
    });
};

router.post('/generate-pdf', document);

module.exports = router;