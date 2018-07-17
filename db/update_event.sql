UPDATE events 
SET event_name = ${event_name},
event_topic = ${event_topic},
-- event_image = ${event_image},    
event_date = ${event_date}, 
event_location = ${event_location},
event_attendee_list = ${event_attendee_list}::JSONB[], 
 group_id = ${group_id};
SELECT * FROM events;