<script setup lang="ts">

const route = useRoute()

const navigation = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: '▦'
  },
  {
    name: 'Projects',
    path: '/projects',
    icon: '▣'
  },
  {
    name: 'Tasks',
    path: '/tasks',
    icon: '✓'
  },
  {
    name: 'Team',
    path: '/team',
    icon: '♟'
  },
  {
    name: 'Activity',
    path: '/activity',
    icon: '◷'
  }
]

const isActive = (path: string) => {
  return route.path === path
}

</script>

<template>

  <aside class="sidebar">

    <div class="logo">
      <div class="logo-mark">
        T
      </div>

      <span>TeamOps</span>
    </div>

    <nav class="navigation">

      <NuxtLink
        v-for="item in navigation"
        :key="item.path"
        :to="item.path"
        class="nav-item"
        :class="{ active: isActive(item.path) }"
      >

        <span class="nav-icon">
          {{ item.icon }}
        </span>

        <span>
          {{ item.name }}
        </span>

      </NuxtLink>

    </nav>

    <div class="sidebar-footer">

      <NuxtLink
        to="/settings"
        class="nav-item"
        :class="{ active: isActive('/settings') }"
      >
        <span class="nav-icon">⚙</span>
        Settings
      </NuxtLink>

    </div>

  </aside>

</template>