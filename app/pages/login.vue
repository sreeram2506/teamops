<script setup lang="ts">

definePageMeta({
  layout: false,
  middleware: 'guest'
})

const email = ref('')
const password = ref('')
const errorMessage = ref('')

const authStore = useAuthStore()

const login = async () => {
  errorMessage.value = ''

  const success = authStore.login(email.value, password.value)

  if (!success) {
    errorMessage.value = 'Enter an email and password to sign in.'
    return
  }

  await navigateTo('/dashboard')
}

</script>

<template>

  <div class="login-page">

    <div class="login-card">

      <h1>TeamOps</h1>
      <p>Sign in to your account</p>

      <form @submit.prevent="login">

        <div class="form-field">
          <label for="email">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            placeholder="john@teamops.com"
          >
        </div>

        <div class="form-field">
          <label for="password">Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            placeholder="••••••••"
          >
        </div>

        <p
          v-if="errorMessage"
          class="login-error"
        >
          {{ errorMessage }}
        </p>

        <button
          type="submit"
          class="primary-button"
        >
          Sign In
        </button>

      </form>

    </div>

  </div>

</template>
