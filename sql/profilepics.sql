DROP TABLE IF EXISTS profilepics;

CREATE TABLE profilepics (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    pic_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);