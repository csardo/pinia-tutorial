<script setup>
  import { useRoute } from 'vue-router'
  import { storeToRefs } from 'pinia'
  import { useAuthorStore } from '../stores/author'
  import { usePostStore } from '../stores/post'
  import Post from '../components/Post.vue'

  const route = useRoute() 
  const { getPostAuthor } = storeToRefs(useAuthorStore()) // getters
  const { fetchAuthors} = useAuthorStore() // action
  const { post, loading, error } = storeToRefs(usePostStore()) // state
  const { fetchPost } = usePostStore() // action

  fetchAuthors()
  fetchPost(route.params.id)
</script>

<template>
  <div>
    <p v-if="loading">Loading post...</p>
    <p v-if="error">{{ error.message }}</p>
    <p v-if="post">
      <post :post="post" :author="getPostAuthor"></post>
    </p>
  </div> 
</template>