<template>
    <v-toolbar
            class="v-toolbar"
            dark>
        <v-toolbar-title
                class="v-toolbar-title">
            Username's Feed
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-icon
                class="v-icon"
                v-on:click="toDiscovery()">mdi-compass-outline
        </v-icon>

        <!-- DIALOG DIALOG DIALOG -->
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
</template>

<script>
    import router from '../router'

    export default {
        name: "Toolbar",

        data: () => ({
            posts: [],
            postInput: '',
        }),
        mounted() {
        },

        methods: {
            submitPost() {
                this.posts.push(this.postInput);
                this.$root.posts = this.posts;
            },
            toDiscovery() {
                router.push({name: 'Discovery'});
            }
        }
    }

</script>


<style lang="scss" scoped>

    .v-toolbar {
        margin-bottom: 35px;
        text-align: center;
    }

    .v-toolbar-title {
        text-align: center;
    }

    .v-textarea {
        max-width: 90%;
        margin-right: auto !important;
        margin-left: auto !important;
    }

    .v-icon {
        margin-right: 15px;
        margin-left: 15px;
    }
</style>
