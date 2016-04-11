/*!
* Copyright(c) 2016 Basavaraj K N <rajiff@gmail.com>
*/

/*!
* Module dependencies.
*/

const fs = require('fs');
const path = require('path');
const envFile = path.join(__dirname, 'env.json');

var env = {};

// Read env.json file, if it exists, load the configs & settings from that

if (fs.existsSync(envFile)) {
  env = fs.readFileSync(envFile, 'utf-8');
  env = JSON.parse(env);
  Object.keys(env).forEach(key => process.env[key] = env[key]);
}

/**
* Expose
*/

module.exports = {
  host: 'http://localhost:3000',
  db: 'mongodb://127.0.0.1:27017/abcecomm_dev',
};
