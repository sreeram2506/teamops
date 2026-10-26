import { query, logActivity } from '../../database/db'

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))

  const existing = await query(
    'SELECT name, owner FROM projects WHERE id = $1',
    [id]
  )

  if (existing.rows.length === 0) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Project not found'
    })
  }

  await query('UPDATE tasks SET project_id = NULL WHERE project_id = $1', [id])
  await query('DELETE FROM projects WHERE id = $1', [id])

  const project = existing.rows[0]
  await logActivity(project.owner, 'deleted project', project.name)

  return {
    message: 'Project deleted successfully'
  }
})
