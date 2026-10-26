import { query } from '../../database/db'

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))

  const result = await query(
    `
    SELECT
      id,
      name,
      description,
      status,
      progress,
      owner
    FROM projects
    WHERE id = $1
    `,
    [id]
  )

  if (result.rows.length === 0) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Project not found'
    })
  }

  return result.rows[0]
})
