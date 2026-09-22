const projects = [
    {
      id: 1,
      name: 'HR Portal',
      description: 'Employee management platform',
      status: 'Active',
      progress: 80,
      owner: 'John Doe'
    },
    {
      id: 2,
      name: 'Mobile Application',
      description: 'Company mobile application',
      status: 'Active',
      progress: 60,
      owner: 'Sarah Wilson'
    },
    {
      id: 3,
      name: 'Analytics Platform',
      description: 'Business analytics dashboard',
      status: 'Completed',
      progress: 95,
      owner: 'Mike Smith'
    }
  ]
  
  export default defineEventHandler((event) => {
  
    const id = getRouterParam(event, 'id')
  
    const project = projects.find(
      project => project.id === Number(id)
    )
  
    if (!project) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Project not found'
      })
    }
  
    return project
  })