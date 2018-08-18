<template>
  <div class="admin-post-page">
    <section class="update-form">
      <admin-post-form :post="loadedPost" @submit="onSubmitted"></admin-post-form>
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
  asyncData(context) {
    return axios
      .get(
        "https://nuxt-blog-ab0d8.firebaseio.com/posts/" +
          context.params.postid +
          ".json"
      )
      .then(res => {
        console.log(res);
        return {
          loadedPost: res.data
        };
      })
      .catch(e => context.error(r));
  },
  methods: {
    onSubmitted(editePost) {
      axios
        .put(
          "https://nuxt-blog-ab0d8.firebaseio.com/posts/" +
            this.$route.params.postid +
            ".json",
          editePost
        )
        .then(this.$router.push("/admin"))
        .catch(e => console.log(e));
    }
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
