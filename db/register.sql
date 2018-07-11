INSERT INTO users (name, username, email, profile_picture, password, age)
VALUES
(${name}, ${username}, ${email}, ${profile_picture}, ${password}, ${age})
RETURNING *;
