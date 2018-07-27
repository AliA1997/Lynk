SELECT events.*, groups.group_name FROM events JOIN groups ON events.group_id = groups.id;
