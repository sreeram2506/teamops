export const useTasks = () => {

    const {
      data: tasks,
      pending,
      error,
      refresh
    } = useFetch('/api/tasks')
  
  
    const updateStatus = async (
      id: number,
      status: string
    ) => {
  
      await $fetch(`/api/tasks/${id}`, {
        method: 'PATCH',
        body: { status }
      })
  
      await refresh()
    }
    
    const deleteTask = async (id: number) => {

        await $fetch(`/api/tasks/${id}`, {
          method: 'DELETE'
        })
      
        await refresh()
    }
  
    return {
      tasks,
      pending,
      error,
      refresh,
      updateStatus,
      deleteTask
    }

    
  }