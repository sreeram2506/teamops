<script setup lang="ts">

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth'
})

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
  },
  {
    user: 'Priya Patel',
    action: 'commented on',
    target: 'Mobile Application',
    time: '3 hours ago'
  },
  {
    user: 'Sarah Wilson',
    action: 'moved task to In Progress',
    target: 'Build dashboard UI',
    time: '5 hours ago'
  }
]

</script>

<template>

  <div>

    <div class="page-heading">

      <div>
        <h2>Activity</h2>
        <p>
          Latest actions across the team.
        </p>
      </div>

    </div>

    <div class="panel">

      <div class="activity-list">

        <div
          v-for="activity in activities"
          :key="`${activity.user}-${activity.time}`"
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

  </div>

</template>
