<template>
    <div>
        <Toolbar></Toolbar>

        <!-- FRIENDS FRIENDS FRIENDS -->
        <div>
            <v-card
                    class="v-friends-card">
                <v-avatar
                        :key="user.firstname"
                        class="v-avatar"
                        size="25"
                        v-for="user in userList">
                    <v-icon
                            dark>
                        mdi-account-circle
                    </v-icon>
                </v-avatar>
            </v-card>
        </div>

        <v-card
                class="v-card"
                elevation="10"
                :key="post.value"
                v-for="post in this.$root.posts">
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
                <VEmojiPicker :pack="emojisNative"
                              @select="selectEmoji"
                              class="emojipicker"
                              labelSearch="Search"
                              v-show="emojiDialog"/>
                <v-icon @click="showEmojiDialog"
                        type="button">mdi-emoticon-happy-outline
                </v-icon>
                <span class="span"></span>
                <div
                        class="comment-invoker">
                    <v-icon @click="initComment"
                            type="button">mdi-comment-text-multiple-outline
                    </v-icon>
                </div>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
    import {VEmojiPicker} from 'v-emoji-picker';
    import packEmoji from 'vue-emoji-picker/src/emojis';
    import UserService from "../services/UserService";
    import Toolbar from "./Toolbar";

    export default {
        name: "Feed",
        components: {
            Toolbar,
            VEmojiPicker
        },

        data: () => ({
            emojiDialog: false,
            reactions: [],
            omitReactions: [],
            comment: '',
            showCommentLine: false,
            userList: [],
        }),

        mounted() {
            this.getAllUsers();
        },
        methods: {
            showEmojiDialog() {
                this.emojiDialog = !this.emojiDialog;
            },
            selectEmoji(emoji) {
                this.reactions.push(emoji.data);
            },
            omitEmoji() {
                this.omitReactions = this.reactions.slice(0, 10);
            },
            initComment() {
                this.showCommentLine = !this.showCommentLine;

            },
            getAllUsers() {
                UserService.getAllUsers()
                /*.then(response => {
                    for (let user of response.data) {
                        this.userList.push(user)
                    }
                })
                .catch(e => {
                    console.log(e)
                });*/
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
        height: 90px;
        width: 600px !important;
        margin-right: 25px;
    }

    .v-text-field {
        margin-right: 40px;
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
</style>
