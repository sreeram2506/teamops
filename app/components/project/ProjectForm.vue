<script setup lang="ts">

const emit = defineEmits<{
  created: []
}>()

const { data: members } = await useFetch<{ name: string }[]>('/api/members')

const form = reactive({
  name: '',
  description: '',
  owner: 'John Doe'
})

const submitting = ref(false)

const submitProject = async () => {
  submitting.value = true

  try {
    await $fetch('/api/projects', {
      method: 'POST',
      body: form
    })

    emit('created')

    form.name = ''
    form.description = ''
  } finally {
    submitting.value = false
  }
}

</script>

<template>

  <form
    class="task-form"
    @submit.prevent="submitProject"
  >

    <div class="form-field">
      <label>Name</label>
      <input
        v-model="form.name"
        required
        placeholder="Enter project name"
      >
    </div>

    <div class="form-field">
      <label>Description</label>
      <textarea
        v-model="form.description"
        placeholder="Describe the project"
      />
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

    <button
      type="submit"
      class="primary-button"
      :disabled="submitting"
    >
      {{ submitting ? 'Creating...' : 'Create Project' }}
    </button>

  </form>

</template>
