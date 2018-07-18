INSERT INTO users (name, username, email, profile_picture, password, age, verification_link, verified)
VALUES
(${name}, ${username}, ${email}, ${profile_picture}, ${password}, ${age}, ${verification_link}, false)
RETURNING *;
