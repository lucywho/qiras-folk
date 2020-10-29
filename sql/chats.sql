DROP TABLE IF EXISTS chats;

CREATE TABLE chats (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    chat_text VARCHAR(500) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO chats (user_id, chat_text) VALUES (
    '0',
    'Welcome to the chat room'
);
