UPDATE groups 
group_members = array_remove(${currentMemberSelected}::JSONB, group_members)
WHERE id = ${id};
SELECT * FROM groups;