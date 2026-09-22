<script setup lang="ts">

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth'
})

const route = useRoute()

const projectId = route.params.id

const {
  data: project,
  pending,
  error
} = await useFetch(`/api/projects/${projectId}`)

</script>

<template>

  <div>

    <div v-if="pending">
      Loading project...
    </div>

    <div v-else-if="error">
      Project could not be loaded.
    </div>

    <div v-else-if="project">

      <div class="page-heading">

        <div>

          <NuxtLink
            to="/projects"
            class="back-link"
          >
            ← Back to Projects
          </NuxtLink>

          <h2>{{ project.name }}</h2>

          <p>
            {{ project.description }}
          </p>

        </div>

        <span class="status">
          {{ project.status }}
        </span>

      </div>

      <div class="project-details-grid">

        <div class="panel">

          <h3>Project Information</h3>

          <div class="detail-row">
            <span>Owner</span>
            <strong>{{ project.owner }}</strong>
          </div>

          <div class="detail-row">
            <span>Status</span>
            <strong>{{ project.status }}</strong>
          </div>

          <div class="detail-row">
            <span>Progress</span>
            <strong>{{ project.progress }}%</strong>
          </div>

        </div>

        <div class="panel">

          <h3>Progress</h3>

          <div class="big-progress">
            {{ project.progress }}%
          </div>

          <div class="progress">
            <div
              class="progress-bar"
              :style="{
                width: `${project.progress}%`
              }"
            />
          </div>

        </div>

      </div>

    </div>

  </div>

</template>