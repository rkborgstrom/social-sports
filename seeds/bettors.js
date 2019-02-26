exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('bettors').del()
    .then(function () {
      // Inserts seed entries
      return knex('bettors').insert([
        {
        username: 'Austin Kaess',
        line: 'Kansas -4.5',
        wagerAmount: 75,
        date: '02/27/2019',
        time: '5:20'}
      ]);
    });
};