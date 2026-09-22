<script setup lang="ts">

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth'
})

const stats = [
  {
    title: 'Projects',
    value: 12,
    description: '3 active projects'
  },
  {
    title: 'Total Tasks',
    value: 48,
    description: '8 tasks due this week'
  },
  {
    title: 'Completed',
    value: 31,
    description: '65% completion rate'
  },
  {
    title: 'Team Members',
    value: 8,
    description: '2 members recently joined'
  }
]

const activities = [
  {
    user: 'John Doe',
    action: 'created a new project',
    target: 'HR Portal',
    time: '10 minutes ago'
  },
  {
    user: 'Sarah Wilson',
    action: 'completed task',
    target: 'Dashboard UI',
    time: '32 minutes ago'
  },
  {
    user: 'Mike Smith',
    action: 'updated task',
    target: 'Authentication API',
    time: '1 hour ago'
  },
  {
    user: 'John Doe',
    action: 'assigned task to',
    target: 'Sarah Wilson',
    time: '2 hours ago'
  }
]

</script>

<template>

  <div class="dashboard">

    <div class="page-heading">

      <div>
        <h2>Dashboard</h2>
        <p>
          Here's what's happening with your projects today.
        </p>
      </div>

      <button class="primary-button">
        + New Project
      </button>

    </div>

    <!-- Statistics -->

    <section class="stats-grid">

      <StatCard
        v-for="stat in stats"
        :key="stat.title"
        :title="stat.title"
        :value="stat.value"
        :description="stat.description"
      />

    </section>

    <!-- Main content -->

    <section class="dashboard-grid">

      <div class="panel">

        <div class="panel-header">
          <div>
            <h3>Project Health</h3>
            <p>Current project progress</p>
          </div>
        </div>

        <div class="project-health">

          <div class="health-item">

            <div class="health-info">
              <span>HR Portal</span>
              <strong>80%</strong>
            </div>

            <div class="progress">
              <div
                class="progress-bar"
                style="width: 80%"
              />
            </div>

          </div>

          <div class="health-item">

            <div class="health-info">
              <span>Mobile Application</span>
              <strong>60%</strong>
            </div>

            <div class="progress">
              <div
                class="progress-bar"
                style="width: 60%"
              />
            </div>

          </div>

          <div class="health-item">

            <div class="health-info">
              <span>Analytics Platform</span>
              <strong>90%</strong>
            </div>

            <div class="progress">
              <div
                class="progress-bar"
                style="width: 90%"
              />
            </div>

          </div>

        </div>

      </div>

      <!-- Activity -->

      <div class="panel">

        <div class="panel-header">

          <div>
            <h3>Recent Activity</h3>
            <p>Latest team actions</p>
          </div>

          <NuxtLink to="/activity">
            View all
          </NuxtLink>

        </div>

        <div class="activity-list">

          <div
            v-for="activity in activities"
            :key="activity.time"
            class="activity-item"
          >

            <div class="activity-avatar">
              {{ activity.user.charAt(0) }}
            </div>

            <div class="activity-content">

              <p>
                <strong>{{ activity.user }}</strong>
                {{ activity.action }}
                <strong>{{ activity.target }}</strong>
              </p>

              <span>
                {{ activity.time }}
              </span>

            </div>

          </div>

        </div>

      </div>

    </section>

  </div>

</template>