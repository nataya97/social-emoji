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
                    >
                        <v-text-field
                                class="v-text-field"
                                @click:append="changePasswordState"
                                v-model="password"
                                label="Password"
                                required
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
                        v-on:click="login"
                >Login
                </v-btn>
                <v-btn
                        class="v-btn"
                        elevation="0"
                        v-on:click="goToRegister()"
                >Register
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
        name: 'Login',

        data: () => ({
            valid: false,
            username: '',
            password: '',
            received_messages: [],
            connected: false,
            userId: 59,
            login_unsuccessful_message: 'Login was not successful, try again!'
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
                        this.stompClient.subscribe("/topic/login", tick => {
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
                if (this.stompClient && this.stompClient.connected) {
                    console.log("Sending message", JSON.stringify(msg));
                    this.stompClient.send("/app/login", msg, {});
                }
            },
            login() {
                const msg = {
                    userName: this.username,
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
                    localStorage.clear();
                    localStorage.setItem('username', this.username);
                    this.getUserId();
                    router.push({name: 'Discovery'});
                } else {
                    this.$root.SnackBar.showSnackBar(this.login_unsuccessful_message);
                }
            },
            getUserId() {
                UserService.getUserByUsername(this.username)
                    .then(response => {
                        localStorage.setItem('userId', response.data.id)
                    })
                    .catch(e => {
                        console.log(e)
                    })
            },
            goToRegister() {
                router.push({name: 'Register'})
            },
            changePasswordState() {
                const passwordField = document.querySelector('#passwordField')

                if (passwordField.getAttribute('type') === 'password')
                    passwordField.setAttribute('type', 'text')
                else passwordField.setAttribute('type', 'password')
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
