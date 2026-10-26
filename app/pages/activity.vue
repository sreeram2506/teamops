<script setup lang="ts">

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth'
})

const {
  data: activities,
  pending,
  error
} = useLazyApi('/api/activity')

const { timeAgo } = useTimeAgo()

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

    <AppSkeleton
      v-if="pending"
      variant="activity"
      :count="5"
    />

    <div v-else-if="error">
      Failed to load activity.
    </div>

    <div
      v-else-if="!activities?.length"
      class="panel"
    >
      No activity yet. Create a project or task to get started.
    </div>

    <div
      v-else
      class="panel"
    >

      <div class="activity-list">

        <div
          v-for="activity in activities"
          :key="activity.id"
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
              {{ timeAgo(activity.time) }}
            </span>

          </div>

        </div>

      </div>

    </div>

  </div>

</template>
