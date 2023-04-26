DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id SERIAL,
  email VARCHAR (75) UNIQUE,
  first_name VARCHAR (50),
  last_name VARCHAR (50),
  picture TEXT,
  cover_photo TEXT,
  favorite_artist VARCHAR (100),
  favorite_artwork VARCHAR (100),
  favorite_period VARCHAR (50)
);