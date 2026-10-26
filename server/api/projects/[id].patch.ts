import { query, logActivity } from '../../database/db'

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))
  const body = await readBody(event)

  const result = await query(
    `
    UPDATE projects
    SET
      name = COALESCE($1, name),
      description = COALESCE($2, description),
      status = COALESCE($3, status),
      progress = COALESCE($4, progress),
      owner = COALESCE($5, owner)
    WHERE id = $6
    RETURNING id, name, description, status, progress, owner
    `,
    [
      body.name,
      body.description,
      body.status,
      body.progress,
      body.owner,
      id
    ]
  )

  if (result.rows.length === 0) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Project not found'
    })
  }

  const project = result.rows[0]
  await logActivity(project.owner, 'updated project', project.name)
  return project
})
