const express = require('express');
const app = express();
const documentRouter = require('./documents/index');
const cors = require('cors');
const pdf = require('html-pdf');
const pdfTemplate = require('./documents');



const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/create-pdf', (req, res) => {
  pdf.create(pdfTemplate(req.body), {}).toFile('result.pdf', (err) => {
    if (err) {
      res.send(Promise.reject());
    }

    res.send(Promise.resolve());
  });
});

app.get('/fetch-pdf', (req, res) => {
  res.sendFile(`${__dirname}/result.pdf`);
})

app.listen(port, () => console.log(`Listening on port ${port}`));