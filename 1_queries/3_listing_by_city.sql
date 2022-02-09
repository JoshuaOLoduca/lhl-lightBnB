select p.id, p.title, p.cost_per_night, avg(r.rating) as average_rating
FROM properties p
  JOIN property_reviews r
    ON r.property_id = p.id
GROUP BY p.id
HAVING avg(r.rating) >= 4
  AND p.city LIKE '%ancouver'
ORDER BY p.cost_per_night ASC
LIMIT 10
;