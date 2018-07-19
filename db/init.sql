CREATE TABLE users (    
    id SERIAL PRIMARY KEY,
    name TEXT,
    username TEXT,
    email TEXT,
    age INTEGER,
    profile_picture TEXT,
    password TEXT,
    groups JSONB[],
    events JSONB[],
    is_admin BOOLEAN,
    verified BOOLEAN,
    verification_link TEXT
);
------- User Sql statements.
--- Registers the User.
INSERT INTO users (name, username, email, profile_picture, password, age)
VALUES
(${name}, ${username}, ${email}, ${profile_picture}, ${password}, ${age})
RETURNING *;

--- Find the User.
SELECT * FROM users WHERE username = $1;




CREATE TABLE groups (
    id SERIAL PRIMARY KEY,
    group_name TEXT,
    group_description TEXT,
    group_image TEXT,
    group_members JSONB[],
    group_admin INTEGER References users(id) ON UPDATE CASCADE ON DELETE CASCADE,
    is_private BOOLEAN
);
--------- Groups Sql statements.
-- Create group:
INSERT INTO groups (group_name, group_description, group_image, group_members, group_admin) 
VALUES 
(${group_name}, ${group_description}, ${group_image}, ${group_members}::JSONB[], ${group_admin}) RETURNING *;

-- Update group:
UPDATE groups 
SET group_name = ${group_name},
group_description = ${group_description},
group_image = ${group_image},
is_private = ${is_private},
group_members = ${group_members}::JSONB[]
WHERE id = ${id};
SELECT * FROM groups;

-- Delete group:
DELETE FROM groups WHERE id = $1;
--- REturn the updated groups after deleting the one specified.
SELECT * FROM groups;

-- Read all groups:
SELECT * FROM groups;





CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    event_name TEXT,
    event_topic TEXT,
    event_image TEXT,
    event_date TEXT,
    event_location TEXT,
    event_attendee_list JSONB[],
    group_id INTEGER REFERENCES groups(id) ON UPDATE CASCADE ON DELETE CASCADE
);
-------- Events Sql statements.
-- Create new event:
INSERT INTO events (event_name, event_topic, event_image, event_date, event_location, event_attendee_list, group_id)
VALUES
(${event_name}, ${event_topic}, ${event_image}, ${event_date}, ${event_location}, ${event_attendee_list}::JSONB[], ${group_id})
RETURNING *;

-- Update event:
UPDATE events 
SET event_name, 
event_topic, 
event_image = ${event_image}
event_date, 
event_location,
 vent_attendee_list, 
 group_id 
VALUE
(${event_name}, ${event_topic}, ${event_date}, ${event_location}, ${event_attendee_list}::JSONB[], ${group_id});
SELECT * FROM events;

-- Delete event:
DELETE FROM events WHERE id = $1;
SELECT * FROM events;

-- Read all events:
SELECT * FROM events;




-------- Chat Sql statements:

CREATE TABLE IF NOT EXISTS chat(
    id SERIAL PRIMARY KEY,
    topic TEXT,
    messages JSONB[],
    users JSONB[]
);

-- Create chat:
INSERT INTO chat(topic, messages, users)
VALUES
(${topic}, ${messages}::JSONB[], ${users}::JSONB[])
RETURNING *;
 
-- Session Table
-- Create a table that holds a session.
CREATE TABLE "session" (
    --- have a sid that is not null and default value is default.
  "sid" varchar NOT NULL COLLATE "default",
  -- Make sure json is not null
	"sess" json NOT NULL,
    --- Have a timestamp of six characters.
	"expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);
ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;
