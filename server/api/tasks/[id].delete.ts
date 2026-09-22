import { tasks } from '../../data/tasks';

export default defineEventHandler((event) => {

  const id = Number(
    getRouterParam(event, 'id')
  )

  const index = tasks.findIndex(
    task => task.id === id
  )

  if (index === -1) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Task not found'
    })
  }

  tasks.splice(index, 1)

  return {
    message: 'Task deleted successfully'
  }

})