<template>
  <div class="posts=page">
    <PostList :posts="loadedPosts" />
  </div>
</template>

<script>
import PostList from "@/components/Posts/PostList";

export default {
  components: {
    PostList
  },
  fetch(context) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          loadedPosts: [
            {
              id: "1",
              title: "First Post",
              previewText: "This is our first post",
              thumbnail:
                "https://cdn.pixabay.com/photo/2015/09/17/17/25/code-944499_1280.jpg"
            },
            {
              id: "2",
              title: "Second Post",
              previewText: "This is our second post",
              thumbnail:
                "https://cdn.pixabay.com/photo/2015/09/17/17/25/code-944499_1280.jpg"
            }
          ]
        });
      }, 1500);
    })
      .then(data => {
        context.store.commit("setPosts", data.loadedPosts);
      })
      .catch(e => {
        context.error(new Error());
      });
  },
  computed: {
    loadedPosts() {
      return this.$store.getters.loadedPosts;
    }
  }
};
</script>


<style scoped>
.posts-page {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
