<script setup lang="ts">

withDefaults(defineProps<{
  variant?: 'stats' | 'cards' | 'list' | 'activity' | 'detail'
  count?: number
}>(), {
  variant: 'cards',
  count: 3
})

</script>

<template>

  <section
    v-if="variant === 'stats'"
    class="stats-grid"
  >
    <div
      v-for="item in count"
      :key="item"
      class="stat-card"
    >
      <div class="skeleton skeleton-line short" />
      <div class="skeleton skeleton-value" />
      <div class="skeleton skeleton-line" />
    </div>
  </section>

  <div
    v-else-if="variant === 'cards'"
    class="projects-grid"
  >
    <div
      v-for="item in count"
      :key="item"
      class="project-card"
    >
      <div class="skeleton skeleton-title" />
      <div class="skeleton skeleton-line" />
      <div class="skeleton skeleton-line short" />
      <div class="skeleton skeleton-bar" />
    </div>
  </div>

  <div
    v-else-if="variant === 'list'"
    class="task-list"
  >
    <div
      v-for="item in count"
      :key="item"
      class="project-card"
    >
      <div class="skeleton skeleton-title" />
      <div class="skeleton skeleton-line" />
      <div class="skeleton skeleton-line short" />
    </div>
  </div>

  <div
    v-else-if="variant === 'activity'"
    class="activity-list"
  >
    <div
      v-for="item in count"
      :key="item"
      class="activity-item"
    >
      <div class="skeleton skeleton-avatar" />
      <div style="flex: 1">
        <div class="skeleton skeleton-line" />
        <div class="skeleton skeleton-line short" />
      </div>
    </div>
  </div>

  <div
    v-else
    class="project-details-grid"
  >
    <div class="panel">
      <div class="skeleton skeleton-title" />
      <div class="skeleton skeleton-line" />
      <div class="skeleton skeleton-line" />
      <div class="skeleton skeleton-line short" />
    </div>
    <div class="panel">
      <div class="skeleton skeleton-value" />
      <div class="skeleton skeleton-bar" />
    </div>
  </div>

</template>
