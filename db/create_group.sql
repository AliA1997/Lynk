INSERT INTO groups (group_name, group_description, group_members, group_admin) 
VALUES 
(${group_name}, ${group_description}, ${group_members}::JSONB[], ${group_admin}) RETURNING *;