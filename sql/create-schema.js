'use strict';

var dbConfig = {
    client: 'postgresql',
    debug: true,
    connection: {
        host: 'localhost',
        user: '',
        password: '',
        database: 'teams',
        charset: 'utf8'
    }
};

var knex = require('knex')(dbConfig);

knex.schema

/***** Drop foreign keys (uncomment for 2nd run) *****/
    /*
    .table('coaches', function(table) {
        table.dropForeign('team_id');
    })

    .table('players', function(table) {
        table.dropForeign('team_id');
    })
    */


/***** Drop tables (uncomment for 2nd run) *****/
    /*
    .dropTableIfExists('teams')
    .dropTableIfExists('coaches')
    .dropTableIfExists('players')
    */


/***** Create tables *****/
    // Teams
    .createTable('teams', function(table) {
        table.increments('id');
        table.string('name', 64).notNullable();
    })

    // Coaches
    .createTable('coaches', function(table) {
        table.increments('id');
        table.string('name', 64).notNullable();
    })

    // Players
    .createTable('players', function(table) {
        table.increments('id');
        table.string('name', 64).notNullable();
        table.integer('games_played').notNullable();
        table.integer('points').notNullable();
    })


/***** Add foreign keys *****/
    .table('coaches', function(table) {
        table.integer('team_id').unsigned().notNullable().references('teams.id');
    })

    .table('players', function(table) {
        table.integer('team_id').unsigned().notNullable().references('teams.id');
    })

/***** Destroy the database connection pool *****/
    .then(function() {
        knex.destroy();
    })


    // Finally, add a .catch handler for the promise chain
    .catch(function(e) {
        console.error(e);
    });
