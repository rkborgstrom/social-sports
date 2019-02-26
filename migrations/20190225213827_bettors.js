exports.up = function(knex, Promise) {
    return knex.schema.createTable('bettors', (table) => {
        table.increments('id').primary();
        table.string('username');
        table.string('line');
        table.integer('wagerAmount');
        table.date('date');
        table.time('time');
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable('bettors');
  };