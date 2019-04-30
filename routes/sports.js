'use strict'; 
/* eslint-env node */
/* eslint-disable no-use-before-define */

let router = require('express').Router();
let env = process.env.NODE_ENV || 'development';
let config = require('../knexfile')[env];
let knex = require('knex')(config);

router.get('/sports', (req, res, next) => {
  knex('bettors')
  .returning('*')
  .then((bettors) => {
      res.render('sports', {bettors});
  })
  .catch((err) => {
      next(err);
  });
});

module.exports = router;