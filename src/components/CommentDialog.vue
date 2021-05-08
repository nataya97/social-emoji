<template>
    <div
            class="body">
        <v-dialog
                class="v-dialog"
                persistent
                transition="dialog-top-transition"
                width="600">
            <template
                    class="template"
                    v-slot:activator="{on, attrs}">
                <v-icon
                        class="v-icon"
                        v-bind="attrs"
                        @click="readComments"
                        v-on="on">
                    mdi-comment-text-multiple-outline
                </v-icon>
            </template>
            <template
                    class="template"
                    v-slot:default="dialog">
                <v-card
                        class="v-card">
                    <v-card-title
                            class="v-card-title">
                        Comments
                    </v-card-title>
                    <div
                            class="v-card-comment-group">
                        <div
                                class="v-card-comments">
                            <v-card
                                    :key="comment.value"
                                    class="v-card-comment-listing"
                                    elevation="5"
                                    v-for="comment in commentList">
                                {{comment.content}}
                            </v-card>
                        </div>
                        <div
                                class="v-card-comment">
                            <v-textarea
                                    class="v-textarea"
                                    counter
                                    label="Comment something interesting!"
                                    maxlength="200"
                                    outlined
                                    type="text"
                                    v-model="commentInput">
                            </v-textarea>
                            <v-card-actions
                                    class="justify-end">
                                <v-btn
                                        @click="dialog.value=false"
                                        text>
                                    Close
                                </v-btn>
                                <v-btn
                                        @click="submitComment()"
                                        text>
                                    Submit
                                </v-btn>
                            </v-card-actions>
                        </div>
                    </div>
                </v-card>
            </template>
        </v-dialog>
    </div>
</template>

<script>
    import CommentService from "../services/CommentService";

    export default {
        name: "CommentDialog",

        data: () => ({
            commentList: [],
            commentInput: '',
            commentBody: '',
        }),

        props: {
            postId: String,
            userId: Number,
        },

        methods: {
            submitComment() {
                this.commentBody = JSON.stringify({
                    user: this.userId,
                    content: this.commentInput
                });
                CommentService.createComment(this.postId, this.commentBody)
                    .then(response => {
                        console.log(response)
                    })
                    .catch(e => {
                        console.log(e)
                    });
            },
            readComments() {
                console.log("readComments", this.postId)
                CommentService.getCommentsByPost(this.postId)
                    .then(response => {
                        console.log(response.data)
                        for (let comment of response.data) {
                            this.commentList.push(comment);
                        }
                    })
                    .catch(e => {
                        console.log(e)
                    })
            },
        }
    }
</script>

<style lang="scss" scoped>

    .v-card {
        height: fit-content;
    }

    .v-card-comments {
        margin-bottom: 20px;
    }

    .v-card-comment-listing {
        margin: 0 20px 10px 20px; //<top> <right> <bottom> <left>
        padding: 10px;
        text-align: left;
        background: #BCA5AF;
    }

    .v-textarea {
        margin-left: 20px;
        margin-right: 20px;
    }

    .v-card-title {
        text-align: center;
        color: #BCA5AF;
        letter-spacing: 3px;
        margin-bottom: 35px;
        background-color: rgb(78, 73, 75) !important;
    }

    .v-icon.v-icon {
        color: #BCA5AF;
    }

</style>
