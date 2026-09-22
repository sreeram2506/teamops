<script setup lang="ts">

defineProps<{
  title: string
  value: string | number
  description: string
}>()

</script>

<template>

  <div class="stat-card">

    <div class="stat-title">
      {{ title }}
    </div>

    <div class="stat-value">
      {{ value }}
    </div>

    <div class="stat-description">
      {{ description }}
    </div>

  </div>

</template>