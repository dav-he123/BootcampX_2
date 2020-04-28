Select day, count(assignments.*) as number_of_assignments, sum(duration)
FROM assignments
GROUP by day
ORDER BY day;


