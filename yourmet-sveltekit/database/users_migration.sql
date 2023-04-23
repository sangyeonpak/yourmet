DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id SERIAL,
  email TEXT PRIMARY KEY,
  name TEXT,
  favorite_artist TEXT,
  favorite_artwork TEXT
);