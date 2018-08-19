import Vuex from 'vuex';

const createStore = () => {
    return new Vuex.Store({
        state: {
            loadedPosts: []
        },
        mutations: {
            setPosts(state, posts) {
                state.loadedPosts = posts
            },
            addPost(state, post) {
                state.loadedPosts.push(post)
            },
            editPost(state, editedPost) {
                const postIndex = this.state.loadedPosts.findIndex(post => post.id === editedPost.id)
                state.loadedPosts[postIndex] = editedPost
            }
        },
        actions: {
            nuxtServerInit(vuexContect, context) {
                //In this methode we used context.app.$axios insted of this.$axios becuase it runs on the server
                return context.app.$axios.$get('/posts.json')
                    .then(data => {
                        const postsArray = []
                        for (const key in data) {
                            postsArray.push({ ...data[key], id: key })
                        }
                        vuexContect.commit('setPosts', postsArray)
                    })
                    .catch(e => context.error(e))
            },
            addPost(vuexContect, post) {
                const createdPost = {
                    ...post,
                    updateDate: new Date()
                }
                // becaus we return the promise from addPost action, we could wait untill if finishes and use .then to any thing after it like forwarding user to admin page because router will not work inside ./store/index.js
                return this.$axios
                    .$post("/posts.json", createdPost)
                    .then(data => {
                        vuexContect.commit('addPost', { ...createdPost, id: data.name })
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            editPost(vuexContext, post) {
                // becaus we return the promise from addPost action, we could wait untill if finishes and use .then to any thing after it like forwarding user to admin page because router will not work inside ./store/index.js
                return this.$axios
                    .$put(
                        "/posts/" +
                        //post id is availabe because its sotred in the vuex store, because its and old post
                        post.id +
                        ".json",
                        post
                    ).then((res) => {
                        // console.log(res);
                        vuexContext.commit('editPost', { ...post })
                    })
                    .catch(e => console.log(e));
            },
            setPosts(vuexContect, posts) {
                vuexContect.commit('setPosts', posts)
            }
        },
        getters: {
            loadedPosts(state) {
                return state.loadedPosts
            }
        }
    })
}

export default createStore