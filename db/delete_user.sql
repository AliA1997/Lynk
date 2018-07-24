DELETE FROM users WHERE id = $1;
SELECT name, username, email, age, groups, events FROM users;