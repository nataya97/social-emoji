<template>
    <v-container
            class="body"
    >

    </v-container>
</template>

<script>
    import router from "../router";

    export default {
        name: "Logout",

        methods: {
            clearLocalStorage() {
                console.log("localStorage before clearing", localStorage.length)
                localStorage.clear();
                console.log("localStorage after clearing", localStorage.length)
                this.timeOut();
            },
            goToLogin() {
                router.push({name: 'Login'})
            },
            timeOut() {
                setTimeout(() => this.goToLogin(), 4000);
            }
        },
        mounted() {
            this.clearLocalStorage();
        }
    }
</script>

<style lang="scss" scoped>

    .v-icon.v-icon {
        margin-right: 5px;
        margin-left: -5px;
        color: #BCA5AF;
    }

</style>
