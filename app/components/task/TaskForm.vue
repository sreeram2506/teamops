<script setup lang="ts">

const emit = defineEmits<{
  created: []
}>()

const { data: projects } = await useFetch<{ id: number, name: string }[]>('/api/projects')
const { data: members } = await useFetch<{ name: string }[]>('/api/members')

const form = reactive({
  title: '',
  description: '',
  priority: 'Medium',
  assignee: 'John Doe',
  projectId: 1
})

const submitting = ref(false)

const submitTask = async () => {
  submitting.value = true

  try {
    await $fetch('/api/tasks', {
      method: 'POST',
      body: form
    })

    emit('created')

    form.title = ''
    form.description = ''
    form.priority = 'Medium'
  } finally {
    submitting.value = false
  }
}

</script>

<template>

  <form
    class="task-form"
    @submit.prevent="submitTask"
  >

    <div class="form-field">
      <label>Title</label>
      <input
        v-model="form.title"
        required
        placeholder="Enter task title"
      >
    </div>

    <div class="form-field">
      <label>Description</label>
      <textarea
        v-model="form.description"
        placeholder="Describe the task"
      />
    </div>

    <div class="form-field">
      <label>Priority</label>
      <select v-model="form.priority">
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
    </div>

    <div class="form-field">
      <label>Assignee</label>
      <select v-model="form.assignee">
        <option
          v-for="member in members"
          :key="member.name"
          :value="member.name"
        >
          {{ member.name }}
        </option>
      </select>
    </div>

    <div class="form-field">
      <label>Project</label>
      <select v-model="form.projectId">
        <option
          v-for="project in projects"
          :key="project.id"
          :value="project.id"
        >
          {{ project.name }}
        </option>
      </select>
    </div>

    <button
      type="submit"
      class="primary-button"
      :disabled="submitting"
    >
      {{ submitting ? 'Creating...' : 'Create Task' }}
    </button>

  </form>

</template>
