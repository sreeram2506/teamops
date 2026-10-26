import { query, logActivity } from '../database/db'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body.name) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Project name is required'
    })
  }

  const result = await query(
    `
    INSERT INTO projects
      (name, description, status, progress, owner)
    VALUES
      ($1, $2, $3, $4, $5)
    RETURNING id, name, description, status, progress, owner
    `,
    [
      body.name,
      body.description || '',
      body.status || 'Active',
      body.progress ?? 0,
      body.owner || 'John Doe'
    ]
  )

  const project = result.rows[0]

  await logActivity(project.owner, 'created a new project', project.name)

  return project
})
