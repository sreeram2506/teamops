import { query } from '../database/db'

export default defineEventHandler(async () => {
  const result = await query(`
    SELECT id, name, role, email, project
    FROM members
    ORDER BY id
  `)

  return result.rows
})
