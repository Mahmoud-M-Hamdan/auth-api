'use strict';

const { db } = require('./src/models/index');
const {start} = require('./src/server.js');

db.sync().then(() => {
  start();
});