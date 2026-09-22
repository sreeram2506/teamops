<script setup lang="ts">

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth'
})

const members = [
  {
    name: 'John Doe',
    role: 'Administrator',
    email: 'john.doe@teamops.io',
    project: 'HR Portal'
  },
  {
    name: 'Sarah Wilson',
    role: 'Product Designer',
    email: 'sarah.wilson@teamops.io',
    project: 'Mobile Application'
  },
  {
    name: 'Mike Smith',
    role: 'Backend Engineer',
    email: 'mike.smith@teamops.io',
    project: 'Analytics Platform'
  },
  {
    name: 'Priya Patel',
    role: 'Frontend Engineer',
    email: 'priya.patel@teamops.io',
    project: 'HR Portal'
  }
]

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

    </div>

    <div class="projects-grid">

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
          <strong>{{ member.project }}</strong>
        </div>

      </div>

    </div>

  </div>

</template>
