<script setup lang="ts">

const authStore = useAuthStore()

const initials = computed(() => {
  const name = authStore.user?.name

  if (!name) {
    return ''
  }

  return name
    .split(' ')
    .map(part => part.charAt(0))
    .join('')
    .slice(0, 2)
})

</script>

<template>

  <header class="header">

    <div>
      <h1>TeamOps</h1>
    </div>

    <div class="header-actions">

      <template v-if="authStore.isLoggedIn">

        <div class="user-profile">

          <div class="avatar">
            {{ initials }}
          </div>

          <div class="user-info">
            <strong>{{ authStore.user?.name }}</strong>
            <span>{{ authStore.user?.role }}</span>
          </div>

        </div>

        <button
          class="logout-button"
          @click="authStore.logout()"
        >
          Logout
        </button>

      </template>

      <NuxtLink
        v-else
        to="/login"
        class="primary-button"
      >
        Sign in
      </NuxtLink>

    </div>

  </header>

</template>
