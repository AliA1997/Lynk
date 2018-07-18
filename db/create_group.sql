INSERT INTO groups (group_name, group_description, group_image, group_members, group_admin, is_private) 
VALUES 
(${group_name}, ${group_description}, ${group_image}, ${group_members}::JSONB[], ${group_admin}, ${is_private}) RETURNING *;