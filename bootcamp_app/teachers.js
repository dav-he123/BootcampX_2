const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  password: "postgres",
  host: "localhost",
  database: "postgres",
});

pool
  .query(
    `
    Select teachers.name as name, cohorts.name as cohort, count(assistance_requests.*) as total_assistances
    FROM teachers
    JOIN assistance_requests ON teacher_id = teachers.id
    JOIN students ON student_id = students.id
    JOIN cohorts ON cohort_id = cohorts.id
    WHERE cohorts.name LIKE '%${process.argv[2] || "JUL02"}%'
    GROUP BY teachers.name, cohorts.name
    ORDER BY teachers.name
    LIMIT ${process.argv[3] || 5};
  
`
  )
  .then((res) => {
    res.rows.forEach((user) => {
      console.log(
        `${user.name} in the ${user.cohort} cohort had ${user.total_assistances} requests.`
      );
    });
  })
  .catch((err) => console.error("query error", err.stack));
