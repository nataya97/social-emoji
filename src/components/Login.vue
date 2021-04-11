<template>
    <v-container>
        <v-card class="login" elevation="10">
            <v-card-title class="v-card-title">
                Welcome to Emojimedia
                <div class="emoji">{{displayEmoji('heart_eyes')}}</div>
            </v-card-title>
            <v-form v-model="valid">
                <v-container>
                    <v-col
                            cols="12"
                            md="12"
                    >
                        <v-text-field
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
                                v-model="password"
                                label="Password"
                                required
                        >
                        </v-text-field>
                    </v-col>
                </v-container>
            </v-form>
            <v-card-actions class="v-card-actions">
                <v-btn elevation="0"
                       v-on:click="login"
                >Login
                </v-btn>
                <v-btn elevation="0"
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
            connected: false
        }),
        mounted() {
            this.connectRabbitMQ();
        },
        methods: {
            connectRabbitMQ() {
                this.socket = new SockJS("http://localhost:8082/gs-guide-websocket");
                this.stompClient = Stopm.over(this.socket);
                this.stompClient.connect({},
                    frame => {
                        this.connected = true;
                        console.log(frame);
                        this.stompClient.subscribe("/topic/login", tick => {
                            this.received_messages.push(JSON.parse(tick.body).content);
                        });
                        console.log(this.received_messages);
                    },
                    error => {
                        console.log(error);
                        this.connected = false;
                    }
                )
            },
            sendMessage() {
                console.log("Send message: " + "Username");
                if (this.stompClient && this.stompClient.connected) {
                    const msg = {name: this.send_message};
                    console.log(JSON.stringify(msg));
                    this.stompClient.send("/app/login", JSON.stringify("username"), {});
                }
            },
            register() {
                this.visible = true;
            },
            login() {
                this.visible = false;
                this.sendMessage();
            },
            displayEmoji(unicode) {
                const emoji = require("emoji-dictionary");
                return emoji.getUnicode(unicode)
            }
        }
    }
</script>

<style scoped lang="scss">

    .login {
        width: max-content;
        margin-left: auto;
        margin-right: auto;
    }

    .v-card-title {
        letter-spacing: 2px;
    }

    .v-card-actions {
        padding-left: 170px;
        position: relative;
    }
</style>
