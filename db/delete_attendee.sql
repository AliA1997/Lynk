UPDATE events SET event_attendee_list = array_remove(${event_attendee}::JSONB, event_attendee_list)
WHERE id = ${id};
SELECT events WHERE id = ${id};