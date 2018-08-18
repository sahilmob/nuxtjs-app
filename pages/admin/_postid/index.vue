<template>
    <div class="admin-post-page">
        <section class="update-form">
            <admin-post-form :post="loadedPost"></admin-post-form>
        </section>
    </div>
</template>

<script>
import AdminPostForm from "@/components/Admin/AdminPostForm";

export default {
  layout: "admin",
  components: {
    AdminPostForm
  },
  data() {
    return {
      loadedPost: {
        author: "Sahil",
        title: "My awesome Posr",
        content: "Super amazing, thanks for that!",
        thumbnailLink:
          "https://cdn.pixabay.com/photo/2015/09/17/17/25/code-944499_1280.jpg"
      }
    };
  }
};
</script>

<style>
.update-form {
  width: 90%;
  margin: 20px auto;
}
@media (min-width: 768px) {
  .update-form {
    width: 500px;
  }
}
</style>
