export default function (context) {
    //proccess is an env var provided by nuxt
    context.store.dispatch('initAuth', context.req);
}