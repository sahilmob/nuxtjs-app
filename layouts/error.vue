<template>
    <div class="error-page">
        <h1>Oops, something went wrong!</h1>
        <!-- used normal link to be safe if nuxt craches on error -->
        <p>Back to
            <a href="/">safety</a>!</p>
    </div>
</template>

<style scoped>
.error-page {
  text-align: center;
}

.error-page a {
  text-decoration: none;
  color: red;
}

.error-page a:hover,
.error-page a:active {
  color: salmon;
}
</style>
