'use strict';
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const notFoundHandler = require('./error-handlers/404.js');
const errorHandler = require('./error-handlers/500.js');
const logger = require('./middleware/logger.js');

const v1Routes = require('./routes/v1.js');
const v2Routes = require('./routes/v2');
const authRoutes = require('./auth/routes.js');



const PORT = process.env.PORT || 3000;

const app = express();

// App Level MW
app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(logger);

app.get('/',(req,res)=>{
  console.log("are u there")
  res.status(200).send('تفضل عالمعرض')

})

// Routes
app.use(authRoutes);
app.use('/api/v1', v1Routes);
app.use('/api/v2', v2Routes)

app.use('*', notFoundHandler);
app.use(errorHandler);



// start function
function start(){
  if (!PORT) { throw new Error('Missing Port'); }
  app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
  })
}

module.exports = {
  server: app,
  start: start
};