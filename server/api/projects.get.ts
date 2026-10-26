import { query } from '../database/db'

export default defineEventHandler(async () => {
  const result = await query(`
    SELECT
      id,
      name,
      description,
      status,
      progress,
      owner
    FROM projects
    ORDER BY id
  `)

  return result.rows
})
