import { pool } from '../../database/db';

export default defineEventHandler(async (event) => {

  const id = Number(getRouterParam(event, 'id'))

  const result = await pool.query(
    `
    DELETE FROM tasks
    WHERE id = $1
    RETURNING *
    `,
    [id]
  )

  if (result.rows.length === 0) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Task not found'
    })
  }

  return {
    message: 'Task deleted successfully',
    task: result.rows[0]
  }
})