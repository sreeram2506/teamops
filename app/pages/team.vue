<script setup lang="ts">

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth'
})

const showForm = ref(false)

const {
  data: members,
  pending,
  error,
  refresh
} = await useFetch('/api/members')

const { data: projects } = await useFetch<{ name: string }[]>('/api/projects')

const form = reactive({
  name: '',
  role: 'Team Member',
  email: '',
  project: ''
})

const submitting = ref(false)

const addMember = async () => {
  submitting.value = true

  try {
    await $fetch('/api/members', {
      method: 'POST',
      body: form
    })

    form.name = ''
    form.role = 'Team Member'
    form.email = ''
    form.project = ''
    showForm.value = false
    await refresh()
  } finally {
    submitting.value = false
  }
}

</script>

<template>

  <div>

    <div class="page-heading">

      <div>
        <h2>Team</h2>
        <p>
          People working on TeamOps projects.
        </p>
      </div>

      <button
        class="primary-button"
        @click="showForm = !showForm"
      >
        {{ showForm ? 'Cancel' : '+ Add member' }}
      </button>

    </div>

    <form
      v-if="showForm"
      class="panel settings-form"
      style="margin-bottom: 24px"
      @submit.prevent="addMember"
    >

      <div class="form-field">
        <label>Name</label>
        <input
          v-model="form.name"
          required
        >
      </div>

      <div class="form-field">
        <label>Email</label>
        <input
          v-model="form.email"
          type="email"
          required
        >
      </div>

      <div class="form-field">
        <label>Role</label>
        <input v-model="form.role">
      </div>

      <div class="form-field">
        <label>Current project</label>
        <select v-model="form.project">
          <option value="">
            Unassigned
          </option>
          <option
            v-for="project in projects"
            :key="project.name"
            :value="project.name"
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
        {{ submitting ? 'Adding...' : 'Add member' }}
      </button>

    </form>

    <AppSkeleton
      v-if="pending"
      variant="cards"
      :count="4"
    />

    <div v-else-if="error">
      Failed to load team.
    </div>

    <div
      v-else
      class="projects-grid"
    >

      <div
        v-for="member in members"
        :key="member.email"
        class="project-card"
      >

        <div class="project-card-header">

          <div class="user-profile">

            <div class="avatar">
              {{ member.name.charAt(0) }}
            </div>

            <div class="user-info">
              <strong>{{ member.name }}</strong>
              <span>{{ member.role }}</span>
            </div>

          </div>

        </div>

        <div class="project-owner">
          {{ member.email }}
        </div>

        <div class="detail-row">
          <span>Current project</span>
          <strong>{{ member.project || 'Unassigned' }}</strong>
        </div>

      </div>

    </div>

  </div>

</template>
