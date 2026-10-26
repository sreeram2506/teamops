<script setup lang="ts">

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth'
})

type Project = {
  id: number
  name: string
  progress: number
  status: string
}

type Task = {
  id: number
  status: string
}

type Activity = {
  id: number
  user: string
  action: string
  target: string
  time: string
}

type Member = {
  id: number
}

const { data: projects } = await useFetch<Project[]>('/api/projects')
const { data: tasks } = await useFetch<Task[]>('/api/tasks')
const { data: members } = await useFetch<Member[]>('/api/members')
const { data: activities } = await useFetch<Activity[]>('/api/activity')

const { timeAgo } = useTimeAgo()

const stats = computed(() => {
  const projectList = projects.value ?? []
  const taskList = tasks.value ?? []
  const memberList = members.value ?? []
  const activeProjects = projectList.filter(project => project.status === 'Active').length
  const completedTasks = taskList.filter(task => task.status === 'Done').length

  return [
    {
      title: 'Projects',
      value: projectList.length,
      description: `${activeProjects} active projects`
    },
    {
      title: 'Total Tasks',
      value: taskList.length,
      description: `${taskList.filter(task => task.status !== 'Done').length} still open`
    },
    {
      title: 'Completed',
      value: completedTasks,
      description: taskList.length
        ? `${Math.round((completedTasks / taskList.length) * 100)}% completion rate`
        : 'No tasks yet'
    },
    {
      title: 'Team Members',
      value: memberList.length,
      description: 'People on TeamOps'
    }
  ]
})

const recentActivity = computed(() => (activities.value ?? []).slice(0, 4))

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

      <NuxtLink
        to="/projects"
        class="primary-button"
      >
        + New Project
      </NuxtLink>

    </div>

    <section class="stats-grid">

      <StatCard
        v-for="stat in stats"
        :key="stat.title"
        :title="stat.title"
        :value="stat.value"
        :description="stat.description"
      />

    </section>

    <section class="dashboard-grid">

      <div class="panel">

        <div class="panel-header">
          <div>
            <h3>Project Health</h3>
            <p>Current project progress</p>
          </div>
        </div>

        <div
          v-if="!projects?.length"
          class="project-owner"
        >
          No projects yet.
        </div>

        <div
          v-else
          class="project-health"
        >

          <div
            v-for="project in projects"
            :key="project.id"
            class="health-item"
          >

            <div class="health-info">
              <span>{{ project.name }}</span>
              <strong>{{ project.progress }}%</strong>
            </div>

            <div class="progress">
              <div
                class="progress-bar"
                :style="{ width: `${project.progress}%` }"
              />
            </div>

          </div>

        </div>

      </div>

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

        <div
          v-if="!recentActivity.length"
          class="project-owner"
        >
          No activity yet.
        </div>

        <div
          v-else
          class="activity-list"
        >

          <div
            v-for="activity in recentActivity"
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

    </section>

  </div>

</template>
