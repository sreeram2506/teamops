import { query, logActivity } from '../database/db'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body.name || !body.email) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Name and email are required'
    })
  }

  const result = await query(
    `
    INSERT INTO members (name, role, email, project)
    VALUES ($1, $2, $3, $4)
    RETURNING id, name, role, email, project
    `,
    [
      body.name,
      body.role || 'Team Member',
      body.email,
      body.project || null
    ]
  )

  const member = result.rows[0]
  await logActivity(member.name, 'joined the team', member.role)
  return member
})
