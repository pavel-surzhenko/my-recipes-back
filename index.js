const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
require('dotenv/config');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
};

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.use(cors(corsOptions));
const foodRouter = require('./routes/food');
const soupsRouter = require('./routes/soups');
const mainRouter = require('./routes/main');
const saladsRouter = require('./routes/salads');
const dessertsRouter = require('./routes/desserts');
const imageRouter = require('./routes/image');
const home = require('./routes/home');
const randomRouter = require('./routes/random');
const searchRouter = require('./routes/search');

app.use('/', home);
app.use('/food', foodRouter);
app.use('/soups', soupsRouter);
app.use('/main', mainRouter);
app.use('/salads', saladsRouter);
app.use('/desserts', dessertsRouter);
app.use('/image', upload.single('image'), imageRouter);
app.use('/random', randomRouter);
app.use('/search', searchRouter);

const dbOptions = { useUnifiedTopology: true };
mongoose
    .connect(process.env.DB_URI, dbOptions)
    .then(() => console.log('DB connected'))
    .catch((err) => console.log(`DB error ${err}`));

const port = process.env.PORT;
const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
