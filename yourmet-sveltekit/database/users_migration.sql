DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id SERIAL,
  name TEXT,
  email TEXT,
  picture TEXT,
  cover TEXT,
  favorite_artist TEXT,
  favorite_artwork TEXT
);