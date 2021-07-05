<template>
    <v-container class="body">
        <Toolbar></Toolbar>
        <v-card
                class="v-card"
                elevation="10"
                :key="post.value"
                v-for="post in postList">
            <v-card-title
                    class="v-card-title">
                {{post.username}}
            </v-card-title>
            <v-card-subtitle
                    class="v-card-subtitle">
                {{post.submitted}}
            </v-card-subtitle>
            <v-card-text
                    class="v-card-text">
                {{post.content}}
            </v-card-text>
            <v-card-actions
                    class="v-card-actions">
                <div class="icons">
                    <v-spacer></v-spacer>
                    <Emoji
                            :postId="post.id"
                            :userId="post.user"
                            class="v-icon"></Emoji>
                    <CommentDialog
                            :postId="post.id"
                            :userId="post.user"
                            class="v-icon"
                    ></CommentDialog>
                </div>
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script>
    import Toolbar from "./Toolbar";
    import PostService from "../services/PostService";
    import Emoji from "./Emoji";
    import CommentDialog from "./CommentDialog";
    import UserService from "../services/UserService";
    import ReactionService from "../services/ReactionService";

    export default {
        name: "Feed",
        components: {
            Toolbar,
            Emoji,
            CommentDialog
        },

        data: () => ({
            comment: '',
            followsList: [],
            postList: [],
        }),

        mounted() {
            this.getAllPosts();
            this.getPostsOfFollowing();

        },
        methods: {
            getAllPosts() {
                console.log("current user", localStorage.getItem('userId'))
                PostService.getUserPosts(localStorage.getItem('userId'))
                    .then(response => {
                        for (let post of response.data) {
                            if (post.content.length > 0) {
                                this.getUserPerPost(post, post.user);
                                this.getEmojisPerPost(post.id);
                            }
                        }
                    })
                    .catch(e => {
                        console.log(e)
                    });
            },
            getPostsOfFollowing() {
                UserService.getFollowers(localStorage.getItem('userId'))
                    .then(response => {
                        console.log(response.data)
                        for (let resp of response.data) {
                            this.followsList.push(resp.id)
                        }
                    })
                    .catch(e => {
                        console.log(e)
                    });

            },
            getUserPerPost(post, id) {
                UserService.getUserById(id)
                    .then((response) => {
                        console.log("getUserPerPost", response.data)
                        post.username = response.data.userName;
                        this.postList.push(post);
                        return (response.data);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            getEmojisPerPost(postId) {
                ReactionService.getReaction(postId)
                    .then(response => {
                        console.log(response.data)
                    })
                    .catch(e => {
                        console.log(e)
                    })
            }
        },
    };
</script>

<style lang="scss" scoped>

    .v-card-subtitle {
        font-style: italic;
        text-align: justify;
    }

    .v-card {
        margin: 15px 15px 25px 15px;
        flex-basis: 25%;
        flex-grow: 1;
        flex-shrink: 1;
    }

    .v-card-text {
        text-align: left;
    }

    .v-card-actions {
        padding-right: 50px;
    }

    .v-icon {
        margin-right: 5px;
        margin-left: 5px;
    }

    .v-friends-card {
        padding-top: 5px;
        padding-bottom: 5px;
        height: 53px;
        overflow-x: scroll;
        overflow-y: hidden;
        white-space: nowrap;
    }

    .v-avatar {
        margin-right: 5px;
        background-color: lightsteelblue;
    }

    .icons {
        flex-basis: 100%;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        background: linear-gradient(280deg, rgba(78, 73, 75, 1) 20%, rgba(209, 209, 209, 0.3930614482120973) 100%);
    }
</style>
