const express = require('express')
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const order = require('../route/order');
app.use('/api', order);


app.listen(port, () => console.log(`App listening on port ${port}!`));


