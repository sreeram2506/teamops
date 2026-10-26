import { query, mapTask, logActivity } from '../database/db'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const result = await query(
    `
    INSERT INTO tasks
      (title, description, status, priority, assignee, project_id)
    VALUES
      ($1, $2, $3, $4, $5, $6)
    RETURNING *
    `,
    [
      body.title,
      body.description,
      body.status || 'Todo',
      body.priority || 'Medium',
      body.assignee,
      body.projectId
    ]
  )

  const task = mapTask(result.rows[0])

  await logActivity(task.assignee || 'TeamOps', 'created task', task.title)

  return task
})
