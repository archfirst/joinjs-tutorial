-- teams
INSERT INTO teams (id, name) VALUES (1, 'Boston Celtics');
INSERT INTO teams (id, name) VALUES (2, 'Los Angeles Lakers');

SELECT setval('teams_id_seq', (SELECT MAX(id) FROM teams));

-- coaches (2007-2008)
INSERT INTO coaches (id, name, team_id) VALUES (1, 'Doc Rivers',   1);
INSERT INTO coaches (id, name, team_id) VALUES (2, 'Phil Jackson', 2);

SELECT setval('coaches_id_seq', (SELECT MAX(id) FROM coaches));

-- players (2007-2008)
INSERT INTO players (id, name, games_played, points, team_id)
VALUES (1, 'Paul Pierce',   80, 1570, 1);

INSERT INTO players (id, name, games_played, points, team_id)
VALUES (2, 'Kevin Garnett', 71, 1337, 1);

INSERT INTO players (id, name, games_played, points, team_id)
VALUES (3, 'Kobe Bryant',   82, 2323, 2);

INSERT INTO players (id, name, games_played, points, team_id)
VALUES (4, 'Pau Gasol',     66, 1246, 2);

SELECT setval('players_id_seq', (SELECT MAX(id) FROM players));
