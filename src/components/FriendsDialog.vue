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
                        @click="showFriends"
                        class="v-icon"
                        v-bind="attrs"
                        v-on="on">s
                    mdi-account-circle-outline
                </v-icon>
            </template>
            <template
                    class="template"
            >
                <v-card
                        class="v-card">
                    <v-card-title
                            class="v-card-title">
                        Followers
                    </v-card-title>
                    <v-list
                            class="v-list"
                            dense
                    >
                        <v-list-item-group
                                class="v-list-item-group"
                                color="primary"
                                v-model="selectedItem"
                        >
                            <v-list-item
                                    :key="i"
                                    v-for="(item, i) in followers"
                            >
                                <v-list-item-icon>
                                    <v-icon>mdi-account-circle</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title v-text="item.username"></v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list-item-group>
                    </v-list>

                    <v-card-title
                            class="v-card-title">
                        Followed By
                    </v-card-title>
                </v-card>
            </template>
        </v-dialog>

    </div>
</template>

<script>
    export default {
        name: "FriendsDialog",

        data: () => ({
            followers: [],
            followedBy: [],
            selectedItem: null
        }),

        methods: {
            showFriends() {

            }
        }
    }
</script>

<style lang="scss" scoped>

    .v-icon.v-icon {
        margin-right: 5px;
        margin-left: 5px;
        color: #BCA5AF;
    }

</style>
