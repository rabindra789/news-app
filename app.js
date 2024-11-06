const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();
const userRoute = require("./routes/userRoute.js");
const { refreshTokenMiddleware } = require('./middlewares/jwt.js');

const bodyParser = require('body-parser');
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

app.post('/refresh', refreshTokenMiddleware);

app.use('/', userRoute);

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
