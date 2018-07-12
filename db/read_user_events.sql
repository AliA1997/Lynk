SELECT events.*, groups.group_name, users.username FROM groups JOIN events ON events.group_id = groups.id JOIN users ON groups.group_admin = users.id;

