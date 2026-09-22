<script setup lang="ts">

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth'
})

const {
  data: projects,
  pending,
  error
} = await useFetch('/api/projects')

</script>

<template>

  <div>

    <div class="page-heading">

      <div>
        <h2>Projects</h2>
        <p>
          Manage your team's projects.
        </p>
      </div>

      <button class="primary-button">
        + New Project
      </button>

    </div>

    <div v-if="pending">
      Loading projects...
    </div>

    <div v-else-if="error">
      Failed to load projects.
    </div>

    <div v-else class="projects-grid">

      <div
        v-for="project in projects"
        :key="project.id"
        class="project-card"
      >

        <div class="project-card-header">

          <div>
            <h3>{{ project.name }}</h3>
            <p>{{ project.description }}</p>
          </div>

          <span class="status">
            {{ project.status }}
          </span>

        </div>

        <div class="project-owner">
          Owner: {{ project.owner }}
        </div>

        <div class="project-progress">

          <div class="progress-info">
            <span>Progress</span>
            <strong>{{ project.progress }}%</strong>
          </div>

          <div class="progress">
            <div
              class="progress-bar"
              :style="{ width: `${project.progress}%` }"
            />
          </div>

        </div>

        <NuxtLink
          :to="`/projects/${project.id}`"
          class="view-project"
        >
          View Project →
        </NuxtLink>

      </div>

    </div>

  </div>

</template>