
DROP TABLE IF EXISTS users, reset_codes;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    pic_url TEXT,
    bio VARCHAR(500),
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE reset_codes(
  id SERIAL PRIMARY KEY,
  email VARCHAR NOT NULL,
  code VARCHAR NOT NULL,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE friendships(
    id SERIAL PRIMARY KEY,
    receiver_id INT NOT NULL REFERENCES users(id),
    sender_id INT NOT NULL REFERENCES users(id),
    accepted BOOLEAN DEFAULT FALSE
);