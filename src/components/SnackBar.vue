<template>
    <div>
        <v-btn
                @click="snackbar = true"
                dark
                flat
        >
        </v-btn>
        <v-snackbar
                timeout="2000"
                v-model="snackbar"

        >
            {{successMessage}}
        </v-snackbar>
    </div>
</template>

<script>
    export default {
        name: "SnackBar",

        data: () => ({
            snackbar: false,
            successMessage: 'Your post has been submitted!'
        }),

        methods: {
            showSnackBar() {
                this.snackbar = true;
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
