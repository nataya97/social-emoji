<template>
    <v-container>
        <v-card
                class="login"
                elevation="10">
            <v-card-title
                    class="v-card-title">
                Welcome to Emojimedia
                <div
                        class="emoji">{{displayEmoji('heart_eyes')}}
                </div>
            </v-card-title>
            <v-form v-model="valid">
                <v-container>
                    <v-col
                            cols="12"
                            md="12"
                    >
                        <v-text-field
                                class="v-text-field"
                                v-model="username"
                                label="Username"
                                required
                        >
                        </v-text-field>
                    </v-col>
                    <v-col
                            cols="12"
                            md="12"
                            v-if="visible"
                    >
                        <v-text-field
                                class="v-text-field"
                                v-model="firstname"
                                label="Firstname"
                                required
                        >
                        </v-text-field>
                    </v-col>
                    <v-col
                            cols="12"
                            md="12"
                            v-if="visible"
                    >
                        <v-text-field
                                class="v-text-field"
                                v-model="lastname"
                                label="Lastname"
                                required
                        >
                        </v-text-field>
                    </v-col>
                    <v-col
                            cols="12"
                            md="12"
                    >
                        <v-text-field
                                class="v-text-field"
                                v-model="password"
                                label="Password"
                                required
                        >
                        </v-text-field>
                    </v-col>
                </v-container>
            </v-form>
            <v-card-actions
                    class="v-card-actions">
                <v-btn
                        class="v-btn"
                        elevation="0"
                        v-on:click="login"
                >Login
                </v-btn>
                <v-btn
                        class="v-btn"
                        elevation="0"
                        v-on:click="register"
                >
                    Register
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script>
    import SockJS from "sockjs-client";
    import Stopm from "webstomp-client";
    import router from "../router";

    export default {
        name: 'Login',

        data: () => ({
            visible: false,
            valid: false,
            username: '',
            password: '',
            firstname: '',
            lastname: '',
            received_messages: [],
            send_message: null,
            connected: false,
            userid: null
        }),
        mounted() {
            this.connectWebSocket();
        },
        methods: {
            connectWebSocket() {
                this.socket = new SockJS("http://localhost:8090/websocket");
                this.stompClient = Stopm.over(this.socket);
                this.stompClient.connect({},
                    frame => {
                        this.connected = true;
                        console.log("The Frame: ", frame);
                        if (this.visible) {
                            this.stompClient.subscribe("/topic/register", tick => {
                                this.received_messages.push(JSON.parse(tick.body).content);
                                console.log("The tick: ", tick.body)
                                this.isAuthorized(tick.body)
                            });
                        } else {
                            this.stompClient.subscribe("/topic/login", tick => {
                                this.received_messages.push(JSON.parse(tick.body).content);
                                console.log("The tick: ", tick.body)
                                this.isAuthorized(tick.body)
                            });
                        }
                        console.log("Received Messages: ", this.received_messages);
                    },
                    error => {
                        console.log("The error: ", error);
                        this.connected = false;
                    }
                )
            },
            sendMessage(msg) {
                console.log("Send message:...");
                if (this.stompClient && this.stompClient.connected) {
                    console.log("Sending message", JSON.stringify(msg));
                    if (this.visible) {
                        this.stompClient.send("/app/register", msg, {});
                    } else {
                        this.stompClient.send("/app/login", msg, {});
                    }
                }
            },
            register() {
                if (this.visible) {
                    const msg = {
                        firstName: this.firstname,
                        lastName: this.lastname,
                        username: this.username,
                        pwd: this.password
                    };
                    this.sendMessage(JSON.stringify(msg));
                } else {
                    this.visible = true;
                }
            },
            login() {
                this.visible = false;
                const msg = {
                    username: this.username,
                    pwd: this.password
                };
                this.sendMessage(JSON.stringify(msg)
                );
            },
            displayEmoji(unicode) {
                const emoji = require("emoji-dictionary");
                return emoji.getUnicode(unicode)
            },
            isAuthorized(tick) {
                if (tick) {
                    router.push({name: 'Discovery'});
                    localStorage.setItem('username', this.username);
                } else {
                    //TODO: snackbar
                }
            }
        }
    }
</script>

<style scoped lang="scss">

    .login {
        width: max-content;
        margin: auto;
    }

    .v-card-title {
        letter-spacing: 3px;
    }

    .v-card-actions {
        padding-left: 170px;
        position: relative;
        background: linear-gradient(280deg, rgba(78, 73, 75, 1) 20%, rgba(209, 209, 209, 0.3930614482120973) 100%);
    }
</style>
