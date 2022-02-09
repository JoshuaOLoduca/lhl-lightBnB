SELECT city, COUNT(r.id) AS total_reservations
FROM properties p
  JOIN property_reviews r
    ON r.property_id = p.id
GROUP BY city
ORDER BY total_reservations DESC;