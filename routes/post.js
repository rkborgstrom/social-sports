'use strict'; 
/* eslint-env node */
/* eslint-disable no-use-before-define */

let router = require('express').Router();
let env = process.env.NODE_ENV || 'development';
let config = require('../knexfile')[env];
let knex = require('knex')(config);

router.get('/post', (req, res) => {
  res.render('post', {title: 'Create An Account'}); //renders account ejs file
});

router.post('/post', (req, res, next) => {
    knex('bettors')
    .insert({
        username: req.body.username,
        line: req.body.line,
        comment: req.body.comment,
        wagerAmount: req.body.wagerAmount,
        date: req.body.date,
        time: req.body.time,
        payment: req.body.payment,
    }, '*')
  
    .then((bettors) => {
        res.render('index', {bettors});
    })
  
    .catch((err) => {
        next(err);
    });
  });

  
  router.delete('/post/:id', (req, res, next) => {
    let reports;
  
    knex('bettors')
      .where('id', req.params.id)

      .first()
      .then((row) => {
        if (!row) {
          return next();
        }
        reports = row;
        return knex('bettors')
          .del()
          .where('id', req.params.id);
      })
      .then(() => {
        delete bettors.id;
        res.send(post);
      })
      .catch((err) => {
        next(err);
      });
  });






module.exports = router;