import Vuex from 'vuex';
import Cookie from 'js-cookie';

const createStore = () => {
    return new Vuex.Store({
        state: {
            loadedPosts: [],
            token: null
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
            },
            setToken(state, token) {
                state.token = token
            },
            clearToken(state) {
                state.token = null;
            }
        },
        actions: {
            nuxtServerInit(vuexContext, context) {
                //In this methode we used context.app.$axios insted of this.$axios becuase it runs on the server
                return context.app.$axios.$get('/posts.json')
                    .then(data => {
                        const postsArray = []
                        for (const key in data) {
                            postsArray.push({ ...data[key], id: key })
                        }
                        vuexContext.commit('setPosts', postsArray)
                    })
                    .catch(e => context.error(e))
            },
            authUser(vuexContext, authData) {
                let authUrl =
                    "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=" +
                    process.env.fbAPIKey;
                if (!authData.isLogin) {
                    authUrl =
                        "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=" +
                        process.env.fbAPIKey;
                }
                return this.$axios
                    .post(authUrl, {
                        email: authData.email,
                        password: authData.password,
                        returnSecureToken: true
                    })
                    .then(res => {
                        vuexContext.commit('setToken', res.data.idToken)
                        localStorage.setItem('token', res.data.idToken)
                        //The + operator is to convert expirationDate to a number or userNumber.parseInt
                        localStorage.setItem('tokenExpiration', new Date().getTime() + +res.data.expiresIn * 1000)
                        Cookie.set('jwt', res.data.idToken)
                        Cookie.set('expirationDate', new Date().getTime() + Number.parseInt(res.data.expiresIn) * 1000)
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            initAuth(vuexContext, req) {
                let token;
                let expirationDate;

                if (req) {
                    if (!req.headers.cookie) {
                        return
                    }
                    const jwtCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('jwt='))
                    if (!jwtCookie) {
                        return
                    }
                    token = jwtCookie.split('=')[1];
                    expirationDate = req.headers.cookie.split(';').find(c => c.trim().startsWith('expirationDate=')).split("=")[1]
                } else {
                    token = localStorage.getItem('token');
                    expirationDate = localStorage.getItem('tokenExpiration')
                }
                if (new Date().getTime() > +expirationDate || !token) {
                    vuexContext.commit('logout')
                    return
                }
                //The + operator is to convert expirationDate to a number
                vuexContext.commit('setToken', token)


            },
            addPost(vuexContext, post) {
                const createdPost = {
                    ...post,
                    updateDate: new Date()
                }
                // becaus we return the promise from addPost action, we could wait untill if finishes and use .then to any thing after it like forwarding user to admin page because router will not work inside ./store/index.js
                return this.$axios
                    .$post("/posts.json?auth=" + vuexContext.state.token, createdPost)
                    .then(data => {
                        vuexContext.commit('addPost', { ...createdPost, id: data.name })
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
                        ".json?auth=" + vuexContext.state.token,
                        post
                    ).then((res) => {
                        // console.log(res);
                        vuexContext.commit('editPost', { ...post })
                    })
                    .catch(e => console.log(e));
            },
            setPosts(vuexContext, posts) {
                vuexContext.commit('setPosts', posts)
            },
            logout(vuexContext) {
                vuexContext.commit('clearToken');
                Cookie.remove('jwt');
                Cookie.remove('expirationDate');
                if (process.client) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('tokenExpiration');
                }
            }
        },
        getters: {
            loadedPosts(state) {
                return state.loadedPosts
            },
            isAuthenticated(state) {
                return state.token != null
            }
        }
    })
}

export default createStore