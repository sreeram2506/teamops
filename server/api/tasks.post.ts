import { pool } from '../database/db';

export default defineEventHandler(async (event) => {

  const body = await readBody(event)

  const result = await pool.query(
    `
    INSERT INTO tasks
      (title, description, status, priority, assignee, project_id)
    VALUES
      ($1, $2, $3, $4, $5, $6)
    RETURNING *
    `,
    [
      body.title,
      body.description,
      body.status || 'Todo',
      body.priority || 'Medium',
      body.assignee,
      body.projectId
    ]
  )

  return result.rows[0]
})