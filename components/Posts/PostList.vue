<template>
  <section class="post-list">
    <PostPreview :is-admin="isAdmin" id="1" thumbnail="https://cdn.pixabay.com/photo/2015/09/17/17/25/code-944499_1280.jpg" title="Hello" previewText="This is my first post" />
    <PostPreview :is-admin="isAdmin" id="2" thumbnail="https://cdn.pixabay.com/photo/2015/09/17/17/25/code-944499_1280.jpg" title="Hello there - the second time!" previewText="This is my second post" />
    <PostPreview :is-admin="isAdmin" id="1" thumbnail="https://cdn.pixabay.com/photo/2015/09/17/17/25/code-944499_1280.jpg" title="Hello there - the third time!" previewText="This is my third post" />
  </section>
</template>

<script>
import PostPreview from "@/components/Posts/PostPreview";
export default {
  components: {
    PostPreview
  },
  props: {
    isAdmin: {
      type: Boolean,
      default: false
    }
  }
};
</script>


<style scoped>
.post-list {
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
</style>

