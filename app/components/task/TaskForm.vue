<script setup lang="ts">

const emit = defineEmits<{
  created: []
}>()

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

      <label>
        Title
      </label>

      <input
        v-model="form.title"
        required
        placeholder="Enter task title"
      >

    </div>

    <div class="form-field">

      <label>
        Description
      </label>

      <textarea
        v-model="form.description"
        placeholder="Describe the task"
      />

    </div>

    <div class="form-field">

      <label>
        Priority
      </label>

      <select v-model="form.priority">

        <option value="Low">
          Low
        </option>

        <option value="Medium">
          Medium
        </option>

        <option value="High">
          High
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