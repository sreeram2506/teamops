import { query, mapTask, logActivity } from '../../database/db'

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))
  const body = await readBody(event)

  const result = await query(
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

  const task = mapTask(result.rows[0])

  if (body.status) {
    await logActivity(task.assignee || 'TeamOps', `moved task to ${body.status}`, task.title)
  }

  return task
})
