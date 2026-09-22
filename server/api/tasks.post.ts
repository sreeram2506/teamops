import { tasks } from '../data/tasks';

export default defineEventHandler(async (event) => {

  const body = await readBody(event)

  const task = {
    id: tasks.length + 1,
    title: body.title,
    description: body.description,
    status: body.status || 'Todo',
    priority: body.priority || 'Medium',
    assignee: body.assignee,
    projectId: body.projectId
  }

  tasks.push(task)

  return task
})