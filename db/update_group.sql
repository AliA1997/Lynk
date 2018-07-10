UPDATE groups 
SET group_name = ${group_name},
group_description = ${group_description},
group_members = ${group_members}::JSONB[]
WHERE id = ${id};
SELECT * FROM groups;