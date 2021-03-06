const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const {sequelize} = require('./models');
const config = require('./config/config');
const routes = require('./routes/routes');

const app = express();

app.use(morgan('combined'));

app.use(bodyParser.json());

app.use(cors());

routes(app);

sequelize.sync({force: false})
  .then( () => {
    app.listen(config.port || 5004);
    console.log(`Server started on port ${config.port}`);
  })
