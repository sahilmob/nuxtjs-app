import Vuex from 'vuex';

const createStore = () => {
    return new Vuex.Store({
        state: {
            loadedPosts: []
        },
        mutations: {
            setPosts(state, posts) {
                state.loadedPosts = posts
            }
        },
        actions: {
            nuxtServerInit(vuexContect, context) {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        vuexContect.commit('setPosts', [
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
                        ]);
                        resolve();
                    }, 1500);
                })
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