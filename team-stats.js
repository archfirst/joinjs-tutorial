// --------------------------------------------------------
// Initialize knex (the query builder)
// --------------------------------------------------------
var knex = require('knex')({
    client: 'postgresql',
    debug: true,
    connection: {
        host: 'localhost',
        user: '',
        password: '',
        database: 'teams',
        charset: 'utf8'
    }
});

// --------------------------------------------------------
// Team
// --------------------------------------------------------
function Team() {
}

Team.prototype.calculateTotalPoints = function() {

    var i;
    var numPlayers = this.players.length;

    var totalPoints = 0;
    for (i = 0; i < numPlayers; i++) {
        totalPoints = totalPoints + this.players[i].points;
    }

    return totalPoints;
}


// --------------------------------------------------------
// Get team stats
// --------------------------------------------------------
var joinjs = require('join-js');

var resultMaps = [
    {
        mapId: 'teamMap',
        createNew: function() {
            return new Team();
        },
        idProperty: 'id',
        properties: ['name'],
        associations: [
            {name: 'coach', mapId: 'coachMap', columnPrefix: 'coach_'}
        ],
        collections: [
            {name: 'players', mapId: 'playerMap', columnPrefix: 'player_'}
        ]
    },
    {
        mapId: 'coachMap',
        idProperty: 'id',
        properties: ['name']
    },
    {
        mapId: 'playerMap',
        idProperty: {name: 'id', column: 'id'},
        properties: [
            'name',
            {name: 'gamesPlayed', column: 'games_played'},
            'points'
        ]
    }
];

function getTeamStats() {
    return knex
        .select(
            't.id as team_id',
            't.name as team_name',
            'c.id as coach_id',
            'c.name as coach_name',
            'p.id as player_id',
            'p.name as player_name',
            'p.games_played as player_games_played',
            'p.points as player_points')
        .from('teams as t')
        .leftOuterJoin('coaches as c', 'c.team_id', 't.id')
        .leftOuterJoin('players as p', 'p.team_id', 't.id')
        .then(function(resultSet) {
            return joinjs.map(resultSet, resultMaps, 'teamMap', 'team_');
        });
}

// --------------------------------------------------------
// Main
// --------------------------------------------------------
getTeamStats().then(function(teams) {

    console.log(JSON.stringify(teams, null, 4));

    console.log('');

    var i = 0;
    var numTeams = teams.length;
    for (i = 0; i < numTeams; i++) {
        console.log(teams[i].name);
        console.log('    Total points: ' + teams[i].calculateTotalPoints());
    }

    // close the connection
    return knex.destroy();
});
