import { query } from '../database/db'

export default defineEventHandler(async () => {
  const result = await query(`
    SELECT id, actor, action, target, created_at
    FROM activity
    ORDER BY created_at DESC
    LIMIT 20
  `)

  return result.rows.map(row => ({
    id: row.id,
    user: row.actor,
    action: row.action,
    target: row.target,
    time: row.created_at
  }))
})
