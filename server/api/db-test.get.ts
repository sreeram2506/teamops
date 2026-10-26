import { query } from '../database/db'

export default defineEventHandler(async () => {
  const result = await query('SELECT NOW() AS now')

  return {
    message: 'Database connection successful',
    time: result.rows[0].now
  }
})
