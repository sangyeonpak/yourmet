DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id SERIAL,
  email VARCHAR (75) UNIQUE,
  first_name VARCHAR (50),
  last_name VARCHAR (50),
  picture TEXT,
  cover_photo TEXT,
  favorite_artist VARCHAR (100) UNIQUE,
  favorite_artwork VARCHAR (125) UNIQUE
);