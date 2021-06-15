<template>
    <v-container class="body">
        <Toolbar></Toolbar>
        <div
                class="v-card-rows">
            <v-card
                    :key="post.value"
                    class="v-card"
                    elevation="10"
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
        </div>
    </v-container>
</template>

<script>
    import Toolbar from "./Toolbar";
    import PostService from "../services/PostService";
    import CommentDialog from "./CommentDialog";
    import Emoji from "./Emoji";
    import UserService from "../services/UserService";

    export default {
        name: "Discovery",
        components: {Emoji, CommentDialog, Toolbar},

        data: () => ({
            postList: []
        }),

        mounted() {
            this.getAllPosts();
        },

        methods: {
            getAllPosts() {
                PostService.getAllPosts()
                    .then((response) => {
                        for (let post of response.data) {
                            this.getUserPerPost(post, post.user);
                        }
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            getUserPerPost(post, id) {
                UserService.getUserById(id)
                    .then((response) => {
                        post.username = response.data;
                        this.postList.push(post);
                        return (response.data);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }
        }
    }
</script>

<style lang="scss" scoped>

    .v-card-rows {
        display: flex;
        flex-wrap: wrap;
    }

    .v-card {
        margin: 15px 15px 15px 15px;
        height: 270px;
        flex-basis: 25%;
        flex-grow: 1;
        flex-shrink: 1;
    }

    .v-card-title {
        font-size: 17px;
    }

    .v-card-subtitle {
        font-style: italic;
        text-align: end;
    }

    .v-card-text {
        height: 120px;
        /*overflow: auto;*/
        text-align: justify;
    }

    .icons {
        flex-basis: 100%;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        margin-bottom: -70px;
        background: linear-gradient(280deg, rgba(78, 73, 75, 1) 20%, rgba(209, 209, 209, 0.3930614482120973) 100%);
    }

    .v-icon.v-icon {
        margin-right: 25px;
        color: #BCA5AF;
    }

    .v-card-actions {
    }
</style>
