import { pool } from '../database/db';

export default defineEventHandler(async () => {

  const result = await pool.query(`
    SELECT
      id,
      title,
      description,
      status,
      priority,
      assignee,
      project_id
    FROM tasks
    ORDER BY id DESC
  `)

  return result.rows

})