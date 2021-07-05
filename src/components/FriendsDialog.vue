<template>
    <v-container
            class="body">
        <v-dialog
                class="v-dialog"
                transition="dialog-top-transition"
                width="600">
            <template
                    class="template"
                    v-slot:activator="{on, attrs}">
                <v-icon
                        @click="showFriends"
                        class="v-icon"
                        v-bind="attrs"
                        v-on="on">
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
                                    <v-icon
                                            class="v-icon"
                                            size="40"
                                    >mdi-account-circle
                                    </v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title v-text="item"></v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list-item-group>
                    </v-list>

                    <v-card-title
                            class="v-card-title">
                        Following
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
                                    v-for="(item, i) in following"
                            >
                                <v-list-item-icon>
                                    <v-icon
                                            class="v-icon"
                                            size="40"
                                    >mdi-account-circle
                                    </v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title v-text="item"></v-list-item-title>
                                </v-list-item-content>
                                <v-list-item-action>
                                    <v-btn
                                            @click="unfollow(item)"
                                            class="v-btn"
                                            elevation="0">Unfollow
                                    </v-btn>
                                </v-list-item-action>
                            </v-list-item>
                        </v-list-item-group>
                    </v-list>
                    <v-card-title
                            class="v-card-title">
                        Not Following
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
                                    v-for="(item, i) in notFollowing"
                            >
                                <v-list-item-icon>
                                    <v-icon
                                            size="40">mdi-account-circle
                                    </v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title v-text="item"></v-list-item-title>
                                </v-list-item-content>
                                <v-list-item-action>
                                    <v-btn
                                            @click="follow(item)"
                                            class="v-btn"
                                            elevation="0">Follow
                                    </v-btn>
                                </v-list-item-action>
                            </v-list-item>
                        </v-list-item-group>
                    </v-list>
                    <v-card-actions
                            class="v-card-actions"
                    >
                    </v-card-actions>
                </v-card>
            </template>
        </v-dialog>
    </v-container>
</template>

<script>
    import UserService from "../services/UserService";

    export default {
        name: "FriendsDialog",

        data: () => ({
            followers: [],
            following: [],
            notFollowing: [],
            selectedItem: null,
        }),

        methods: {
            showFriends() {
                this.followers.length = 0;
                this.following.length = 0;
                this.notFollowing.length = 0;
                this.getFollowers();
                this.getFollowing();
                this.getNotFollowing();
            },
            getFollowers() {
                UserService.getFollowers(localStorage.getItem('userId'))
                    .then(response => {
                        console.log(response)
                        for (let followers of response.data) {
                            this.followers.push(followers.userName)
                        }
                    })
                    .catch(e => {
                        console.log(e)
                    })
            },
            getFollowing() {
                UserService.getFollowing(localStorage.getItem('userId'))
                    .then(response => {
                        console.log(response)
                        for (let following of response.data) {
                            this.following.push(following.userName)
                        }
                    })
                    .catch(e => {
                        console.log(e)
                    })
            },
            getNotFollowing() {
                UserService.getAllUsers()
                    .then(response => {
                        for (let notFollowing of response.data) {
                            if (!this.following.includes(notFollowing.userName)) {
                                this.notFollowing.push(notFollowing.userName)
                            }
                        }
                    })
                    .catch(e => {
                        console.log(e)
                    })
            },
            follow(username) {
                console.log(username)
                this.getUserByUsername(username)
                UserService.follow(localStorage.getItem('userId'), this.$root.userToFollow)
                    .then(response => {
                        console.log(response)
                    })
                    .catch(e => {
                        console.log(e)
                    })
                this.$router.go()
            },
            unfollow(username) {
                console.log(username)
                this.getUserByUsername(username)
                setTimeout(() => console.log(""), 4000)
                UserService.unfollow(localStorage.getItem('userId'), this.$root.userToFollow)
                    .then(response => {
                        console.log(response)
                    }).catch(e => {
                        console.log(e)
                    }
                )
                this.$router.go()
            },
            getUserByUsername(username) {
                console.log("getting username", username)
                UserService.getUserByUsername(username)
                    .then(response => {
                        console.log(response.data.id)
                        this.$root.userToFollow = response.data.id
                    })
                    .catch(e => {
                        console.log(e)
                    })
            },
        }
    }
</script>

<style lang="scss" scoped>

    .v-card-title {
        text-align: center;
        color: #BCA5AF;
        letter-spacing: 3px;
        background-color: rgb(78, 73, 75) !important;
    }

    .v-icon.v-icon {
        margin-right: 5px;
        margin-left: 5px;
        color: #BCA5AF;
    }

</style>
