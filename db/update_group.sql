UPDATE groups 
SET group_name = ${group_name},
group_description = ${group_description},
group_members = ${group_members}::JSONB[],
group_image = ${group_image},
is_private = ${is_private}
WHERE id = ${id};
SELECT * FROM groups;