<template>
    <div>
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
            successMessage: ''
        }),

        methods: {
            showSnackBar(data) {
                this.successMessage = data
                this.snackbar = true;
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>
