import { pool } from '../database/db';

export default defineEventHandler(async () => {

  const result = await pool.query('SELECT NOW()')

  return {
    message: 'Database connection successful',
    time: result.rows[0].now
  }

})