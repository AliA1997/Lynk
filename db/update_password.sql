UPDATE users 
SET password = $1
WHERE username = $2;