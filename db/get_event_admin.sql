SELECT  users.email FROM users JOIN groups ON users.id = groups.group_admin 
JOIN events ON events.group_id = groups.id WHERE groups.id = $1;