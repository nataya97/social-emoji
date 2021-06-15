<template>
    <v-container class="body">
        <Toolbar></Toolbar>

        <div class="followers">

        </div>

        <div class="followees">

        </div>

        <v-container class="post-statistics">
            <v-card
                    class="v-card">
                <v-card-title
                        class="v-card-title">
                    Post Statistics
                </v-card-title>
                <v-card-text
                        class="v-card-text"
                >
                    <v-sparkline
                            :labels="labels"
                            :value="postPerMonthData"
                            class="v-sparkline"
                            color="black"
                            line-width="2"
                            padding="16"
                            smooth
                    ></v-sparkline>
                </v-card-text>
            </v-card>

        </v-container>

        <div class="comment-statistics">

        </div>

        <!-- user settings optional -->

        <div class="comment-filter">

        </div>

        <div class="post-filter">

        </div>

    </v-container>
</template>

<script>
    import Toolbar from "./Toolbar";
    import PostService from "../services/PostService";

    export default {
        name: "UserPage",
        components: {
            Toolbar,
        },

        data: () => ({
            postPerMonthData: [],
            commentPerMonthData: [],
            labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
        }),

        methods: {
            getPostsPerMonth() {
                for (let month = 1; month <= this.labels.length; month++) {
                    PostService.countUserPostsByMonth(3, month)
                        .then(response => {
                            this.postPerMonthData.push(response.data)
                            console.log(this.postPerMonthData)
                        })
                        .catch(e => {
                            console.log(e)
                        });
                }
            },
        },

        mounted() {
            this.getPostsPerMonth();
        },
    }
</script>

<style lang="scss" scoped>

    .v-card {
        width: 600px;
    }

    .v-sparkline {
        width: auto;
    }

</style>
