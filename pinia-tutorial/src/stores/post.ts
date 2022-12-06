import { defineStore } from 'pinia';

export const usePostStore = defineStore({
  id: 'post',
  state: () => ({
    posts: [], // for holding fetched posts
    post: null, // for holding current post
    loading: false, // for holding the loading state
    error: null, // for holding the error, if any
  }),
  getters: {
    getPostsPerAuthor: (state) => {
      // getters can't take custom arguments, but we can return a function that
      // can receive such. So we filter posts to fing all posts with a particular
      // user id. We'll provide that id when we use it in a component later

      // However, note that when we return a function with an argument from a getter,
      // the getter is not cached any more.
      return (authorId: string) =>
        state.posts.filter((post) => post.userId === authorId);
    },
  },
  actions: {
    async fetchPosts() {
      this.posts = []; // reset the posts
      this.loading = true;
      try {
        this.posts = await fetch(
          'https://jsonplaceholder.typicode.com/posts'
        ).then((response) => response.json());
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
    async fetchPost(id: string) {
      this.post = null;
      this.loading = true;
      try {
        this.post = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${id}`
        ).then((response) => response.json());
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
  },
});
