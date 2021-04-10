<template>
    <v-container>
        <v-toolbar
                class="v-toolbar"
                dark>
            <v-toolbar-title
                    class="v-toolbar-title">
                Username's Feed
            </v-toolbar-title>
            <v-spacer></v-spacer>
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
                                dark
                        >Share your mood!
                        </v-toolbar>
                        <!-- Inputs -->
                        <v-textarea
                                class="v-textarea"
                                counter
                                label="Post something interesting"
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
                                    text>
                                Submit
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </template>
            </v-dialog>
            <v-icon
                    append-icon=mdi-checkbox-multiple-blank-circle class="v-icon">
                mdi-bell-outline
            </v-icon>
        </v-toolbar>

        <v-card :key="post.value"
                class="v-card"
                elevation="10"
                v-for="post in tempPosts">
            <v-card-title
                    class="v-card-title">
                Username
            </v-card-title>
            <v-card-subtitle
                    class="v-card-subtitle">
                Date | #Post
            </v-card-subtitle>
            <v-card-text
                    class="v-card-text">
                {{post}}
            </v-card-text>
            <v-divider
                    class="v-divider"></v-divider>
            <v-card class="v-card-reactions"
                    elevation="0"
                    v-if="reactions.length > 0 && reactions.length <= 10"
            >
                {{reactions}}
            </v-card>
            <v-card class="v-card-reactions"
                    elevation="0"
                    v-else-if="reactions.length > 0 && reactions.length > 10">
                {{omitEmoji()}}
            </v-card>
            <v-divider
                    class="v-divider">
            </v-divider>
            <v-card-actions
                    class="v-card-actions">
                <v-spacer></v-spacer>
                <v-text-field
                        append-icon="mdi-send" class="v-text-field"
                        counter
                        maxlength="20"
                        v-if="showCommentLine"></v-text-field>
                <v-icon @click="showEmojiDialog"
                        type="button">mdi-emoticon-happy-outline
                </v-icon>
                <VEmojiPicker :pack="emojisNative"
                              @select="selectEmoji"
                              class="emojipicker"
                              labelSearch="Search"
                              v-show="emojiDialog"/>
                <span class="span"></span>
                <div
                        class="comment-invoker">
                    <v-icon @click="initComment"
                            type="button">mdi-comment-text-multiple-outline
                    </v-icon>
                </div>
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script>
    import {VEmojiPicker} from 'v-emoji-picker';
    import packEmoji from 'vue-emoji-picker/src/emojis';

    export default {
        name: "Feed",
        components: {
            VEmojiPicker
        },

        data: () => ({
            input: '',
            emojiDialog: false,
            reactions: [],
            omitReactions: [],
            posts: [],
            comment: '',
            showCommentLine: false,
            tempPosts: [],
            postInput: '',
            tempPostInput: '',
        }),

        mounted() {
        },

        methods: {
            showEmojiDialog() {
                this.emojiDialog = !this.emojiDialog;
            },
            selectEmoji(emoji) {
                this.input = emoji;
                this.reactions += emoji.data;
            },
            omitEmoji() {
                this.omitReactions = this.reactions.slice(0, 10)
                return this.omitReactions
            },
            initComment() {
                this.showCommentLine = true;

            },
            submitPost() {
                this.tempPosts.push(this.postInput);
            }
        },
        computed: {
            emojisNative() {
                return packEmoji;
            }
        }
    };
</script>

<style lang="scss" scoped>

    .v-toolbar {
        margin-bottom: 35px;
        text-align: center;
    }

    .v-toolbar-title {
        text-align: center;
    }

    .v-card-subtitle {
        text-align: left;
    }

    .v-card {
        margin-bottom: 25px;
    }

    .v-card-text {
        text-align: left;
    }

    .v-divider {
        width: 80%;
        margin-right: auto;
        margin-left: auto;
    }

    .v-card-reactions {
        max-width: 80%;
        overflow: hidden;
    }

    .span {
        width: 35px;
    }

    .v-card-actions {
        padding-right: 50px;
    }

    .emojipicker {
        height: 100px;
        width: 700px !important;
    }

    .v-text-field {
        margin-right: 40px;
    }

    .v-icon {
        margin-right: 5px;
        margin-left: 5px;
    }

    .v-textarea {
        max-width: 90%;
        margin-right: auto !important;
        margin-left: auto !important;
    }
</style>
