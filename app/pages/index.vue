<script setup lang="ts">

definePageMeta({
  layout: false
})

const authStore = useAuthStore()

await navigateTo(
  authStore.isLoggedIn ? '/dashboard' : '/login',
  { replace: true }
)

</script>

<template>
  <div />
</template>
