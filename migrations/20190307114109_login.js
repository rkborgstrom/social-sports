exports.up = function(knex, Promise) {
    return knex.schema.createTable('login', (table) => {
        table.increments('id').primary();
        table.string('user_login');
        table.string('password');

    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable('login');
  };