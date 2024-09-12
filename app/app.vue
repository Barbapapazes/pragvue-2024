<script lang="ts" setup>
const { loggedIn, clear } = useUserSession();

async function logout() {
  await clear();
  await navigateTo('/');
}
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />

    <header>
      <NuxtLink v-if="!loggedIn" to="/auth/github" external>Login</NuxtLink>

      <template v-else>
        <NuxtLink to="/posts">Posts</NuxtLink>
        <button @click="logout">Logout</button>
      </template>
    </header>

    <NuxtPage />
  </div>
</template>

<style scoped>
header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
