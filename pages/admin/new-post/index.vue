<template>
  <div class="admin-new-post-page">
    <section class="new-post-form">
      <admin-post-form @submit="onSubmitted"></admin-post-form>
    </section>
  </div>
</template>

<script>
import AdminPostForm from "@/components/Admin/AdminPostForm";
import axios from "axios";
export default {
  layout: "admin",
  components: {
    AdminPostForm
  },
  methods: {
    onSubmitted(postData) {
      // becaus we return the promise from addPost action, we could wait untill if finishes and use .then to any thing after it like forwarding user to admin page because router will not work inside ./store/index.js
      this.$store
        .dispatch("addPost", postData)
        .then(() => this.$router.push("/admin"));
    }
  }
};
</script>

<style scoped>
.new-post-form {
  width: 90%;
  margin: 20px auto;
}

@media (min-width: 768px) {
  .new-post-form {
    width: 500px;
  }
}
</style>


