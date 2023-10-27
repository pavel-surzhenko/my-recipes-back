const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./routes/router');
const mongoose = require('mongoose');
require('dotenv/config');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
const foodRouter = require('./routes/food');
const soupsRouter = require('./routes/soups');
const mainRouter = require('./routes/main');
const saladsRouter = require('./routes/salads');
const dessertsRouter = require('./routes/desserts');

app.use('/food', foodRouter);
app.use('/food/soups', soupsRouter);
app.use('/food/main', mainRouter);
app.use('/food/salads', saladsRouter);
app.use('/food/desserts', dessertsRouter);

const dbOptions = { useUnifiedTopology: true };
mongoose
    .connect(process.env.DB_URI, dbOptions)
    .then(() => console.log('DB connected'))
    .catch((err) => console.log(`DB error ${err}`));

const port = process.env.PORT;
const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
