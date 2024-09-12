<script lang="ts" setup>
const { loggedIn, clear, user } = useUserSession();
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />

    <NuxtLink v-if="!loggedIn" to="/auth/github" external>Login</NuxtLink>

    <button v-else @click="clear">Logout</button>

    <pre>
{{ user }}
    </pre>
  </div>
</template>
