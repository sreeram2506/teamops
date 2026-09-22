import { tasks } from '../../data/tasks';

export default defineEventHandler(async (event) => {

  const id = Number(
    getRouterParam(event, 'id')
  )

  const body = await readBody(event)

  const task = tasks.find(
    task => task.id === id
  )

  if (!task) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Task not found'
    })
  }

  if (body.status) {
    task.status = body.status
  }

  if (body.priority) {
    task.priority = body.priority
  }

  return task
})