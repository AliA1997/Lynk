SELECT * FROM events WHERE $1 = ANY(event_attendee_list);
