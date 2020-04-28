Select cohorts.name as cohort, count(assignment_submissions.*) as total_submission
from assignment_submissions
JOIN students ON student_id = students.id
JOIN cohorts ON cohort_id = cohorts.id
GROUP BY cohort
ORDER BY total_submission DESC; 