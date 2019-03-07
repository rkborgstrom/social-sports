exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('login').del()
    .then(function () {
      // Inserts seed entries
      return knex('login').insert([
        {
        user_login: 'RDawg69',
        password: 'Bearsfan69'
      }
      ]);
    });
};