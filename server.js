//*

const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.static('./dist/sample-admin-panel'));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname+
        '/dist/sample-admin-panel/index.html'));
});

app.listen(PORT);
