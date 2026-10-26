<script setup lang="ts">

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth'
})

type Task = {
  id: number
  title: string
  status: string
  assignee: string
  projectId: number
}

const route = useRoute()
const projectId = route.params.id

const {
  data: project,
  pending,
  error,
  refresh
} = await useFetch(`/api/projects/${projectId}`)

const { data: tasks } = await useFetch<Task[]>('/api/tasks')
const { data: members } = await useFetch<{ name: string }[]>('/api/members')

const projectTasks = computed(() => {
  return (tasks.value ?? []).filter(task => String(task.projectId) === String(projectId))
})

const form = reactive({
  name: '',
  description: '',
  status: 'Active',
  progress: 0,
  owner: 'John Doe'
})

watch(project, (value) => {
  if (!value) {
    return
  }

  form.name = value.name
  form.description = value.description
  form.status = value.status
  form.progress = value.progress
  form.owner = value.owner
}, { immediate: true })

const saving = ref(false)
const deleting = ref(false)

const saveProject = async () => {
  saving.value = true

  try {
    await $fetch(`/api/projects/${projectId}`, {
      method: 'PATCH',
      body: form
    })
    await refresh()
  } finally {
    saving.value = false
  }
}

const deleteProject = async () => {
  deleting.value = true

  try {
    await $fetch(`/api/projects/${projectId}`, {
      method: 'DELETE'
    })
    await navigateTo('/projects')
  } finally {
    deleting.value = false
  }
}

</script>

<template>

  <div>

    <div v-if="pending">
      Loading project...
    </div>

    <div v-else-if="error">
      Project could not be loaded.
    </div>

    <div v-else-if="project">

      <div class="page-heading">

        <div>

          <NuxtLink
            to="/projects"
            class="back-link"
          >
            ← Back to Projects
          </NuxtLink>

          <h2>{{ project.name }}</h2>

          <p>
            {{ project.description }}
          </p>

        </div>

        <span class="status">
          {{ project.status }}
        </span>

      </div>

      <div class="project-details-grid">

        <div class="panel">

          <h3>Edit project</h3>

          <form
            class="task-form"
            style="margin-top: 20px"
            @submit.prevent="saveProject"
          >

            <div class="form-field">
              <label>Name</label>
              <input v-model="form.name" required>
            </div>

            <div class="form-field">
              <label>Description</label>
              <textarea v-model="form.description" />
            </div>

            <div class="form-field">
              <label>Status</label>
              <select v-model="form.status">
                <option value="Active">Active</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div class="form-field">
              <label>Progress</label>
              <input
                v-model.number="form.progress"
                type="number"
                min="0"
                max="100"
              >
            </div>

            <div class="form-field">
              <label>Owner</label>
              <select v-model="form.owner">
                <option
                  v-for="member in members"
                  :key="member.name"
                  :value="member.name"
                >
                  {{ member.name }}
                </option>
              </select>
            </div>

            <div class="task-actions">
              <button
                type="submit"
                class="primary-button"
                :disabled="saving"
              >
                {{ saving ? 'Saving...' : 'Save changes' }}
              </button>

              <button
                type="button"
                class="danger-button"
                :disabled="deleting"
                @click="deleteProject"
              >
                {{ deleting ? 'Deleting...' : 'Delete project' }}
              </button>
            </div>

          </form>

        </div>

        <div class="panel">

          <h3>Progress</h3>

          <div class="big-progress">
            {{ project.progress }}%
          </div>

          <div class="progress">
            <div
              class="progress-bar"
              :style="{
                width: `${project.progress}%`
              }"
            />
          </div>

        </div>

      </div>

      <div
        class="panel"
        style="margin-top: 24px"
      >
        <div class="panel-header">
          <div>
            <h3>Tasks</h3>
            <p>Work on this project</p>
          </div>
        </div>

        <div
          v-if="!projectTasks.length"
          class="project-owner"
        >
          No tasks on this project yet.
        </div>

        <div
          v-else
          class="activity-list"
        >
          <div
            v-for="task in projectTasks"
            :key="task.id"
            class="detail-row"
          >
            <span>{{ task.title }} · {{ task.assignee }}</span>
            <strong>{{ task.status }}</strong>
          </div>
        </div>
      </div>

    </div>

  </div>

</template>
