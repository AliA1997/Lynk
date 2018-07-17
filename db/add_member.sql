UPDATE groups 
group_members = array_append(${currentMemberSelected}::JSONB, group_members)
WHERE id = ${id};
SELECT * FROM groups;