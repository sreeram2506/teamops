import { query, mapTask, logActivity } from '../../database/db'

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))

  const result = await query(
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

  const task = mapTask(result.rows[0])

  await logActivity(task.assignee || 'TeamOps', 'deleted task', task.title)

  return {
    message: 'Task deleted successfully',
    task
  }
})
