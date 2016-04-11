/*!
 * Copyright(c) 2016 Basavaraj K N <rajiff@gmail.com>
 */

/**
 * Module dependencies.
 */
 
const path = require('path');
const extend = require('util')._extend;

const development = require('./env/development');

const defaults = {
  root: path.join(__dirname, '..')
};

/**
 * Expose
 */

module.exports = {
  development: extend(development, defaults)
}[process.env.NODE_ENV || 'development'];
