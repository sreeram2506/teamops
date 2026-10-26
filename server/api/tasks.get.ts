import { query, mapTask } from '../database/db'

export default defineEventHandler(async () => {
  const result = await query(`
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

  return result.rows.map(mapTask)
})
