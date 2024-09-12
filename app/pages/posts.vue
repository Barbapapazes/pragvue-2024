<script lang="ts" setup>
definePageMeta({
  middleware: 'auth',
});

const { data: posts, refresh } = await useFetch('/api/posts');

const post = ref({
  title: '',
  content: '',
});

async function createPost() {
  $fetch('/api/posts', {
    method: 'POST',
    body: post.value,
  })
    .then(() => {
      post.value.title = '';
      post.value.content = '';

      refresh();
    })
    .catch((error) => {
      console.error(error);
    });
}

</script>

<template>
  <div>
    <h1>Posts</h1>

    <form @submit.prevent="createPost()">
      <input v-model="post.title" placeholder="Title" />
      <textarea v-model="post.content" placeholder="Content"></textarea>
      <button type="submit">Create Post</button>
    </form>

    <ul v-if="posts.length">
      <li v-for="post in posts" :key="post.id">
        <h2>{{ post.title }}</h2>
        <p>{{ post.content }}</p>
      </li>
    </ul>
    <p v-else>No posts found</p>
  </div>
</template>

<style scoped>
form {
  max-width: 420px;

  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
