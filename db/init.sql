CREATE TABLE users (    
    id SERIAL PRIMARY KEY,
    name TEXT,
    username TEXT,
    email TEXT,
    password TEXT,
    groups JSONB[],
    events JSONB[],
    is_admin BOOLEAN,
    age INTEGER
);
------- User Sql statements.


CREATE TABLE groups (
    id SERIAL PRIMARY KEY,
    group_name TEXT,
    group_description TEXT,
    group_members JSONB[],
    group_admin INTEGER References users(id)
);
------ Groups Sql statements.



CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    event_name TEXT,
    event_topic TEXT,
    event_date TEXT,
    event_location TEXT,
    event_attendee_list JSONB[],
    group_id INTEGER References groups(id)
);
-------- Events Sql statements.

