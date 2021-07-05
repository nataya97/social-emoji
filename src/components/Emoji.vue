<template>
    <div>
        <v-row
                justify="center">
            <v-col class="shrink">
                <v-menu
                        class="v-menu"
                        offset-y
                >
                    <template
                            class="template"
                            v-slot:activator="{on, attrs}">
                        <v-icon
                                class="v-icon"
                                v-bind="attrs"
                                v-on="on">
                            {{emojiIcon}}
                        </v-icon>
                    </template>
                    <v-card
                            class="v-card">
                        <v-btn
                                :key="emoji"
                                @click="react($event)"
                                class="v-btn"
                                elevation="0"
                                rounded
                                text
                                v-for="emoji in emojis"
                                x-small
                        >
                            <v-list-item-title v-text="emoji"></v-list-item-title>
                        </v-btn>
                    </v-card>
                </v-menu>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    import ReactionService from "../services/ReactionService";
    import PostService from "../services/PostService";

    export default {
        name: "Emoji",

        data: () => ({
            emojis: [],
            reactionBody: '',
            reactionMap: '',
            postBody: '',
            reactionPostId: '',
            emojiIcon: 'mdi-emoticon-happy-outline',
        }),

        props: {
            postId: String,
            userId: Number,
        },

        methods: {
            parseEmojis() {
                try {
                    const json = require('/src/emoji/peopleemoji.json');
                    this.getEmojis(json);
                } catch (e) {
                    console.log(e)
                }
            },
            getEmojis(json) {
                const emoji = require("emoji-dictionary");
                const jsonKeys = Object.keys(json);
                for (let i = 0; i < jsonKeys.length; i++) {
                    this.emojis.push(emoji.getUnicode(jsonKeys[i]));
                }
            },
            react($event) {
                this.reactionMap = {
                    user: localStorage.getItem('userId'),
                    reactions: $event.target.textContent
                }
                this.reactionBody = JSON.stringify({
                    reactions: this.reactionMap
                });
                console.log(this.reactionBody)

                //create temp post
                this.postBody = JSON.stringify({
                    content: '',
                    user: localStorage.getItem('userId')
                });
                PostService.createPost(this.postBody)
                    .then(response => {
                        console.log("creating post", response.data)
                        this.$root.reactionPostId = response.data.id;
                        console.log("getting postId", this.$root.reactionPostId)
                    }).catch(e => {
                    console.log(e.response)
                });

                ReactionService.addReaction(this.$root.reactionPostId, this.reactionBody)
                    .then(response => {
                        console.log(response)
                    })
                    .catch(e => {
                        console.log(e)
                    });
                this.updateEmojiIcon($event.target.textContent);
                console.log($event.target.textContent)
            },
            updateEmojiIcon(emoji) {
                this.emojiIcon = emoji;
            }
        },

        mounted() {
            this.parseEmojis();
        }
    }
</script>

<style lang="scss" scoped>

    .v-icon.v-icon {
        color: #BCA5AF;
    }

    .template {
        width: 50px;
        height: 50px;
    }

    .v-card {
        width: 400px;
    }

</style>
