SELECT   t.id            AS team_id,
         t.name          AS team_name,
         c.id            AS coach_id,
         c.name          AS coach_name,
         p.id            AS player_id,
         p.name          AS player_name,
         p.games_played  AS player_games_played,
         p.points        AS player_points
FROM     teams t
         LEFT OUTER JOIN coaches c
                      ON c.team_id = t.id
         LEFT OUTER JOIN players p
                      ON p.team_id = t.id;