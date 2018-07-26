DELETE FROM users WHERE id = $1;
SELECT name, username, email, profile_picture, age, groups::JSONB[], events::JSONB[] FROM users WHERE id != 7;