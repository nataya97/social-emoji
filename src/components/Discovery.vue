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
                    {{post.user}}
                </v-card-title>
                <v-card-subtitle
                        class="v-card-subtitle">
                    {{post.submitted}}
                </v-card-subtitle>
                {{post.content}}
            </v-card>
        </div>
    </v-container>
</template>

<script>
    import Toolbar from "./Toolbar";
    import PostService from "../services/PostService";

    export default {
        name: "Discovery",
        components: {Toolbar},

        data: () => ({
            postList: []
        }),

        mounted() {
            this.getAllPosts();
        },

        methods: {
            getAllPosts() {
                PostService.getAllPosts()
                    .then(response => {
                        for (let post of response.data) {
                            this.postList.push(post);
                        }
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }
        }
    }
</script>

<style scoped>

    .v-card-rows {
        display: flex;
        flex-wrap: wrap;
    }

    .v-card {
        margin: 15px 15px 15px 15px;
        height: 200px;
        flex-basis: 33%;
        flex-grow: 1;
        flex-shrink: 1;
    }
</style>
