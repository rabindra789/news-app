const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();
const userRoute = require("./routes/userRoute.js");
const newsRoute = require("./routes/newsRoute.js");
const { refreshTokenMiddleware } = require('./middlewares/jwt.js');

const bodyParser = require('body-parser');
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

app.post('/refresh', refreshTokenMiddleware);

app.use('/api/users', userRoute);
app.use('/api', newsRoute);

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});