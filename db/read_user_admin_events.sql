SELECT events.*, users.username FROM groups JOIN users ON groups.group_admin = users.id
JOIN events ON groups.id = events.group_id WHERE groups.group_admin = $1;