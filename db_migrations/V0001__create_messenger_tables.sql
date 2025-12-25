-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    avatar_url TEXT,
    status VARCHAR(20) DEFAULT 'offline',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create chats table
CREATE TABLE IF NOT EXISTS chats (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200),
    type VARCHAR(20) DEFAULT 'direct',
    avatar_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create chat_members table
CREATE TABLE IF NOT EXISTS chat_members (
    id SERIAL PRIMARY KEY,
    chat_id INTEGER REFERENCES chats(id),
    user_id INTEGER REFERENCES users(id),
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(chat_id, user_id)
);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    chat_id INTEGER REFERENCES chats(id),
    user_id INTEGER REFERENCES users(id),
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert demo users
INSERT INTO users (username, avatar_url, status) VALUES
('Вы', 'https://api.dicebear.com/7.x/avataaars/svg?seed=user1', 'online'),
('Анна Смирнова', 'https://api.dicebear.com/7.x/avataaars/svg?seed=anna', 'online'),
('Дмитрий Петров', 'https://api.dicebear.com/7.x/avataaars/svg?seed=dmitry', 'offline'),
('Елена Иванова', 'https://api.dicebear.com/7.x/avataaars/svg?seed=elena', 'online')
ON CONFLICT (username) DO NOTHING;

-- Create demo chats
INSERT INTO chats (name, type) VALUES
('Общий чат', 'group'),
('Проект 2024', 'group')
ON CONFLICT DO NOTHING;

-- Add members to chats
INSERT INTO chat_members (chat_id, user_id)
SELECT c.id, u.id
FROM chats c
CROSS JOIN users u
WHERE c.name IN ('Общий чат', 'Проект 2024')
ON CONFLICT DO NOTHING;

-- Add some demo messages
INSERT INTO messages (chat_id, user_id, content)
SELECT 
    (SELECT id FROM chats WHERE name = 'Общий чат' LIMIT 1),
    (SELECT id FROM users WHERE username = 'Анна Смирнова' LIMIT 1),
    'Привет! Как дела?'
WHERE NOT EXISTS (SELECT 1 FROM messages LIMIT 1);

INSERT INTO messages (chat_id, user_id, content)
SELECT 
    (SELECT id FROM chats WHERE name = 'Общий чат' LIMIT 1),
    (SELECT id FROM users WHERE username = 'Вы' LIMIT 1),
    'Отлично! Работаю над новым проектом'
WHERE (SELECT COUNT(*) FROM messages) = 1;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_messages_chat_id ON messages(chat_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at);
CREATE INDEX IF NOT EXISTS idx_chat_members_chat_id ON chat_members(chat_id);
CREATE INDEX IF NOT EXISTS idx_chat_members_user_id ON chat_members(user_id);