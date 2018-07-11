UPDATE events SET (event_name, event_topic, event_date, event_location, event_attendee_list, group_id )
VALUE
(${event_name}, ${event_topic}, ${event_date}, ${event_location}, ${event_attendee_list}::JSONB[], ${group_id});
SELECT * FROM events;
