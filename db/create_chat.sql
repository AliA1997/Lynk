INSERT INTO chat(topic, messages, users)
VALUES
(${topic}, ${messages}::JSONB[], ${users}::JSONB[])
RETURNING *;