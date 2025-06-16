const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'dist/predict-btc')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/predict-btc/index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
