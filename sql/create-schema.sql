-- Drop foreign keys
ALTER TABLE coaches
  DROP CONSTRAINT coaches_team_id_foreign;
ALTER TABLE players
  DROP CONSTRAINT players_team_id_foreign;

-- Drop tables
DROP TABLE IF EXISTS teams;
DROP TABLE IF EXISTS coaches;
DROP TABLE IF EXISTS players;

-- Create tables
CREATE TABLE teams (
  id SERIAL PRIMARY KEY,
  name VARCHAR(64) NOT NULL
);

CREATE TABLE coaches (
  id SERIAL PRIMARY KEY,
  name VARCHAR(64) NOT NULL,
  team_id INTEGER NOT NULL
);

CREATE TABLE players (
  id SERIAL PRIMARY KEY,
  name VARCHAR(64) NOT NULL,
  games_played INTEGER NOT NULL,
  points INTEGER NOT NULL,
  team_id INTEGER NOT NULL
);

-- Add foreign keys
ALTER TABLE coaches
  ADD CONSTRAINT coaches_team_id_foreign FOREIGN KEY (team_id)
  REFERENCES teams (id);

ALTER TABLE players
  ADD CONSTRAINT players_team_id_foreign FOREIGN KEY (team_id)
  REFERENCES teams (id);
