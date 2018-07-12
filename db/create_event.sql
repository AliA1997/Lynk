INSERT INTO events (event_name, event_topic, event_image, event_date, event_location, event_attendee_list, group_id)
VALUES (${event_name}, ${event_topic}, ${event_image}, ${event_date}, ${event_location}, ${event_attendee_list}::JSONB[], ${group_id})
RETURNING *;
