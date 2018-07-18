UPDATE events
event_attendee = array_append(${attendee}::JSONB, event_attendee_list)
WHERE id = ${id};
SELECT * FROM events WHERE id = ${id};