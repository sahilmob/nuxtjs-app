<template>
  <div class="posts=page">
    <section class="post-list">
      <PostPreview id="1" thumbnail="https://cdn.pixabay.com/photo/2015/09/17/17/25/code-944499_1280.jpg" title="Hello" previewText="This is my first post" />
      <PostPreview id="2" thumbnail="https://cdn.pixabay.com/photo/2015/09/17/17/25/code-944499_1280.jpg" title="Hello there - the second time!" previewText="This is my second post" />
      <PostPreview id="1" thumbnail="https://cdn.pixabay.com/photo/2015/09/17/17/25/code-944499_1280.jpg" title="Hello there - the third time!" previewText="This is my third post" />
    </section>
  </div>
</template>

<script>
import PostPreview from "@/components/Posts/PostPreview";

export default {
  components: {
    PostPreview
  }
};
</script>


<style scoped>
.posts-page {
  display: flex;
  justify-content: center;
  align-items: center;
}

.post-list {
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
</style>
