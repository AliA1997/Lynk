INSERT INTO register (name, username, email, password, age)
VALUES
(${name}, ${username}, ${email}, ${password}, ${age})
RETURNING *;
