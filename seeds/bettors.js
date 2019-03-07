exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('bettors').del()
    .then(function () {
      return knex('bettors').insert([
        {
        username: 'Austin Kaess',
        line: 'Kansas -4.5',
        comment: 'I will take it for 40',
        wagerAmount: 75,
        date: '02/27/2019',
        time: '5:20',
        payment: 'Venmo'
        }
      ]);
    });
};