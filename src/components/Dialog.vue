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
                            <div>
                                Share your mood!
                            </div>
                            <div>
                                <Emoji
                                        class="emoji"></Emoji>
                            </div>
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
    import Emoji from "./Emoji";

    export default {
        name: "Dialog",
        components: {Emoji},
        data: () => ({
            postInput: '',
            postBody: '',
        }),
        props: {
            postId: String,
            userId: Number,
        },
        methods: {
            submitPost() {
                this.postBody = JSON.stringify({
                    content: this.postInput,
                    user: localStorage.getItem('userId')
                });
                PostService.updatePost(this.postBody)
                    .then(response => {
                        console.log(response)
                        this.window.location.reload();
                    }).catch(e => {
                    console.log(e.response)
                });
            },
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
        margin-right: 5px;
        margin-left: 5px;
        color: #BCA5AF;
    }

    .v-textarea {
        max-width: 90%;
        margin-right: auto !important;
        margin-left: auto !important;
        border-color: #BCA5AF !important;
    }

</style>
