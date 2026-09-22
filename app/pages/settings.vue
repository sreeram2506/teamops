<script setup lang="ts">

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth'
})

const profile = reactive({
  name: 'John Doe',
  role: 'Administrator',
  email: 'john.doe@teamops.io',
  notifications: true
})

const saved = ref(false)

const saveSettings = () => {
  saved.value = true
}

</script>

<template>

  <div>

    <div class="page-heading">

      <div>
        <h2>Settings</h2>
        <p>
          Update your profile and notification preferences.
        </p>
      </div>

    </div>

    <form
      class="panel settings-form"
      @submit.prevent="saveSettings"
    >

      <div class="form-field">
        <label for="name">Name</label>
        <input
          id="name"
          v-model="profile.name"
        >
      </div>

      <div class="form-field">
        <label for="email">Email</label>
        <input
          id="email"
          v-model="profile.email"
          type="email"
        >
      </div>

      <div class="form-field">
        <label for="role">Role</label>
        <input
          id="role"
          v-model="profile.role"
          disabled
        >
      </div>

      <label class="settings-toggle">
        <input
          v-model="profile.notifications"
          type="checkbox"
        >
        Email notifications
      </label>

      <button
        type="submit"
        class="primary-button"
      >
        Save changes
      </button>

      <p
        v-if="saved"
        class="settings-saved"
      >
        Settings saved.
      </p>

    </form>

  </div>

</template>
