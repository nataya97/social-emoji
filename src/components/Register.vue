<template>
    <v-container
            class="v-container">
        <v-card
                class="v-card"
                elevation="10"
        >
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
                                label="Username"
                                required
                                v-model="username"
                        >
                        </v-text-field>
                    </v-col>
                    <v-col
                            cols="12"
                            md="12"
                    >
                        <v-text-field
                                class="v-text-field"
                                label="Firstname"
                                required
                                v-model="firstname"
                        >
                        </v-text-field>
                    </v-col>
                    <v-col
                            cols="12"
                            md="12"
                    >
                        <v-text-field
                                class="v-text-field"
                                label="Lastname"
                                required
                                v-model="lastname"
                        >
                        </v-text-field>
                    </v-col>
                    <v-col
                            cols="12"
                            md="12"
                    >
                        <v-text-field
                                class="v-text-field"
                                @click:append="changePasswordState"
                                label="Password"
                                required
                                v-model="password"
                                append-icon="mdi-eye"
                                id="passwordField"
                                type="password"
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
    import UserService from "../services/UserService";

    export default {
        name: "Register",

        data: () => ({
            valid: false,
            username: '',
            password: '',
            firstname: '',
            lastname: '',
            received_messages: [],
            connected: false,
            userid: null,
            register_unsuccessful_message: 'Registering was not successful, try again!'
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
                        this.stompClient.subscribe("/topic/register", tick => {
                            this.received_messages.push(JSON.parse(tick.body).content);
                            console.log("The tick: ", tick.body)
                            this.isAuthorized(tick.body)
                        });
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
                    this.stompClient.send("/app/register", msg, {});
                }
            },
            register() {
                const msg = {
                    firstName: this.firstname,
                    lastName: this.lastname,
                    userName: this.username,
                    pwd: this.password
                };
                this.sendMessage(JSON.stringify(msg));
            },
            displayEmoji(unicode) {
                const emoji = require("emoji-dictionary");
                return emoji.getUnicode(unicode)
            },
            isAuthorized(tick) {
                if (tick) {
                    localStorage.setItem('username', this.username);
                    this.getUserId();
                    this.timeOut();
                    router.push({name: 'Discovery'});
                } else {
                    this.$refs.snackbar.showSnackBar(this.register_unsuccessful_message);
                }
            },
            getUserId() {
                UserService.getUserByUsername(this.username)
                    .then(response => {
                        console.log(response.data.id)
                        localStorage.setItem('userId', response.data.id)
                    })
                    .catch(e => {
                        console.log(e)
                    })
            },
            changePasswordState() {
                const passwordField = document.querySelector('#passwordField')

                if (passwordField.getAttribute('type') === 'password')
                    passwordField.setAttribute('type', 'text')
                else passwordField.setAttribute('type', 'password')
            },
            timeOut() {
                setTimeout(() => this.goToLogin(), 4000);
            }
        },
    }
</script>

<style lang="scss" scoped>

    .v-card {
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
