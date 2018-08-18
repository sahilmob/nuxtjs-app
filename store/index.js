import Vuex from 'vuex';
import axios from 'axios';

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
                const postIndex = this.state.findIndex(post => post.id === editedPost.id)
                state.loadedPosts[postIndex] = editedPost
            }
        },
        actions: {
            nuxtServerInit(vuexContect, context) {
                return axios.get('https://nuxt-blog-ab0d8.firebaseio.com/posts.json')
                    .then(res => {
                        const postsArray = []
                        for (const key in res.data) {
                            postsArray.push({ ...res.data[key], id: key })
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
                return axios
                    .post("https://nuxt-blog-ab0d8.firebaseio.com/posts.json", createdPost)
                    .then(res => {
                        vuexContect.commit('addPost', { ...createdPost, id: res.data.name })
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            editPost(vuexContext, post) {
                // becaus we return the promise from addPost action, we could wait untill if finishes and use .then to any thing after it like forwarding user to admin page because router will not work inside ./store/index.js
                return axios
                    .put(
                        "https://nuxt-blog-ab0d8.firebaseio.com/posts/" +
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