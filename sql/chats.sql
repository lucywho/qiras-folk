DROP TABLE IF EXISTS chats;

CREATE TABLE chats (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    chat_text VARCHAR(500) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO chats (user_id, chat_text) VALUES (
    '2',
    'hard coded message from sql file number one'
);

INSERT INTO chats (user_id, chat_text) VALUES (
    '23',
    'hard coded message from sql file number two'
);

INSERT INTO chats (user_id, chat_text) VALUES (
    '16',
    'hard coded message from sql file number three'
);

INSERT INTO chats (user_id, chat_text) VALUES (
    '15',
    'hard coded message from sql file number four'
);
