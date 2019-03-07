exports.up = function(knex, Promise) {
    return knex.schema.createTable('bettors', (table) => {
        table.increments('id').primary();
        table.string('username');
        table.string('line');
        table.string('comment');
        table.integer('wagerAmount');
        table.date('date');
        table.time('time');
        table.string('payment');
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable('bettors');
  };