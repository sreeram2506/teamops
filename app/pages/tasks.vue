<script setup lang="ts">

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth'
})

type Task = {
  id: number
  title: string
  description: string
  status: string
  priority: string
  assignee: string
  projectId: number
}

type Project = {
  id: number
  name: string
}

const {
  tasks,
  pending,
  error,
  refresh,
  updateStatus,
  deleteTask
} = useTasks()

const { data: projects } = await useFetch<Project[]>('/api/projects')

const projectName = (projectId: number) => {
  return projects.value?.find(project => project.id === projectId)?.name ?? 'Unknown project'
}


</script>

<template>

  <div>

    <div class="page-heading">

      <div>
        <h2>Tasks</h2>
        <p>
          Track and update work across projects.
        </p>
      </div>

    </div>

    <div class="tasks-layout">

      <div class="panel">
        <div class="panel-header">
          <div>
            <h3>New task</h3>
            <p>Add work for the team</p>
          </div>
        </div>

        <TaskForm @created="refresh()" />
      </div>

      <div>

        <div v-if="pending">
          Loading tasks...
        </div>

        <div v-else-if="error">
          Failed to load tasks.
        </div>

        <div
          v-else-if="!tasks?.length"
          class="panel"
        >
          No tasks yet. Create one to get started.
        </div>

        <div
          v-else
          class="task-list"
        >

          <div
            v-for="task in tasks"
            :key="task.id"
            class="project-card"
          >

            <div class="project-card-header">

              <div>
                <h3>{{ task.title }}</h3>
                <p>{{ task.description }}</p>
              </div>

              <span class="status">
                {{ task.status }}
              </span>

            </div>

            <div class="project-owner">
              {{ task.assignee }} · {{ projectName(task.projectId) }} · {{ task.priority }}
            </div>

            <div class="task-actions">

              <select
                :value="task.status"
                @change="updateStatus(task.id, ($event.target as HTMLSelectElement).value)"
              >
                <option value="Todo">Todo</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>

              <button
                class="danger-button"
                @click="deleteTask(task.id)"
              >
                Delete
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>

  </div>

</template>
