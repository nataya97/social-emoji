<template>
    <v-container>
        <v-dialog
                class="v-dialog"
                max-width="600"
                persistent
                transition="dialog-top-transition">
            <template v-slot:activator="{on, attrs}">
                <v-icon
                        class="v-icon"
                        v-bind="attrs"
                        v-on="on">
                    mdi-plus
                </v-icon>
            </template>
            <template v-slot:default="dialog">
                <v-card>
                    <v-toolbar
                            class="v-toolbar"
                    >
                        <v-toolbar-title
                                class="v-toolbar-title">
                            Share your mood!
                        </v-toolbar-title>
                    </v-toolbar>
                    <v-textarea
                            class="v-textarea"
                            counter
                            label="Post something interesting!"
                            maxlength="200"
                            outlined
                            type="text"
                            v-model="postInput">
                    </v-textarea>
                    <v-card-actions
                            class="justify-end">
                        <v-btn
                                @click="dialog.value=false"
                                text>
                            Close
                        </v-btn>
                        <v-btn
                                @click="submitPost()"
                                text
                        >
                            Submit
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </template>
        </v-dialog>
    </v-container>
</template>

<script>
    import PostService from "../services/PostService";

    export default {
        name: "Dialog",
        components: {},
        data: () => ({
            //posts: [],
            postInput: '',
            postBody: '',
        }),
        methods: {
            submitPost() {
                //this.posts.push(this.postInput);
                //this.$root.posts = this.posts;
                this.postBody = JSON.stringify({content: this.postInput});
                PostService.createPost(this.postBody)
                    .then(response => {
                        console.log(response)
                        //this.showSnackBar();
                        this.window.location.reload();
                    }).catch(e => {
                    console.log(e.response.data.message)
                });
            },
            showSnackBar() {
                this.$refs.snackbar.showSnackBar();
            }
        }
    }
</script>

<style lang="scss" scoped>

    .v-toolbar {
        margin-bottom: 35px;
        text-align: center;
        background-color: rgb(78, 73, 75) !important;
    }

    .v-toolbar-title {
        text-align: center;
        color: #BCA5AF;
        letter-spacing: 3px;
    }

    .v-icon.v-icon {
        margin-right: 15px;
        margin-left: 15px;
        color: #BCA5AF;
    }

    .v-textarea {
        max-width: 90%;
        margin-right: auto !important;
        margin-left: auto !important;
        border-color: #BCA5AF !important;
    }

</style>
