const express = require('express');
const path = require('path');

const app = express();


app.use('/*', function (req, res) {
    res.sendFile(path.join(`${__dirname}/dist/membership-frontend/index.html`));
});

app.listen(process.env.PORT || 8080);