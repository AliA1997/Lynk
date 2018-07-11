DELETE FROM groups WHERE id = $1;
--- REturn the updated groups after deleting the one specified.
SELECT * FROM groups;