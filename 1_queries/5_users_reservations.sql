SELECT re.*, p.*, avg(ra.rating) as average_rating
FROM properties p
  JOIN reservations re
    ON re.property_id = p.id
  JOIN users u
    ON u.id = re.guest_id
  JOIN property_reviews ra
    ON ra.guest_id = u.id
WHERE u.id = 1
  AND end_date < now()::DATE
GROUP BY re.id, p.id
ORDER BY re.start_date
LIMIT 10;