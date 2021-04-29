<template>
    <div
            class="body">
        <v-dialog
                class="v-dialog"
                persistent
                transition="dialog-top-transition"
                width="600">
            <template v-slot:activator="{on, attrs}">
                <v-icon
                        class="v-icon"
                        v-bind="attrs"
                        v-on="on">
                    mdi-comment-text-multiple-outline
                </v-icon>
            </template>
            <template v-slot:default="dialog">
                <v-card
                        class="v-card">
                    <v-card-title
                            class="v-card-title">
                        Comments
                    </v-card-title>
                    <div
                            class="v-card-comments">

                    </div>
                    <div
                            class="v-card-comment">
                        <v-textarea
                                append-icon="mdi-send"
                                class="v-textarea"
                                counter
                                label="Comment something interesting!"
                                maxlength="200"
                                outlined
                                type="text"
                                v-model="commentInput">
                        </v-textarea>
                        <v-card-actions
                                class="v-card-actions">
                            <v-btn
                                    @click="dialog.value=false"
                                    text>
                                Close
                            </v-btn>
                        </v-card-actions>
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
            comments: [],
            commentInput: '',
            commentBody: '',
            postId: ''
        }),

        methods: {
            submitComment() {
                this.commentBody = JSON.stringify({
                    user: 'empty user',
                    content: this.commentInput
                });
                CommentService.createComment(this.postId, this.commentBody)
                    .then(respponse => {
                        console.log(respponse)
                    })
                    .catch(e => {
                        console.log(e)
                    });
            }
        }
    }
</script>

<style lang="scss" scoped>

    .v-dialog {

    }

    .v-icon.v-icon {
        color: #BCA5AF;
    }

</style>
