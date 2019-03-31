'use strict';

const path = require('path');
const bodyParser = require('body-parser');
const config = require('./knexfile.js')['development'];
const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const knex = require('knex')(config);
const morgan = require('morgan');
const paypal = require('paypal-rest-sdk');
const index = require('./routes/index');
const post = require('./routes/post');
const bets = require('./routes/bets');
const signup = require('./routes/signup');


paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AZIvtqHADp6az9a1jnB5zvSmQSZNzh877_Xy1NGIPdoPu_5W7N3uni9ksTqATWbeba-eMmxJJsaaSqFn',
    'client_secret': 'EJ7qZkJmsP8PTyWo33L6a62O6IfrOND98CLQw6E2-S7E_sWLiOJv3hQklGMa3CeO6jPjYcPW2g-O_rKSz'
  });

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.disable('x-powered-by');
app.use(morgan('short'));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', (req, res, next) => {
    res.render('index', {
        bettors: []
    });
})

app.post('/pay', (req, res) => {
    const create_payment_json = {
      "intent": "sale",
      "payer": {
          "payment_method": "paypal"
      },
      "redirect_urls": {
          "return_url": "http://localhost:8000/success",
          "cancel_url": "http://localhost:8000/cancel"
      },
      "transactions": [{
          "item_list": {
              "items": [{
                  "name": "WVU -4",
                  "sku": "001",
                  "price": "50.00",
                  "currency": "USD",
                  "quantity": 1
              }]
          },
          "amount": {
              "currency": "USD",
              "total": "50.00"
          },
          "description": "WVU -4 for tonights game"
      }]
  };

  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
        throw error;
    } else {
        for(let i = 0;i < payment.links.length;i++){
          if(payment.links[i].rel === 'approval_url'){
            res.redirect(payment.links[i].href);
          }
        }
    }
  });
  
  });

  app.get('/success', (req, res) => {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;
  
    const execute_payment_json = {
      "payer_id": payerId,
      "transactions": [{
          "amount": {
              "currency": "USD",
              "total": "50.00"
          }
      }]
    };

    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
        if (error) {
            console.log(error.response);
            throw error;
        } else {
            console.log(JSON.stringify(payment));
            res.send('Success');
        }
    });
    });
    
    app.get('/cancel', (req, res) => res.send('Cancelled'));


app.use('/index', index);
app.use(post);
app.use(bets);
app.use(signup);




app.use((_req, res) => {
    res.sendStatus(404);
});

app.listen(port, function () {
    console.log('Listening on port', port);
});

module.exports = app;