import { pool } from '../../database/db';

export default defineEventHandler(async (event) => {

  const id = Number(getRouterParam(event, 'id'))

  const body = await readBody(event)

  const result = await pool.query(
    `
    UPDATE tasks
    SET
      status = COALESCE($1, status),
      priority = COALESCE($2, priority)
    WHERE id = $3
    RETURNING *
    `,
    [
      body.status,
      body.priority,
      id
    ]
  )

  if (result.rows.length === 0) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Task not found'
    })
  }

  return result.rows[0]
})